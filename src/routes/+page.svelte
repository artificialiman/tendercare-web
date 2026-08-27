<script lang="ts">
	import { base } from '$app/paths';
	import { PORTAL_URL } from '$lib/config';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { animateOnScroll, countUp, parallax } from '$lib/actions/scrollFx';
</script>

<svelte:head>
	<title>Tendercare Comprehensive College</title>
	<meta name="description" content="Tendercare Comprehensive College — where every student is given the full range of their potential." />
</svelte:head>

<Nav current="home" transparent={true} />

  <!-- ══════════════════════════════════
       HERO — IMG_0247 is the MAIN HERO
  ══════════════════════════════════ -->
  <section class="bursary__hero" style="min-height:100svh;background:var(--color-offwhite);">
    <div class="bursary__hero-media">
      <img src="{base}/img/IMG_0247.jpeg" alt="Tendercare Comprehensive College" class="media--hero-bg parallax" data-speed="0.25" use:parallax={0.25}>
      <div class="hero-img-overlay"></div>
    </div>
    <div style="position:absolute;inset:0;overflow:hidden;z-index:2;pointer-events:none;">
      <div style="position:absolute;right:-10%;top:10%;width:55%;aspect-ratio:1;border-radius:50%;background:var(--color-purple-ghost);opacity:0.22;"></div>
      <div style="position:absolute;right:5%;top:28%;width:32%;aspect-ratio:1;border-radius:50%;background:var(--color-lemon-ghost);opacity:0.35;"></div>
    </div>
    <div class="bursary__hero-content container" style="position:relative;z-index:3;padding-bottom:var(--space-20);">
      <span class="t-eyebrow" style="animation:fadeIn 0.6s ease 0.1s both;">Tendercare Comprehensive College</span>
      <h1 class="bursary__hero-title">
        <span class="line"><span>Where every</span></span>
        <span class="line"><span>child is given</span></span>
        <span class="line"><span style="color:var(--color-purple);font-style:italic;">the full range</span></span>
        <span class="line"><span>of their potential.</span></span>
      </h1>
      <p class="bursary__hero-sub" style="animation:fadeUp 0.8s var(--ease-out) 0.75s both;">
        From primary to secondary — academic excellence, cultural depth, athletic ambition, and the formation of character that lasts a lifetime.
      </p>
      <div class="bursary__hero-cta" style="animation:fadeUp 0.8s var(--ease-out) 0.9s both;">
        <a href="{base}/about/" class="btn btn--primary">Discover the School</a>
        <a href="{PORTAL_URL}/student-portal/" class="btn btn--ghost">Check Result</a>
      </div>
    </div>
  </section>

  <!-- CAPACITY STRIP -->
  <div use:animateOnScroll class="capacity-strip" data-animate="fade-up">
    <div class="capacity-item"><a href="{base}/sports/">Interhouse Sports</a></div>
    <div class="capacity-item">Mathematics Olympiad</div>
    <div class="capacity-item">Science Fair</div>
    <div class="capacity-item">Debate Competition</div>
    <div class="capacity-item">Drama Festival</div>
    <div class="capacity-item">Visual Arts Showcase</div>
    <div class="capacity-item">Chess Tournament</div>
    <div class="capacity-item">Literature &amp; Poetry</div>
    <div class="capacity-item">Music Recital</div>
    <div class="capacity-item">Technology Exhibition</div>
  </div>

  <!-- MISSION -->
  <section class="bursary__mission">
    <div class="container">
      <p use:animateOnScroll class="bursary__mission-text" data-animate="fade-up">
        "We don't just prepare students for exams.<br>
        We prepare them for <em style="color:var(--color-lemon);">everything.</em>"
      </p>
      <p use:animateOnScroll style="font-family:var(--font-sans);font-size:var(--text-sm);opacity:0.5;margin-top:var(--space-6);letter-spacing:var(--tracking-wide);" data-animate="fade-up">— The Tendercare Standard</p>
    </div>
  </section>

  <!-- ══════════════════════════════════
       FACE OF THE DAY
       IMG_0063 = Face of the Day
       IMG_2087 = Head Girl
       IMG_2110 = Head Boy
       IMG_2251 = Ireti (SS2)
       IMG_2249 = Faith (SS2)
  ══════════════════════════════════ -->
  <section class="section" style="background:var(--color-offwhite);">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" data-animate="fade-up">Face of the Day</span>
      <h2 use:animateOnScroll class="t-prestige" style="max-width:24ch;" data-animate="fade-up">Every face<br>tells <em>a story.</em></h2>
      <div use:animateOnScroll class="facestrip" data-animate="fade-up">
        <div class="facestrip__item">
          <img src="{base}/img/IMG_0063.jpeg" alt="Face of the Day">
          <div class="facestrip__label">Face of the Day</div>
        </div>
        <div class="facestrip__item">
          <img src="{base}/img/IMG_2087.jpeg" alt="Head Girl">
          <div class="facestrip__label">Head Girl</div>
        </div>
        <div class="facestrip__item">
          <img src="{base}/img/IMG_2110.jpeg" alt="Head Boy">
          <div class="facestrip__label">Head Boy</div>
        </div>
      </div>
    </div>
  </section>

  <!-- PILLARS -->
  <section class="section" style="background:var(--color-offwhite);">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" data-animate="fade-up">Our Foundation</span>
      <h2 use:animateOnScroll class="t-prestige" style="max-width:20ch;margin-bottom:var(--space-12);" data-animate="fade-up">Four pillars.<br>One complete education.</h2>
      <div class="grid grid--2" data-stagger>
        <div use:animateOnScroll class="bursary__pillar" data-animate="fade-up">
          <div class="bursary__pillar-number">01</div>
          <h3 class="bursary__pillar-title">Academic Rigour</h3>
          <p class="t-body" style="opacity:0.7;">A curriculum that challenges, inspires, and builds disciplined thinking that opens every door.</p>
        </div>
        <div use:animateOnScroll class="bursary__pillar" data-animate="fade-up">
          <div class="bursary__pillar-number">02</div>
          <h3 class="bursary__pillar-title">Athletic Excellence</h3>
          <p class="t-body" style="opacity:0.7;">From interhouse competitions to national stages — we show up for every sport, every race, every game.</p>
        </div>
        <div use:animateOnScroll class="bursary__pillar" data-animate="fade-up">
          <div class="bursary__pillar-number">03</div>
          <h3 class="bursary__pillar-title">Cultural Depth</h3>
          <p class="t-body" style="opacity:0.7;">Drama, music, arts, and debate — because the full human being is the goal, not just the graduate.</p>
        </div>
        <div use:animateOnScroll class="bursary__pillar" data-animate="fade-up">
          <div class="bursary__pillar-number">04</div>
          <h3 class="bursary__pillar-title">Character Formation</h3>
          <p class="t-body" style="opacity:0.7;">The values instilled here outlast every certificate. Tendercare students carry something the world can feel.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PROOF BAR -->
  <section class="bursary__proof">
    <div class="container">
      <div class="bursary__proof-grid" data-stagger>
        <div use:animateOnScroll class="bursary__stat" data-animate="scale-in">
          <span class="bursary__stat-number" use:countUp={{ target: 25, suffix: "yrs" }}>0</span>
          <span class="bursary__stat-label">Years of Excellence</span>
        </div>
        <div use:animateOnScroll class="bursary__stat" data-animate="scale-in">
          <span class="bursary__stat-number" use:countUp={{ target: 3, suffix: "rd" }}>0</span>
          <span class="bursary__stat-label">Interhouse Festival</span>
        </div>
        <div use:animateOnScroll class="bursary__stat" data-animate="scale-in">
          <span class="bursary__stat-number" use:countUp={{ target: 10, suffix: "+" }}>0</span>
          <span class="bursary__stat-label">Disciplines Competed</span>
        </div>
        <div use:animateOnScroll class="bursary__stat" data-animate="scale-in">
          <span class="bursary__stat-number" use:countUp={{ target: 100, suffix: "%" }}>0</span>
          <span class="bursary__stat-label">Commitment</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       GATEWAY CARDS
       Sports bg:   IMG_0101.jpeg (sport banner)
       Yearbook bg: IMG_2087.jpeg (Head Girl — face of awards)
       Feed avatars: IMG_0063, IMG_2251, IMG_2074
  ══════════════════════════════════ -->
  <section class="section" style="background:var(--color-cream);">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" data-animate="fade-up">Explore Tendercare</span>
      <div class="grid grid--3" style="margin-top:var(--space-8);" data-stagger>

        <a use:animateOnScroll href="{base}/sports/" style="text-decoration:none;" data-animate="fade-up">
          <div style="aspect-ratio:3/4;position:relative;overflow:hidden;margin-bottom:var(--space-4);">
            <img src="{base}/img/IMG_0101.jpeg" alt="Interhouse Sports" class="gateway-img" style="filter:brightness(0.48) saturate(1.3);">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,5,20,0.9) 0%,transparent 60%);"></div>
            <div style="position:absolute;bottom:var(--space-6);left:var(--space-6);right:var(--space-6);">
              <span style="font-family:var(--font-display);font-size:var(--text-4xl);color:var(--color-lemon);letter-spacing:0.05em;line-height:1;display:block;">INTER<br>HOUSE</span>
              <span style="font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;color:rgba(255,255,255,0.5);margin-top:var(--space-2);display:block;">3rd Edition · 2025</span>
            </div>
          </div>
          <h3 style="font-family:var(--font-serif);font-size:var(--text-lg);font-weight:500;color:var(--color-ink);margin-bottom:var(--space-2);">Sports Festival</h3>
          <p style="font-family:var(--font-sans);font-size:var(--text-sm);opacity:0.6;">The races, the reactions, the glory.</p>
        </a>

        <a use:animateOnScroll href="{base}/yearbook/" style="text-decoration:none;" data-animate="fade-up">
          <div style="aspect-ratio:3/4;position:relative;overflow:hidden;margin-bottom:var(--space-4);">
            <img src="{base}/img/IMG_2087.jpeg" alt="Yearbook 2025" class="gateway-img" style="filter:sepia(0.3) brightness(0.78);">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(42,30,16,0.88) 0%,transparent 55%);"></div>
            <div style="position:absolute;bottom:var(--space-6);left:var(--space-6);right:var(--space-6);">
              <span style="font-family:var(--font-serif);font-size:var(--text-3xl);font-weight:300;color:var(--color-cream);display:block;line-height:1.1;">Class<br>of 2025</span>
              <div style="width:36px;height:1px;background:var(--color-lemon);margin:var(--space-3) 0;"></div>
              <span style="font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;color:rgba(255,255,255,0.55);">Graduating Class</span>
            </div>
          </div>
          <h3 style="font-family:var(--font-serif);font-size:var(--text-lg);font-weight:500;color:var(--color-ink);margin-bottom:var(--space-2);">Yearbook 2025</h3>
          <p style="font-family:var(--font-sans);font-size:var(--text-sm);opacity:0.6;">Portraits, memories, ambitions preserved.</p>
        </a>

        <a use:animateOnScroll href="{base}/feed/" style="text-decoration:none;" data-animate="fade-up">
          <div style="aspect-ratio:3/4;background:var(--color-purple-ghost);position:relative;overflow:hidden;margin-bottom:var(--space-4);padding:var(--space-5);">
            <div style="background:white;border-radius:20px;padding:var(--space-4);margin-bottom:var(--space-3);box-shadow:var(--shadow-sm);display:flex;align-items:center;gap:var(--space-3);">
              <div class="media--avatar media--avatar--sm" style="flex-shrink:0;"><img src="{base}/img/IMG_0063.jpeg" alt="Face of the Day"></div>
              <div><div style="height:8px;background:var(--color-cream-deep);border-radius:4px;width:80px;margin-bottom:6px;"></div><div style="height:6px;background:var(--color-cream-deep);border-radius:4px;width:55px;opacity:0.6;"></div></div>
            </div>
            <div style="background:var(--color-lemon);border-radius:20px;padding:var(--space-4);margin-bottom:var(--space-3);display:flex;align-items:center;gap:var(--space-3);">
              <div class="media--avatar media--avatar--sm" style="flex-shrink:0;background:rgba(0,0,0,0.15);"><img src="{base}/img/IMG_2087.jpeg" alt="Ireti"></div>
              <div><div style="height:8px;background:rgba(0,0,0,0.2);border-radius:4px;width:90px;margin-bottom:6px;"></div><div style="height:6px;background:rgba(0,0,0,0.12);border-radius:4px;width:60px;"></div></div>
            </div>
            <div style="background:white;border-radius:20px;padding:var(--space-4);box-shadow:var(--shadow-sm);display:flex;align-items:center;gap:var(--space-3);">
              <div class="media--avatar media--avatar--sm" style="flex-shrink:0;"><img src="{base}/img/IMG_2074.jpeg" alt="Kaosara"></div>
              <div><div style="height:8px;background:var(--color-cream-deep);border-radius:4px;width:70px;"></div></div>
            </div>
            <div style="position:absolute;top:var(--space-4);right:var(--space-4);width:10px;height:10px;border-radius:50%;background:var(--color-purple);animation:pulse 2s ease-in-out infinite;"></div>
          </div>
          <h3 style="font-family:var(--font-serif);font-size:var(--text-lg);font-weight:500;color:var(--color-ink);margin-bottom:var(--space-2);">Student Feed</h3>
          <p style="font-family:var(--font-sans);font-size:var(--text-sm);opacity:0.6;">What's happening. What's next.</p>
        </a>

      </div>

      <!-- ══════════════════════════════════
           VIDEO THUMBNAIL
           IMG_0247 = main hero — doubles as reel thumbnail
      ══════════════════════════════════ -->
      <div use:animateOnScroll style="margin-top:var(--space-10);" data-animate="fade-up">
        <span class="t-eyebrow">Highlights</span>
        <div class="video-thumb" style="max-width:760px;">
          <img src="{base}/img/IMG_0247.jpeg" alt="Sports Festival Highlight Reel">
          <div class="video-thumb__play">
            <div class="video-thumb__btn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
          <div class="video-thumb__caption">3rd Interhouse Sports · Highlights Reel</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-top:var(--space-6);" data-stagger>
        <a use:animateOnScroll href="{PORTAL_URL}/student-portal/" style="text-decoration:none;" data-animate="fade-up">
          <div style="background:var(--color-purple);border-radius:var(--radius-lg);padding:var(--space-8) var(--space-6);display:flex;flex-direction:column;justify-content:space-between;min-height:140px;position:relative;overflow:hidden;">
            <span style="font-family:var(--font-display);font-size:var(--text-3xl);color:var(--color-lemon);letter-spacing:0.05em;line-height:1;">STUDENT<br>PORTAL</span>
            <span style="font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;color:rgba(255,255,255,0.45);margin-top:var(--space-4);">Check your results →</span>
          </div>
        </a>
        <a use:animateOnScroll href="{PORTAL_URL}/results/" style="text-decoration:none;" data-animate="fade-up">
          <div style="background:var(--color-ink);border-radius:var(--radius-lg);padding:var(--space-8) var(--space-6);display:flex;flex-direction:column;justify-content:space-between;min-height:140px;position:relative;overflow:hidden;">
            <span style="font-family:var(--font-display);font-size:var(--text-3xl);color:white;letter-spacing:0.05em;line-height:1;">RESULTS<br>&amp; AWARDS</span>
            <span style="font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;color:rgba(255,255,255,0.3);margin-top:var(--space-4);">Scores · Notes · Reports →</span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SPORTS ATMOSPHERE STRIP
       IMG_0247 = main hero (wide)
       IMG_0101 = sport banner (square)
       IMG_2074 = Kaosara / Main Sportsperson (square)
  ══════════════════════════════════ -->
  <section style="background:var(--color-ink);padding:var(--space-3);">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:var(--space-2);">
      <div style="overflow:hidden;aspect-ratio:16/9;">
        <img src="{base}/img/IMG_0247.jpeg" alt="Sports — Main Hero" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.85) saturate(1.1);">
      </div>
      <div style="overflow:hidden;position:relative;aspect-ratio:1;">
        <img src="{base}/img/IMG_0101.jpeg" alt="Sports Banner" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);">
        <div style="position:absolute;inset:0;background:rgba(91,45,142,0.35);mix-blend-mode:multiply;"></div>
      </div>
      <div style="overflow:hidden;position:relative;aspect-ratio:1;">
        <img src="{base}/img/IMG_2074.jpeg" alt="Kaosara — Main Sportsperson" style="width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(0.72);">
        <div style="position:absolute;bottom:var(--space-3);left:var(--space-3);font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;color:var(--color-lemon);">MVP</div>
      </div>
    </div>
    <div style="text-align:center;padding:var(--space-6) 0 var(--space-4);">
      <a href="{base}/sports/" class="btn btn--accent" style="border-radius:var(--radius-full);">View Full Sports Gallery</a>
    </div>
  </section>

  <!-- CTA -->
  <section class="bursary__cta-section">
    <div use:animateOnScroll class="container container--md" data-animate="fade-up">
      <span class="t-eyebrow" style="justify-content:center;display:flex;">Join Tendercare</span>
      <h2 class="t-prestige" style="text-align:center;margin-bottom:var(--space-8);">Ready to give your child<br><em>the full range?</em></h2>
      <div style="display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap;">
        <a href="{base}/about/" class="btn btn--primary">Learn More</a>
        <a href="{base}/about/#contact" class="btn btn--ghost">Get in Touch</a>
      </div>
    </div>
  </section>

  <Footer />

