import re, sys

# Routes that stay inside tendercare-web (this app)
ROUTE_MAP = {
    'index.html': '{base}/',
    'sports.html': '{base}/sports/',
    'yearbook.html': '{base}/yearbook/',
    'awards.html': '{base}/awards/',
    'feed.html': '{base}/feed/',
    'about.html#contact': '{base}/about/#contact',
    'about.html#admissions': '{base}/about/#admissions',
    'about.html': '{base}/about/',
}

# Routes that belong to a different app in the migration (tendercare-portal /
# tendercare-teacher) — these are cross-app links, not internal routes, and
# go through the PORTAL_URL/TEACHER_URL constants in $lib/config.ts instead
# of {base}, so there's exactly one place to update once those apps deploy.
CROSS_APP_ROUTE_MAP = {
    'results.html': '{PORTAL_URL}/results/',
    'student-portal.html': '{PORTAL_URL}/student-portal/',
    'teacher-dashboard.html': '{TEACHER_URL}/',
}


def transform(html: str) -> str:
    for old in sorted(ROUTE_MAP, key=len, reverse=True):
        html = html.replace(f'href="{old}"', f'href="{ROUTE_MAP[old]}"')
    for old in sorted(CROSS_APP_ROUTE_MAP, key=len, reverse=True):
        html = html.replace(f'href="{old}"', f'href="{CROSS_APP_ROUTE_MAP[old]}"')
    # result.html?student=X -> cross-app link with the query string preserved
    html = re.sub(
        r'href="result\.html(\?[^"]*)"',
        r'href="{PORTAL_URL}/result/\1"',
        html,
    )
    html = re.sub(r'src="(IMG_\d+\.jpeg)"', r'src="{base}/img/\1"', html)
    html = re.sub(
        r'(<[a-zA-Z0-9]+)((?:(?!>).)*?\sdata-animate="[a-z-]+")',
        r'\1 use:animateOnScroll\2',
        html,
    )
    html = re.sub(
        r'(<img[^>]*class="[^"]*\bparallax\b[^"]*")([^>]*?)data-speed="([\d.]+)"',
        lambda m: f'{m.group(1)}{m.group(2)}data-speed="{m.group(3)}" use:parallax={{{m.group(3)}}}',
        html,
    )
    html = re.sub(
        r'(<span class="bursary__stat-number") data-count="(\d+)" data-suffix="([^"]*)"',
        r'\1 use:countUp={{ target: \2, suffix: "\3" }}',
        html,
    )
    # strip inline footer, replaced by shared <Footer /> across all pages
    html = re.sub(r'\s*<footer class="site-footer">.*?</footer>\n', '\n  <Footer />\n', html, flags=re.DOTALL)
    return html


if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    with open(src) as f:
        html = f.read()
    with open(dst, 'w') as f:
        f.write(transform(html))
