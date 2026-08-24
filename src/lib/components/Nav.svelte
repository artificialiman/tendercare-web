<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		current?: 'home' | 'sports' | 'yearbook' | 'awards' | 'feed' | 'results' | 'portal' | 'about';
		transparent?: boolean;
	}
	let { current = 'home', transparent = false }: Props = $props();

	const links = [
		{ id: 'home', href: `${base}/`, label: 'Home' },
		{ id: 'sports', href: `${base}/sports/`, label: 'Sports' },
		{ id: 'yearbook', href: `${base}/yearbook/`, label: 'Yearbook' },
		{ id: 'awards', href: `${base}/awards/`, label: 'Awards' },
		{ id: 'feed', href: `${base}/feed/`, label: 'Feed' },
		{ id: 'results', href: `${base}/results/`, label: 'Results' },
		{ id: 'portal', href: `${base}/student-portal/`, label: 'Portal' },
		{ id: 'about', href: `${base}/about/`, label: 'About' }
	];

	let drawerOpen = $state(false);
	let scrolled = $state(false);

	function toggleDrawer() {
		drawerOpen = !drawerOpen;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = drawerOpen ? 'hidden' : '';
		}
	}
	function closeDrawer() {
		drawerOpen = false;
		if (typeof document !== 'undefined') document.body.style.overflow = '';
	}

	function onScroll() {
		scrolled = window.scrollY > 40;
	}
</script>

<svelte:window onscroll={onScroll} />

<nav class="nav" class:nav--transparent={transparent} class:nav--scrolled={scrolled}>
	<a href={`${base}/`} class="nav__logo">
		<span
			style="font-family:var(--font-serif);font-size:1.15rem;font-weight:600;color:var(--color-ink);letter-spacing:0.02em;"
			>TCC</span
		>
	</a>
	<div class="nav__links">
		{#each links as link (link.id)}
			<a href={link.href} class="nav__link" class:nav__link--active={current === link.id}
				>{link.label}</a
			>
		{/each}
	</div>
	<button class="nav__toggle" aria-label="Open menu" onclick={toggleDrawer}>
		<span class="nav__toggle-bar"></span>
		<span class="nav__toggle-bar"></span>
		<span class="nav__toggle-bar"></span>
	</button>
</nav>

<div class="nav__drawer" class:nav__drawer--open={drawerOpen}>
	{#each links as link (link.id)}
		<a href={link.href} class="nav__drawer-link" onclick={closeDrawer}>{link.label}</a>
	{/each}
</div>
