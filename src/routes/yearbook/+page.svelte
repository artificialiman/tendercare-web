<script lang="ts">
	import { base } from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { animateOnScroll, countUp, parallax, flipOnClick } from '$lib/actions/scrollFx';
	import { PORTAL_URL } from '$lib/config';
	import { onMount } from 'svelte';

	onMount(() => {
		document.body.classList.add('yearbook-bg');
		return () => document.body.classList.remove('yearbook-bg');
	});
</script>

<svelte:head>
	<title>Yearbook 2025 — Tendercare Comprehensive College</title>
	<meta name="description" content="Tendercare Comprehensive College — Class of 2025 Yearbook." />
</svelte:head>

<Nav current="yearbook" />

  <!-- Cover -->
  <section class="yearbook__cover" style="background:#EDE5D8;">
    <div class="yearbook__cover-year" style="font-size:clamp(6rem,30vw,14rem);">2025</div>
    <div class="yearbook__cover-content" style="animation:fadeUp 1s var(--ease-out) 0.2s both;">
      <span use:animateOnScroll class="yearbook__cover-class" style="margin-bottom:var(--space-5);display:block;" data-animate="fade-up">Tendercare Comprehensive College</span>
      <h1 class="yearbook__cover-title">Class of 2025</h1>
      <div class="yearbook__dedication-line"></div>
      <p style="font-family:var(--font-body);font-style:italic;font-size:var(--text-base);opacity:0.55;max-width:30ch;margin:0 auto;line-height:var(--leading-loose);">
        To every student who walked through these gates and left bigger than when they arrived.
      </p>
    </div>
  </section>

  <!-- Dedication -->
  <section class="yearbook__dedication" style="background:#E8DFCF;">
    <div class="container container--md">
      <p use:animateOnScroll class="class-motto" data-animate="fade-up">
        "We were not just students here.<br>We were becoming."
      </p>
      <p use:animateOnScroll style="font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;opacity:0.4;margin-top:var(--space-6);" data-animate="fade-up">— Class of 2025 Dedication</p>
    </div>
  </section>

  <!-- Group photo -->
  <section style="background:#D8CFC4;position:relative;overflow:hidden;">
    <div class="yearbook__group" style="aspect-ratio:16/7;max-height:480px;">
      <img src="{base}/img/IMG_0101.jpeg"
           alt="Graduating Class · Tendercare Comprehensive College · 2025"
           style="width:100%;height:100%;object-fit:cover;object-position:center top;">
    </div>
    <div style="position:absolute;bottom:var(--space-6);left:0;right:0;text-align:center;">
      <span style="font-family:var(--font-serif);font-style:italic;font-size:var(--text-sm);color:rgba(248,244,236,0.7);text-shadow:0 1px 4px rgba(0,0,0,0.4);">Graduating Class · Tendercare Comprehensive College · 2025</span>
    </div>
  </section>

  <!-- Portrait grid -->
  <section class="section" style="background:#EDE5D8;">
    <div class="container">
      <div use:animateOnScroll class="ornament" data-animate="fade-up">
        <div class="ornament__line"></div>
        <div class="ornament__center">✦</div>
        <div class="ornament__line"></div>
      </div>
      <span use:animateOnScroll class="t-eyebrow" style="color:var(--color-wine);margin-bottom:var(--space-3);" data-animate="fade-up">The Class</span>
      <h2 use:animateOnScroll style="font-family:var(--font-serif);font-size:var(--text-3xl);font-weight:300;color:#2A1E10;margin-bottom:var(--space-10);" data-animate="fade-up">
        Forty students.<br><em>Forty futures.</em>
      </h2>

      <div class="grid--portraits" data-stagger>

        <!-- Angel -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2109.jpeg" alt="Angel" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"The beginning of everything was here."</p>
              <p class="yearbook__card-name">Angel</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Angel" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Bamise -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2110.jpeg" alt="Bamise" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"I found my voice in these classrooms."</p>
              <p class="yearbook__card-name">Bamise</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Bamise" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Bright -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2111.jpeg" alt="Bright" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Every challenge made me stronger."</p>
              <p class="yearbook__card-name">Bright</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Bright" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Dorcas -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2147.jpeg" alt="Dorcas" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Tendercare gave me the full range."</p>
              <p class="yearbook__card-name">Dorcas</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Dorcas" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Enoch -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2178.jpeg" alt="Enoch" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"I leave ready for anything."</p>
              <p class="yearbook__card-name">Enoch</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Enoch" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Famous -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2184.jpeg" alt="Famous" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Five years. A lifetime of memories."</p>
              <p class="yearbook__card-name">Famous</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Famous" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Fauziyyah -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2204.jpeg" alt="Fauziyyah" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"This place believed in me first."</p>
              <p class="yearbook__card-name">Fauziyyah</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Fauziyyah" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Fawaz -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2215.jpeg" alt="Fawaz" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"We were the standard."</p>
              <p class="yearbook__card-name">Fawaz</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Fawaz" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Fiyin -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2218.jpeg" alt="Fiyin" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Knowledge is the only currency I need."</p>
              <p class="yearbook__card-name">Fiyin</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Fiyin" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Habitat -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2230.jpeg" alt="Habitat" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"I came, I learned, I grew."</p>
              <p class="yearbook__card-name">Habitat</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Habitat" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Kaosara -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2231.jpeg" alt="Kaosara" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Every step here shaped my tomorrow."</p>
              <p class="yearbook__card-name">Kaosara</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Kaosara" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Khadija -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2233.jpeg" alt="Khadija" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Grateful for every lesson."</p>
              <p class="yearbook__card-name">Khadija</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Khadija" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Mercy -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2240.jpeg" alt="Mercy" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Mercy is my name and my nature."</p>
              <p class="yearbook__card-name">Mercy</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Mercy" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Michael -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2243.jpeg" alt="Michael" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Built to lead, trained to serve."</p>
              <p class="yearbook__card-name">Michael</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Michael" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Moyin -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2255.jpeg" alt="Moyin" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"The future belongs to the prepared."</p>
              <p class="yearbook__card-name">Moyin</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Moyin" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Prosper -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2256.jpeg" alt="Prosper" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"I came here to prosper — and I did."</p>
              <p class="yearbook__card-name">Prosper</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Prosper" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Rita -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2275.jpeg" alt="Rita" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Quiet but unstoppable."</p>
              <p class="yearbook__card-name">Rita</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Rita" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Rokibat -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2285.jpeg" alt="Rokibat" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"I leave bigger than I arrived."</p>
              <p class="yearbook__card-name">Rokibat</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Rokibat" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Samuel -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_0247.jpeg" alt="Samuel" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"God's plan, my dedication."</p>
              <p class="yearbook__card-name">Samuel</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Samuel" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Taiwo -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2074.jpeg" alt="Taiwo" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Double the name, double the drive."</p>
              <p class="yearbook__card-name">Taiwo</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Taiwo" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Temi — already had IMG_2107, properly wrapped now -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2107.jpeg" alt="Temi" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Every step counts."</p>
              <p class="yearbook__card-name">Temi</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Temi" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

        <!-- Zainab -->
        <div use:animateOnScroll use:flipOnClick class="yearbook__card yearbook__card--flip" role="button" tabindex="0" data-animate="fade-up" title="Click to flip">
          <div class="yearbook__card-inner">
            <div class="yearbook__card-front">
              <img src="{base}/img/IMG_2076.jpeg" alt="Zainab" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
            </div>
            <div class="yearbook__card-back">
              <p class="yearbook__card-quote">"Faith carried me through every exam."</p>
              <p class="yearbook__card-name">Zainab</p>
              <p class="yearbook__card-ambition">SS3 Science</p>
              <a href="{PORTAL_URL}/result/?student=Zainab" class="yearbook__card-results" onclick={(e) => e.stopPropagation()}>View Results →</a>
            </div>
          </div>
        </div>

      </div>

      <p style="font-family:var(--font-sans);font-size:var(--text-xs);opacity:0.3;text-align:center;margin-top:var(--space-6);letter-spacing:var(--tracking-wide);">Flip any portrait to see their message · Click View Results to access their academic record</p>

      <div use:animateOnScroll class="ornament" style="margin-top:var(--space-12);" data-animate="fade-up">
        <div class="ornament__line"></div>
        <div class="ornament__center">✦</div>
        <div class="ornament__line"></div>
      </div>
    </div>
  </section>

  <!-- Closing -->
  <section style="padding:var(--space-20) var(--space-5);background:#E0D7C8;text-align:center;">
    <div use:animateOnScroll class="container container--md" data-animate="fade-up">
      <p style="font-family:var(--font-serif);font-size:var(--text-3xl);font-weight:300;font-style:italic;color:#2A1E10;line-height:var(--leading-snug);margin-bottom:var(--space-8);">
        Go well, Class of 2025.<br>
        <span style="opacity:0.5;font-size:var(--text-xl);">The school watches with pride.</span>
      </p>
      <div class="yearbook__dedication-line" style="margin:0 auto var(--space-8);"></div>
      <a href="{base}/awards/" class="btn btn--wine">See the Academic Record</a>
    </div>
  </section>
  <Footer />

