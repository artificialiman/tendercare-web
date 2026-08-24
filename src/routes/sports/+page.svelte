<script lang="ts">
	import { base } from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { animateOnScroll, countUp, parallax } from '$lib/actions/scrollFx';

	// Ported from the original page-specific <script> block in sports.html.
	// Kept as imperative DOM logic (rather than rewritten into reactive state)
	// to preserve exact original modal behavior during the migration.
	let modalEl: HTMLDivElement;
	let modalTitleEl: HTMLParagraphElement;
	let modalVideoEl: HTMLVideoElement;
	let modalIframeEl: HTMLIFrameElement;
	let modalHintEl: HTMLParagraphElement;
	let modalPlaceholderEl: HTMLDivElement;

	function openEventModal(title: string, src: string) {
		modalTitleEl.textContent = title;
		const isIframe = src.includes('youtube.com') || src.includes('embed') || src.includes('vimeo');
		const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src);
		const isPlaceholder = src.startsWith('Replace');
		modalVideoEl.style.display = 'none';
		modalVideoEl.src = '';
		modalIframeEl.style.display = 'none';
		modalIframeEl.src = '';
		modalPlaceholderEl.style.display = 'none';
		if (isPlaceholder) {
			modalPlaceholderEl.style.display = 'flex';
			modalHintEl.textContent =
				'Video coming soon — drop your file path or YouTube embed URL into the handler.';
		} else if (isIframe) {
			modalIframeEl.src = src;
			modalIframeEl.style.display = 'block';
		} else {
			modalVideoEl.src = src;
			modalVideoEl.style.display = 'block';
			modalVideoEl.play().catch(() => {});
		}
		modalEl.style.pointerEvents = 'all';
		modalEl.style.opacity = '1';
		document.body.style.overflow = 'hidden';
	}

	function closeEventModal() {
		modalEl.style.opacity = '0';
		modalEl.style.pointerEvents = 'none';
		document.body.style.overflow = '';
		setTimeout(() => {
			modalVideoEl.pause();
			modalVideoEl.src = '';
			modalIframeEl.src = '';
		}, 300);
	}

	function onModalBackdropClick(e: MouseEvent) {
		if (e.target === modalEl) closeEventModal();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeEventModal();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<title>Interhouse Sports — Tendercare Comprehensive College</title>
	<meta name="description" content="3rd Interhouse Sports Festival at Tendercare Comprehensive College." />
</svelte:head>

<Nav current="sports" transparent={true} light={true} />

  <!-- ══════════════════════════════════
       HERO
       IMG_0247 = main hero / OLD SPORT (full hero bg)
       IMG_0101 = sport banner (overlaid accent)
  ══════════════════════════════════ -->
  <section class="event__hero" style="min-height:100svh;">
    <div class="event__hero-bg">
      <!-- IMG_0247 = designated main hero (old sport) -->
      <img src="{base}/img/IMG_0247.jpeg" alt="Interhouse Sports 2025" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(0.5) saturate(1.15);">
      <div class="event__hero-overlay"></div>
    </div>

    <div class="event__hero-content container">
      <div class="event__badge" style="animation:fadeIn 0.5s ease 0.2s both;">
        <span>●</span> 3rd Edition · 2025
      </div>
      <h1 class="event__title" style="animation:fadeUp 0.9s var(--ease-out) 0.3s both;">
        Inter<span class="event__title-accent">house</span><br>Sports
      </h1>
      <p class="event__subtitle" style="animation:fadeUp 0.9s var(--ease-out) 0.5s both;">
        A festival of athleticism. Twenty-five years in the making. One afternoon that showed the world what Tendercare is capable of.
      </p>
      <div class="event__meta" style="animation:fadeUp 0.8s var(--ease-out) 0.7s both;">
        <span class="event__meta-item">Tendercare Sports Ground</span>
        <span class="event__meta-item">2025</span>
        <span class="event__meta-item">All Houses Competed</span>
      </div>

      <div class="event-chips" style="animation:fadeUp 0.8s var(--ease-out) 0.85s both;">
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('100m Sprint','./YHPrade.MOV')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('100m Sprint','./YHPrade.MOV'); }}>▶ 100m Sprint</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('4×100m Relay — Boys','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('4×100m Relay — Boys','Replace with video src'); }}>▶ 4×100m Relay Boys</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('4×100m Relay — Girls','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('4×100m Relay — Girls','Replace with video src'); }}>▶ 4×100m Relay Girls</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('4×100m Relay — Invited Boys','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('4×100m Relay — Invited Boys','Replace with video src'); }}>▶ Invited Boys Relay</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('4×100m Relay — Invited Girls','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('4×100m Relay — Invited Girls','Replace with video src'); }}>▶ Invited Girls Relay</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('Tug of War','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('Tug of War','Replace with video src'); }}>▶ Tug of War</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('100m Final — Boys','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('100m Final — Boys','Replace with video src'); }}>▶ 100m Final Boys</span>
        <span class="event-chip" role="button" tabindex="0" onclick={() => openEventModal('100m Final — Girls','Replace with video src')} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") openEventModal('100m Final — Girls','Replace with video src'); }}>▶ 100m Final Girls</span>
      </div>

      <!-- Video Modal -->
      <div bind:this={modalEl} onclick={onModalBackdropClick} onkeydown={onKeydown} role="dialog" aria-modal="true" tabindex="-1" style="position:fixed;inset:0;z-index:9999;background:rgba(10,5,20,0.92);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--space-5);opacity:0;pointer-events:none;transition:opacity 0.3s var(--ease-out);">
        <div style="width:100%;max-width:800px;position:relative;">
          <button onclick={closeEventModal} style="position:absolute;top:-48px;right:0;background:rgba(255,255,255,0.1);border:none;color:white;width:40px;height:40px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
          <p bind:this={modalTitleEl} style="font-family:var(--font-display);font-size:var(--text-3xl);color:var(--color-lemon);letter-spacing:0.05em;margin-bottom:var(--space-4);line-height:1;"></p>
          <div id="modalVideoWrap" style="aspect-ratio:16/9;background:#000;border-radius:var(--radius-md);overflow:hidden;box-shadow:var(--shadow-xl);position:relative;">
            <div bind:this={modalPlaceholderEl} style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-4);background:linear-gradient(160deg,#1a1028,#0a050f);">
              <div style="width:72px;height:72px;border-radius:50%;border:2px solid var(--color-lemon);display:flex;align-items:center;justify-content:center;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-lemon)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <p bind:this={modalHintEl} style="font-family:var(--font-sans);font-size:var(--text-sm);color:rgba(255,255,255,0.4);text-align:center;max-width:36ch;line-height:1.5;"></p>
            </div>
            <video bind:this={modalVideoEl} style="width:100%;height:100%;display:none;object-fit:contain;" controls playsinline></video>
            <iframe bind:this={modalIframeEl} title="Event video" style="width:100%;height:100%;display:none;border:none;" allowfullscreen allow="autoplay"></iframe>
          </div>
          <p style="font-family:var(--font-sans);font-size:var(--text-xs);color:rgba(255,255,255,0.25);margin-top:var(--space-3);text-align:center;letter-spacing:var(--tracking-wide);">Press ESC or tap outside to close</p>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <div class="sports-stats" data-stagger>
    <div use:animateOnScroll class="sports-stat" data-animate="scale-in">
      <span class="sports-stat-n" data-count="4">0</span>
      <span class="sports-stat-l">Houses</span>
    </div>
    <div use:animateOnScroll class="sports-stat" data-animate="scale-in">
      <span class="sports-stat-n" data-count="18">0</span>
      <span class="sports-stat-l">Events</span>
    </div>
    <div use:animateOnScroll class="sports-stat" data-animate="scale-in">
      <span class="sports-stat-n" data-count="3">0</span>
      <span class="sports-stat-l">Years Running</span>
    </div>
  </div>

  <!-- ══════════════════════════════════
       PHOTO GALLERY
       Hero: IMG_0247 (main hero / old sport)
       Support: IMG_0101 (sport banner), student faces
       IMG_2074 = Kaosara (main sportsperson)
       IMG_2238 = Sunny (SS2)
       IMG_2240 = Mercy (SS2)
       IMG_2233 = Anabell (SS2)
  ══════════════════════════════════ -->
  <section style="padding:var(--space-2);background:var(--color-ink);">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);">

      <!-- Hero slot — full width -->
      <div class="sport-photo" style="grid-column:1/-1;aspect-ratio:16/7;">
        <img src="{base}/img/IMG_0247.jpeg" alt="Opening Race — 100m">
        <div class="sport-photo__caption">Opening race · 100m Sprint — the 3rd Interhouse begins</div>
      </div>

      <!-- IMG_0101 = sport banner -->
      <div class="sport-photo" style="aspect-ratio:4/3;">
        <img src="{base}/img/IMG_0101.jpeg" alt="Sports Banner">
        <div class="sport-photo__caption">Interhouse Sports Festival banner</div>
      </div>

      <!-- IMG_2074 = Kaosara, main sportsperson -->
      <div class="sport-photo" style="aspect-ratio:4/3;">
        <img src="{base}/img/IMG_2074.jpeg" alt="Kaosara — Main Sportsperson">
        <div class="sport-photo__caption">Kaosara — MVP of the 3rd Interhouse</div>
      </div>

      <!-- IMG_2240 = Mercy -->
      <div class="sport-photo" style="aspect-ratio:4/3;">
        <img src="{base}/img/IMG_2240.jpeg" alt="Mercy">
        <div class="sport-photo__caption">Mercy competing</div>
      </div>

    </div>
  </section>

  <!-- NARRATIVE -->
  <section class="event__narrative">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr;gap:var(--space-10);">
        <div use:animateOnScroll data-animate="fade-up">
          <p class="event__narrative-pull">"If we can run a festival like this —<br>we can compete in anything."</p>
        </div>
        <div use:animateOnScroll data-animate="fade-up">
          <p style="font-family:var(--font-sans);font-size:var(--text-base);opacity:0.65;line-height:var(--leading-loose);">The 3rd Interhouse Sports was not just a competition. It was a declaration. Four houses, hundreds of students, and an entire community showing up with full ambition for every single event on the programme.</p>
          <p style="font-family:var(--font-sans);font-size:var(--text-base);opacity:0.65;line-height:var(--leading-loose);margin-top:var(--space-4);">This is what Tendercare looks like when it performs publicly. The same energy, the same organisation, the same will to show up completely — goes into every subject, every discipline, every competition we enter.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       REACTIONS / FACES OF THE DAY
       Mix of SS2 & SS3 faces from both classes
       IMG_0063 = Face of the Day
       IMG_2233 = Anabell, IMG_2239 = Taiwo 2
       IMG_2231 = Bolu2, IMG_2230 = Queen
       IMG_2228 = Aliyah, IMG_2243 = Dara2
  ══════════════════════════════════ -->
  <section style="padding:var(--space-2) var(--space-2) 0;background:var(--color-ink);">
    <div style="padding:var(--space-5) var(--space-5) var(--space-3);">
      <span class="t-eyebrow" style="color:rgba(255,255,255,0.4);">The Faces of the Day</span>
    </div>
    <div class="reactions-grid">
      <div class="reaction-item"><img src="{base}/img/IMG_0063.jpeg" alt="Face of the Day"></div>
      <div class="reaction-item"><img src="{base}/img/IMG_2233.jpeg" alt="Anabell"></div>
      <div class="reaction-item"><img src="{base}/img/IMG_2231.jpeg" alt="Bolu2"></div>
      <div class="reaction-item"><img src="{base}/img/IMG_2230.jpeg" alt="Queen"></div>
    </div>
  </section>

  <!-- HOUSE RESULTS -->
  <section style="padding:var(--space-12) 0;background:var(--color-ink);">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" style="color:rgba(255,255,255,0.4);margin-bottom:var(--space-8);display:block;" data-animate="fade-up">Final Standings</span>
      <div use:animateOnScroll class="results-board" data-animate="fade-up">
        <div class="sports__house-row">
          <span class="sports__house-rank sports__house-rank--1">01</span>
          <div style="display:flex;align-items:center;flex:1;gap:var(--space-3);">
            <span class="house-badge" style="background:var(--color-lemon);"></span>
            <span class="sports__house-name" style="color:var(--color-lemon);">— House Name —</span>
          </div>
          <span class="sports__house-points">Champions</span>
        </div>
        <div class="sports__house-row">
          <span class="sports__house-rank sports__house-rank--2">02</span>
          <div style="display:flex;align-items:center;flex:1;gap:var(--space-3);">
            <span class="house-badge" style="background:var(--color-ash-light);"></span>
            <span class="sports__house-name">— House Name —</span>
          </div>
          <span class="sports__house-points">2nd Place</span>
        </div>
        <div class="sports__house-row">
          <span class="sports__house-rank sports__house-rank--3">03</span>
          <div style="display:flex;align-items:center;flex:1;gap:var(--space-3);">
            <span class="house-badge" style="background:#CD7F32;"></span>
            <span class="sports__house-name">— House Name —</span>
          </div>
          <span class="sports__house-points">3rd Place</span>
        </div>
        <div class="sports__house-row">
          <span class="sports__house-rank">04</span>
          <div style="display:flex;align-items:center;flex:1;gap:var(--space-3);">
            <span class="house-badge" style="background:var(--color-wine);"></span>
            <span class="sports__house-name">— House Name —</span>
          </div>
          <span class="sports__house-points">4th Place</span>
        </div>
      </div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section style="padding:var(--space-16) 0;background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.04);">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" style="color:rgba(255,255,255,0.4);margin-bottom:var(--space-10);display:block;" data-animate="fade-up">Day's Programme</span>
      <div class="event__timeline" data-stagger>
        <div use:animateOnScroll class="event__timeline-item" data-animate="fade-up">
          <div class="event__timeline-label">Morning</div>
          <div class="event__timeline-title">Opening Ceremony</div>
          <div class="event__timeline-body">March-past, anthem, declaration of games open.</div>
        </div>
        <div use:animateOnScroll class="event__timeline-item" data-animate="fade-up">
          <div class="event__timeline-label">Field Events</div>
          <div class="event__timeline-title">Long Jump · High Jump · Shot Put · Javelin</div>
          <div class="event__timeline-body">Simultaneous field events across all four houses.</div>
        </div>
        <div use:animateOnScroll class="event__timeline-item" data-animate="fade-up">
          <div class="event__timeline-label">Track</div>
          <div class="event__timeline-title">100m · 200m · 400m Heats</div>
          <div class="event__timeline-body">The crowd finds its voice. The fastest students emerge.</div>
        </div>
        <div use:animateOnScroll class="event__timeline-item" data-animate="fade-up">
          <div class="event__timeline-label">Finals</div>
          <div class="event__timeline-title">4×100m Relay · Tug of War</div>
          <div class="event__timeline-body">The events that decide everything. Every house at full capacity.</div>
        </div>
        <div use:animateOnScroll class="event__timeline-item" data-animate="fade-up">
          <div class="event__timeline-label">Closing</div>
          <div class="event__timeline-title">Awards &amp; Championship Declaration</div>
          <div class="event__timeline-body">The 3rd Interhouse champion is crowned.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section style="padding:var(--space-16) var(--space-5);background:var(--color-purple-deep);text-align:center;">
    <div use:animateOnScroll class="container container--md" data-animate="fade-up">
      <span class="t-eyebrow" style="color:var(--color-lemon);display:flex;justify-content:center;">What's Next</span>
      <h2 style="font-family:var(--font-display);font-size:var(--text-4xl);color:white;letter-spacing:var(--tracking-wide);margin-bottom:var(--space-4);">MATHEMATICS OLYMPIAD</h2>
      <p style="font-family:var(--font-sans);font-size:var(--text-sm);opacity:0.5;margin-bottom:var(--space-8);">Coming soon — another discipline. Same ambition.</p>
      <a href="{base}/" class="btn btn--accent">Back to Home</a>
    </div>
  </section>

  <Footer />

