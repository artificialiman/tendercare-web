import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess()
	// kit-level options (adapter, paths, prerender) live in vite.config.ts —
	// this SvelteKit version ignores them here once vite.config.ts sets them.
};

export default config;
