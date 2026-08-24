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
				// TODO: tighten back to the default 'fail' once sports/yearbook/awards/
				// feed/results/student-portal/about routes all exist — until then,
				// homepage links to them are expected and shouldn't fail the build.
				handleHttpError: 'warn'
			}
		})
	]
});