<style>
    .results-board { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); }
    .event-chip { display:inline-flex; align-items:center; gap:var(--space-2); background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-full); padding:var(--space-2) var(--space-4); font-family:var(--font-sans); font-size:var(--text-xs); color:rgba(255,255,255,0.6); letter-spacing:var(--tracking-wide); white-space:nowrap; cursor:pointer; transition:background var(--duration-fast),color var(--duration-fast); }
    .event-chip:hover { background:var(--color-lemon); color:var(--color-ink); }
    .event-chips { display:flex; flex-wrap:wrap; gap:var(--space-2); margin-top:var(--space-6); }
    .sports-stats { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,0.08); border-bottom:1px solid rgba(255,255,255,0.08); }
    .sports-stat { padding:var(--space-8) var(--space-5); border-right:1px solid rgba(255,255,255,0.08); text-align:center; }
    .sports-stat:last-child { border-right:none; }
    .sports-stat-n { font-family:var(--font-display); font-size:var(--text-4xl); color:var(--color-lemon); line-height:1; display:block; }
    .sports-stat-l { font-family:var(--font-sans); font-size:var(--text-xs); opacity:0.4; letter-spacing:var(--tracking-widest); text-transform:uppercase; display:block; margin-top:var(--space-2); }

    /* Photo slots */
    .sport-photo { position:relative; overflow:hidden; background:var(--color-ink-soft); }
    .sport-photo img { width:100%; height:100%; object-fit:cover; object-position:center top; filter:brightness(0.88) saturate(1.1); transition:transform var(--duration-slow) var(--ease-out),filter var(--duration-slow); }
    .sport-photo:hover img { transform:scale(1.05); filter:brightness(1) saturate(1.2); }
    .sport-photo__caption { position:absolute; bottom:0; left:0; right:0; padding:var(--space-4); background:linear-gradient(to top,rgba(0,0,0,0.75),transparent); color:white; font-family:var(--font-sans); font-size:var(--text-sm); transform:translateY(100%); transition:transform var(--duration-base) var(--ease-out); }
    .sport-photo:hover .sport-photo__caption { transform:translateY(0); }

    /* Reaction faces grid */
    .reactions-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:var(--color-ink); }
    @media(min-width:768px){ .reactions-grid { grid-template-columns:repeat(6,1fr); } }
    .reaction-item { aspect-ratio:1; overflow:hidden; position:relative; cursor:pointer; }
    .reaction-item img { width:100%; height:100%; object-fit:cover; object-position:center 15%; filter:grayscale(0.15) brightness(0.9); transition:transform var(--duration-base) var(--ease-out),filter var(--duration-base); }
    .reaction-item:hover img { transform:scale(1.08); filter:grayscale(0) brightness(1); }
</style>