<style>
    .bursary__hero-content { animation: fadeUp 1s var(--ease-out) 0.2s both; }
    .bursary__mission-text { animation: fadeUp 0.8s var(--ease-out) 0.1s both; }
    .bursary__hero-title .line { display:block; overflow:hidden; }
    .bursary__hero-title .line span { display:block; animation:fadeUp 0.9s var(--ease-out) both; }
    .bursary__hero-title .line:nth-child(1) span { animation-delay:0.3s; }
    .bursary__hero-title .line:nth-child(2) span { animation-delay:0.45s; }
    .bursary__hero-title .line:nth-child(3) span { animation-delay:0.6s; }
    .bursary__hero-title .line:nth-child(4) span { animation-delay:0.75s; }
    .hero-img-overlay {
      position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(248,244,236,0.94) 0%,rgba(248,244,236,0.72) 55%,rgba(248,244,236,0.32) 100%);
      z-index:1;
    }
    .capacity-strip { display:flex; overflow-x:auto; scrollbar-width:none; border-top:1px solid var(--color-cream-deep); border-bottom:1px solid var(--color-cream-deep); }
    .capacity-strip::-webkit-scrollbar { display:none; }
    .capacity-item { flex-shrink:0; padding:var(--space-5) var(--space-8); font-family:var(--font-sans); font-size:var(--text-xs); font-weight:500; letter-spacing:var(--tracking-widest); text-transform:uppercase; color:var(--color-ink); border-right:1px solid var(--color-cream-deep); white-space:nowrap; transition:background var(--duration-base),color var(--duration-base); }
    .capacity-item:hover { background:var(--color-purple); color:var(--color-cream); }
    .capacity-item a { color:inherit; text-decoration:none; }
    .gateway-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center top; }
    .facestrip { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-2); margin-top:var(--space-10); }
    @media(min-width:640px){ .facestrip { grid-template-columns:repeat(5,1fr); } }
    .facestrip__item { aspect-ratio:3/4; overflow:hidden; position:relative; cursor:pointer; }
    .facestrip__item img { width:100%; height:100%; object-fit:cover; object-position:center top; transition:transform var(--duration-slow) var(--ease-out); filter:grayscale(0.1); }
    .facestrip__item:hover img { transform:scale(1.06); filter:grayscale(0); }
    .facestrip__label { position:absolute; bottom:0; left:0; right:0; padding:var(--space-3); background:linear-gradient(to top,rgba(26,16,32,0.8),transparent); font-family:var(--font-sans); font-size:var(--text-xs); letter-spacing:var(--tracking-wide); text-transform:uppercase; color:var(--color-cream); opacity:0; transition:opacity var(--duration-base); }
    .facestrip__item:hover .facestrip__label { opacity:1; }
    .video-thumb { position:relative; aspect-ratio:16/9; overflow:hidden; background:var(--color-ink); border-radius:var(--radius-md); }
    .video-thumb img { width:100%; height:100%; object-fit:cover; filter:brightness(0.72); }
    .video-thumb__play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
    .video-thumb__btn { width:68px; height:68px; border-radius:50%; background:var(--color-lemon); display:flex; align-items:center; justify-content:center; transition:transform var(--duration-base) var(--ease-spring),box-shadow var(--duration-base); }
    .video-thumb:hover .video-thumb__btn { transform:scale(1.12); box-shadow:var(--shadow-lemon); }
    .video-thumb__btn svg { width:26px; height:26px; fill:var(--color-ink); margin-left:4px; }
    .video-thumb__caption { position:absolute; bottom:var(--space-4); left:var(--space-5); font-family:var(--font-display); font-size:var(--text-xl); color:var(--color-cream); letter-spacing:var(--tracking-wide); text-shadow:0 2px 8px rgba(0,0,0,0.5); }
</style>
