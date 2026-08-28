import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}),

			// GitHub Pages project site: set BASE_PATH env var if this becomes a
			// custom-domain / user site instead.
			paths: {
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`
			},

			prerender: {
				// All internal routes (sports/yearbook/awards/feed/about) now exist,
				// and Results/Student-Portal correctly point at PORTAL_URL (a
				// separate app) rather than an internal route — so there's nothing
				// left that should legitimately 404 during prerender EXCEPT student
				// portrait images, which are expected to be missing for most
				// students until they're manually provisioned (see the awards page
				// and its /img/portraits/{student_id}.jpg convention). Those are
				// selectively ignored below; everything else still fails the build.
				handleHttpError: ({ status, path, referenceType, referrer }) => {
					if (status === 404 && path.startsWith('/img/portraits/')) {
						return; // expected — most students don't have a portrait yet
					}
					throw new Error(
						`${status} ${path}${referrer ? ` (linked from ${referenceType} ${referrer})` : ''}`
					);
				}
			}
		})
	]
});