<style>
    :global(body.yearbook-bg) { background: #EDE5D8; color: #2A1E10; }

    /* Paper texture */
    :global(body.yearbook-bg::before) {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(0,0,0,0.012) 24px,rgba(0,0,0,0.012) 25px);
      pointer-events: none;
      z-index: 9998;
    }

    /* Results link on card back */
    .yearbook__card-results {
      display: inline-block;
      margin-top: 0.75rem;
      font-family: var(--font-sans);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-cream);
      border: 1px solid rgba(248,244,236,0.35);
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      text-decoration: none;
      transition: background 0.2s, border-color 0.2s;
    }
    .yearbook__card-results:hover {
      background: rgba(248,244,236,0.12);
      border-color: rgba(248,244,236,0.7);
    }

    /* Note: original had a scrolled-nav cream-background override here
       (.nav--yearbook.nav--scrolled) that doesn't carry over now that Nav
       is a shared component instantiated once per page. Nav.svelte would
       need a `theme` prop to bring this back if it's wanted. */

    /* Section divider ornament */
    .ornament {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin: var(--space-10) 0;
    }
    .ornament__line {
      flex: 1;
      height: 1px;
      background: var(--color-wine);
      opacity: 0.3;
    }
    .ornament__center {
      font-family: var(--font-serif);
      font-size: var(--text-lg);
      color: var(--color-wine);
      opacity: 0.5;
    }

    /* Class motto */
    .class-motto {
      font-family: var(--font-serif);
      font-size: var(--text-2xl);
      font-weight: 300;
      font-style: italic;
      color: #2A1E10;
      line-height: var(--leading-snug);
      border-left: 3px solid var(--color-wine);
      padding-left: var(--space-6);
      opacity: 0.8;
    }
</style>
