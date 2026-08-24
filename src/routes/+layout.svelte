<script lang="ts">
	import '$lib/styles/tendercare.css';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	let transitioning = $state(false);

	onNavigate((navigation) => {
		if (!navigation.to) return;
		transitioning = true;
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
				setTimeout(() => (transitioning = false), 50);
			}, 200);
		});
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Bebas+Neue&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="page-transition"
	class:page-transition--in={transitioning}
	class:page-transition--out={!transitioning}
></div>

{@render children()}
