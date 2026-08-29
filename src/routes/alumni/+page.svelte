<script lang="ts">
	import { base } from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { animateOnScroll } from '$lib/actions/scrollFx';
	import alumniData from '$lib/data/alumni.json';

	type AlumniClass = { graduated_on: string; id_recycle_eligible_on: string; alumni: { name: string; arm: string }[] };
	const classes = alumniData.classes as Record<string, AlumniClass>;
	const years = Object.keys(classes).sort((a, b) => Number(b) - Number(a));
</script>

<svelte:head>
	<title>Alumni Almanac — Tendercare Comprehensive College</title>
	<meta name="description" content="Tendercare Comprehensive College — the Alumni Almanac, a record of every graduating class." />
</svelte:head>

<Nav current="alumni" transparent={false} />

<section class="section" style="padding-top:calc(var(--space-20) + var(--space-10));background:var(--color-cream);">
	<div class="container container--md">
		<span use:animateOnScroll class="t-eyebrow" data-animate="fade-up">Alumni Almanac</span>
		<h1 use:animateOnScroll class="t-prestige" style="margin-bottom:var(--space-4);" data-animate="fade-up">
			Every class that<br><em>came before.</em>
		</h1>
		<p use:animateOnScroll class="t-body" style="opacity:0.65;max-width:60ch;" data-animate="fade-up">
			A record of every graduating class, kept as an archive independent of the current
			student roster.
		</p>
	</div>
</section>

{#if years.length === 0}
	<section class="section" style="background:var(--color-cream);">
		<div class="container container--md">
			<p class="t-body" style="opacity:0.55;">No graduating classes are on record yet.</p>
		</div>
	</section>
{/if}

{#each years as year (year)}
	{@const cls = classes[year]}
	<section class="section" style="background:var(--color-cream);border-top:1px solid var(--color-cream-deep);">
		<div class="container">
			<div use:animateOnScroll style="display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:var(--space-3);margin-bottom:var(--space-8);" data-animate="fade-up">
				<h2 style="font-family:var(--font-serif);font-size:var(--text-3xl);font-weight:300;color:var(--color-ink);">Class of {year}</h2>
				<a href="{base}/yearbook/" class="btn btn--ghost">View Yearbook →</a>
			</div>
			<div class="grid grid--3" data-stagger>
				{#each cls.alumni as person (person.name)}
					<div use:animateOnScroll class="alumni-card" data-animate="fade-up">
						<span class="alumni-card__name">{person.name}</span>
						<span class="alumni-card__arm">{person.arm}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/each}

<Footer />

<style>
	.alumni-card {
		border: 1px solid var(--color-cream-deep);
		border-radius: var(--radius-md);
		padding: var(--space-5) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.alumni-card__name {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--color-ink);
	}
	.alumni-card__arm {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		opacity: 0.5;
	}
</style>
