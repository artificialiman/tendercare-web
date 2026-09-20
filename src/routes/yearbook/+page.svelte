<script lang="ts">
	import { base } from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { animateOnScroll } from '$lib/actions/scrollFx';
	import yearbookData from '$lib/data/yearbook.json';

	type Student = { id: string; full_name: string; portrait_url: string | null; quote: string | null };
	type ClassBlock = { class_id: string; label: string; students: Student[] };

	const priorityClasses = yearbookData.priority_classes as ClassBlock[];
	const hasContent = priorityClasses.some((c) => c.students.length > 0);
</script>

<svelte:head>
	<title>Yearbook — Tendercare Comprehensive College</title>
	<meta name="description" content="Tendercare Comprehensive College — this year's yearbook." />
</svelte:head>

<Nav current="yearbook" transparent={false} />

<section class="section" style="padding-top:calc(var(--space-20) + var(--space-10));background:var(--color-cream);">
	<div class="container container--md">
		<span use:animateOnScroll class="t-eyebrow" data-animate="fade-up">Yearbook</span>
		<h1 use:animateOnScroll class="t-prestige" style="margin-bottom:var(--space-4);" data-animate="fade-up">
			This year's<br><em>class.</em>
		</h1>
		<p use:animateOnScroll class="t-body" style="opacity:0.65;max-width:60ch;" data-animate="fade-up">
			Updated each September as SS2 and JSS2 become the senior classes on record here.
		</p>
		<a use:animateOnScroll href="{base}/yearbook/class-of-2025/" class="btn btn--ghost" style="margin-top:var(--space-5);display:inline-block;" data-animate="fade-up">
			View the Class of 2025 yearbook →
		</a>
	</div>
</section>

{#if !hasContent}
	<section class="section" style="background:var(--color-cream);">
		<div class="container container--md">
			<p class="t-body" style="opacity:0.55;">
				This year's yearbook hasn't been generated from the live roster yet.
			</p>
		</div>
	</section>
{/if}

{#each priorityClasses as cls (cls.class_id)}
	{#if cls.students.length > 0}
		<section class="section" style="background:var(--color-cream);border-top:1px solid var(--color-cream-deep);">
			<div class="container">
				<h2 use:animateOnScroll style="font-family:var(--font-serif);font-size:var(--text-3xl);font-weight:300;color:var(--color-ink);margin-bottom:var(--space-8);" data-animate="fade-up">
					{cls.label}
				</h2>
				<div class="grid grid--3" data-stagger>
					{#each cls.students as student (student.id)}
						<div use:animateOnScroll class="yb-card" data-animate="fade-up">
							<div class="yb-card__portrait">
								{#if student.portrait_url}
									<img src={student.portrait_url} alt="" loading="lazy" />
								{:else}
									<span class="yb-card__initial">{student.full_name.charAt(0)}</span>
								{/if}
							</div>
							<span class="yb-card__name">{student.full_name}</span>
							{#if student.quote}
								<p class="yb-card__quote">"{student.quote}"</p>
							{:else}
								<p class="yb-card__quote yb-card__quote--pending">Quote not yet supplied</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}
{/each}

<Footer />

<style>
	.yb-card {
		border: 1px solid var(--color-cream-deep);
		border-radius: var(--radius-md);
		padding: var(--space-5) var(--space-6);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-2);
	}
	.yb-card__portrait {
		width: 84px;
		height: 84px;
		border-radius: 50%;
		overflow: hidden;
		background: var(--color-ink);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-2);
	}
	.yb-card__portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.yb-card__initial {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		color: rgba(255, 255, 255, 0.6);
	}
	.yb-card__name {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--color-ink);
	}
	.yb-card__quote {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		opacity: 0.6;
		font-style: italic;
	}
	.yb-card__quote--pending {
		opacity: 0.35;
		font-style: normal;
	}
</style>
