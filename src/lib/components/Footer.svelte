<script lang="ts">
	import { base } from '$app/paths';
	import { PORTAL_URL } from '$lib/config';
</script>

<footer class="site-footer">
	<div class="container">
		<div class="site-footer__grid">
			<div>
				<p class="site-footer__name">Tendercare<br />Comprehensive<br />College</p>
				<p class="site-footer__tagline">
					Where every child is given the full range of their potential.
				</p>
			</div>
			<div>
				<p class="site-footer__heading">Pages</p>
				<a href="{base}/" class="site-footer__link">Home</a>
				<a href="{base}/sports/" class="site-footer__link">Sports Festival</a>
				<a href="{base}/yearbook/" class="site-footer__link">Yearbook</a>
				<a href="{base}/awards/" class="site-footer__link">Awards</a>
				<a href="{base}/feed/" class="site-footer__link">Student Feed</a>
				<a href="{base}/about/" class="site-footer__link">About &amp; Faculty</a>
			</div>
			<div>
				<p class="site-footer__heading">School</p>
				<a href="{base}/about/#contact" class="site-footer__link">Contact Us</a>
				<a href="{base}/about/#admissions" class="site-footer__link">Admissions</a>
				<a href="{base}/awards/" class="site-footer__link">Academic Record</a>
				<a href="{PORTAL_URL}/results/" class="site-footer__link">Results</a>
			</div>
		</div>
		<p class="site-footer__copy">© 2025 Tendercare Comprehensive College. All rights reserved.</p>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--color-ink);
		color: var(--color-cream);
		padding: var(--space-16) var(--space-5) var(--space-8);
	}
	.site-footer__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-10);
		padding-bottom: var(--space-10);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		margin-bottom: var(--space-8);
	}
	@media (min-width: 768px) {
		.site-footer__grid {
			grid-template-columns: 2fr 1fr 1fr;
		}
	}
	.site-footer__heading {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-widest);
		text-transform: uppercase;
		opacity: 0.4;
		margin-bottom: var(--space-5);
	}
	.site-footer__link {
		display: block;
		font-family: var(--font-sans);
		font-size: var(--text-sm);
		opacity: 0.6;
		margin-bottom: var(--space-3);
		transition: opacity var(--duration-fast);
	}
	.site-footer__link:hover {
		opacity: 1;
	}
	.site-footer__copy {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		opacity: 0.35;
	}
	.site-footer__name {
		font-family: var(--font-serif);
		font-size: var(--text-3xl);
		font-weight: 300;
		opacity: 0.9;
		margin-bottom: var(--space-4);
		line-height: var(--leading-snug);
	}
	.site-footer__tagline {
		font-family: var(--font-body);
		font-style: italic;
		font-size: var(--text-sm);
		opacity: 0.45;
		line-height: var(--leading-normal);
		max-width: 32ch;
	}
</style>
