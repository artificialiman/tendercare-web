<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { animateOnScroll, countUp, parallax } from '$lib/actions/scrollFx';
	import top3Data from '$lib/data/top3.json';

	const CLASS_ORDER = [
		'JSS1A', 'JSS1B', 'JSS2A', 'JSS2B', 'JSS3A', 'JSS3B',
		'SS1 Science', 'SS1 Actuarial', 'SS2 Science', 'SS2 Actuarial',
		'SS3 Science', 'SS3 Actuarial'
	];

	interface Top3Entry {
		academic_year: string;
		term_name: string;
		top3: { name: string; average: number }[];
	}
	const top3: Record<string, Top3Entry> = top3Data;
	const publishedClasses = CLASS_ORDER.filter((c) => c in top3);
</script>

<svelte:head>
	<title>Academic Record — Tendercare Comprehensive College</title>
	<meta name="description" content="Tendercare Comprehensive College — 2025 Academic Record and distinguished students." />
</svelte:head>

<Nav current="awards" transparent={true} light={true} />

  <!-- Hero -->
  <section class="awards__hero">
    <div class="container">
      <span class="t-eyebrow" style="color:var(--color-lemon);animation:fadeIn 0.6s ease 0.1s both;">Academic Record · 2025</span>
      <h1 class="awards__hero-title" style="animation:fadeUp 0.9s var(--ease-out) 0.3s both;">
        The students<br>who <em>distinguished</em><br>themselves.
      </h1>
      <p style="font-family:var(--font-sans);font-size:var(--text-base);opacity:0.55;max-width:44ch;margin-top:var(--space-6);line-height:var(--leading-loose);animation:fadeUp 0.9s var(--ease-out) 0.5s both;">
        Academic excellence. Competition victories. Creative achievement. A record of what this school produces when it commits fully to every discipline.
      </p>
    </div>
  </section>

  <!-- Stats -->
  <div class="awards-stats" data-stagger>
    <div use:animateOnScroll class="awards-stat" data-animate="scale-in">
      <span class="awards__counter" data-count="12" data-suffix="">0</span>
      <span class="t-stat__label">Subjects Excelled</span>
    </div>
    <div use:animateOnScroll class="awards-stat" data-animate="scale-in">
      <span class="awards__counter" data-count="25" data-suffix="+">0</span>
      <span class="t-stat__label">Awards Given</span>
    </div>
    <div use:animateOnScroll class="awards-stat" data-animate="scale-in">
      <span class="awards__counter" data-count="5" data-suffix="">0</span>
      <span class="t-stat__label">External Competitions</span>
    </div>
    <div use:animateOnScroll class="awards-stat" data-animate="scale-in">
      <span class="awards__counter" data-count="100" data-suffix="%">0</span>
      <span class="t-stat__label">Pass Rate 2025</span>
    </div>
  </div>

  <!-- Award cards -->
  <section class="section" style="background:transparent;">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" style="color:rgba(255,255,255,0.4);margin-bottom:var(--space-8);display:block;" data-animate="fade-up">Distinctions</span>

      <div class="grid grid--3" data-stagger>

        <div use:animateOnScroll class="awards__card" data-animate="fade-up">
          <div class="awards__card-icon" style="background:var(--color-lemon);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1020" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h3 class="awards__card-title">Best Overall Student</h3>
          <p class="awards__card-recipient">— Student Name —</p>
          <p class="awards__card-body">Consistently highest academic performance across all subjects throughout the academic year.</p>
        </div>

        <div use:animateOnScroll class="awards__card" data-animate="fade-up">
          <div class="awards__card-icon" style="background:var(--color-purple-light);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1020" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 class="awards__card-title">Mathematics Excellence</h3>
          <p class="awards__card-recipient">— Student Name —</p>
          <p class="awards__card-body">Outstanding performance in Mathematics across internal assessments and external competitions.</p>
        </div>

        <div use:animateOnScroll class="awards__card" data-animate="fade-up">
          <div class="awards__card-icon" style="background:#00E8D4;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1020" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <h3 class="awards__card-title">Sciences Award</h3>
          <p class="awards__card-recipient">— Student Name —</p>
          <p class="awards__card-body">Excellence across Physics, Chemistry, and Biology — a complete scientific mind.</p>
        </div>

        <div use:animateOnScroll class="awards__card" data-animate="fade-up">
          <div class="awards__card-icon" style="background:var(--color-wine-light);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 class="awards__card-title">Creative Arts</h3>
          <p class="awards__card-recipient">— Student Name —</p>
          <p class="awards__card-body">Exceptional creative expression across drama, visual arts, and literary work.</p>
        </div>

        <div use:animateOnScroll class="awards__card" data-animate="fade-up">
          <div class="awards__card-icon" style="background:#F0A800;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1020" stroke-width="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          </div>
          <h3 class="awards__card-title">Leadership Award</h3>
          <p class="awards__card-recipient">— Student Name —</p>
          <p class="awards__card-body">For exceptional service to the school community and demonstrated leadership among peers.</p>
        </div>

        <div use:animateOnScroll class="awards__card" data-animate="fade-up">
          <div class="awards__card-icon" style="background:var(--color-lemon);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1020" stroke-width="2.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
          </div>
          <h3 class="awards__card-title">Most Improved</h3>
          <p class="awards__card-recipient">— Student Name —</p>
          <p class="awards__card-body">The student who showed the greatest growth, determination, and commitment to progress.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- Honour Roll table -->
  <section class="section" style="background:rgba(0,0,0,0.2);">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" style="color:rgba(255,255,255,0.4);margin-bottom:var(--space-8);display:block;" data-animate="fade-up">Honour Roll 2025</span>

      <div use:animateOnScroll style="overflow-x:auto;" data-animate="fade-up">
        <table class="honour-table">
          <thead>
            <tr>
              <th>Award</th>
              <th>Recipient</th>
              <th>Subject / Area</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="award-name">Principal's Prize</td><td class="award-student">— Student Name —</td><td class="award-subject">All-round Excellence</td></tr>
            <tr><td class="award-name">Mathematics Prize</td><td class="award-student">— Student Name —</td><td class="award-subject">Mathematics</td></tr>
            <tr><td class="award-name">English Language Award</td><td class="award-student">— Student Name —</td><td class="award-subject">English Language</td></tr>
            <tr><td class="award-name">Sciences Prize</td><td class="award-student">— Student Name —</td><td class="award-subject">Physics / Chemistry / Biology</td></tr>
            <tr><td class="award-name">Social Studies Award</td><td class="award-student">— Student Name —</td><td class="award-subject">Social Studies</td></tr>
            <tr><td class="award-name">Creative Arts Prize</td><td class="award-student">— Student Name —</td><td class="award-subject">Fine Art & Drama</td></tr>
            <tr><td class="award-name">Debate Champion</td><td class="award-student">— Student Name —</td><td class="award-subject">Interschool Debate</td></tr>
            <tr><td class="award-name">Athletic Champion</td><td class="award-student">— Student Name —</td><td class="award-subject">Track & Field</td></tr>
            <tr><td class="award-name">Best in Class — SS3</td><td class="award-student">— Student Name —</td><td class="award-subject">SS3 Graduating Class</td></tr>
          </tbody>
        </table>
      </div>
      <p style="font-family:var(--font-sans);font-size:var(--text-xs);opacity:0.25;margin-top:var(--space-4);letter-spacing:var(--tracking-wide);">* Replace with actual award recipients</p>
    </div>
  </section>

  <!-- Top 3 per class-arm -->
  <section class="section" style="background:transparent;">
    <div class="container">
      <span use:animateOnScroll class="t-eyebrow" style="color:rgba(255,255,255,0.4);margin-bottom:var(--space-8);display:block;" data-animate="fade-up">Top 3 — By Class</span>

      {#if publishedClasses.length === 0}
        <p style="font-family:var(--font-sans);font-size:var(--text-sm);opacity:0.45;max-width:48ch;">
          Top performers per class will appear here once each class's results are far enough along to publish — at least 40% of a class needs complete scores before any names are shown.
        </p>
      {:else}
        <div class="grid grid--3" data-stagger>
          {#each publishedClasses as classArm (classArm)}
            <div use:animateOnScroll class="awards__card" data-animate="fade-up">
              <h3 class="awards__card-title">{classArm}</h3>
              <p style="font-family:var(--font-sans);font-size:var(--text-xs);opacity:0.4;margin-bottom:var(--space-3);">
                {top3[classArm].academic_year} · {top3[classArm].term_name} Term
              </p>
              <ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-2);">
                {#each top3[classArm].top3 as student, i (student.name)}
                  <li style="display:flex;justify-content:space-between;font-family:var(--font-sans);font-size:var(--text-sm);">
                    <span>{i + 1}. {student.name}</span>
                    <span style="opacity:0.5;">{student.average}</span>
                  </li>
                {/each}
              </ol>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <!-- Photo gallery -->
  <section style="padding:var(--space-2);background:var(--color-purple-deep);">
    <div style="padding:var(--space-5) var(--space-5) var(--space-3);">
      <span use:animateOnScroll class="t-eyebrow" style="color:rgba(255,255,255,0.4);" data-animate="fade-up">Moments of Achievement</span>
    </div>
    <div class="awards__gallery" data-stagger>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--1">Prize giving day</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--2">Science fair</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--3">Debate team</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--4">Mathematics</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--5">Drama</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--6">Graduation</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--7">Assembly</div></div>
      <div use:animateOnScroll class="awards__gallery-item" data-animate="scale-in"><div class="gallery-ph gph--8">Ceremony</div></div>
    </div>
  </section>
  <Footer />

<style>

    /* Awards gallery placeholder colors */
    .gph--1 { background: linear-gradient(160deg,#2a1050,#4a2080); }
    .gph--2 { background: linear-gradient(160deg,#103028,#204840); }
    .gph--3 { background: linear-gradient(160deg,#301010,#502020); }
    .gph--4 { background: linear-gradient(160deg,#101030,#202050); }
    .gph--5 { background: linear-gradient(160deg,#182010,#283020); }
    .gph--6 { background: linear-gradient(160deg,#201018,#382028); }
    .gph--7 { background: linear-gradient(160deg,#102030,#204050); }
    .gph--8 { background: linear-gradient(160deg,#281010,#482020); }

    .gallery-ph {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding: var(--space-3);
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      color: rgba(255,255,255,0.25);
      letter-spacing: var(--tracking-wide);
      text-transform: uppercase;
    }

    /* Honour roll table */
    .honour-table { width: 100%; border-collapse: collapse; }
    .honour-table th {
      font-family: var(--font-sans);
      font-size: var(--text-xs);
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      opacity: 0.4;
      text-align: left;
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .honour-table td {
      padding: var(--space-4);
      border-bottom: 1px solid rgba(255,255,255,0.05);
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      vertical-align: middle;
    }
    .honour-table tr:hover td { background: rgba(255,255,255,0.03); }
    .honour-table .award-name {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: var(--text-base);
      color: var(--color-cream);
    }
    .honour-table .award-student {
      color: var(--color-lemon);
    }
    .honour-table .award-subject {
      opacity: 0.5;
    }

    /* Stats bar */
    .awards-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1px;
      background: rgba(255,255,255,0.06);
      margin: var(--space-12) 0;
    }
    @media (min-width: 640px) {
      .awards-stats { grid-template-columns: repeat(4, 1fr); }
    }
    .awards-stat {
      background: var(--color-purple-deep);
      padding: var(--space-8) var(--space-6);
      text-align: center;
    }

</style>
