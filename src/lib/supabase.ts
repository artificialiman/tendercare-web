import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * tendercare-web is a fully static, prerendered site (adapter-static,
 * strict: true, see vite.config.ts) -- there are no server routes here
 * and there never can be, so this client only ever runs in the browser
 * and only ever uses the anon key. Same Supabase project as
 * tendercare-teacher/tendercare-portal (see their .env.example files).
 *
 * PUBLIC_ prefix (SvelteKit's $env/static/public convention) is
 * required for these to be readable client-side at all -- unprefixed
 * vars are server-only and would be undefined here even if set, since
 * this app has no server runtime to read them in.
 */
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

/**
 * getSupabase() constructs the client lazily, on first call, instead
 * of at module import time. This matters specifically because the
 * root layout sets `prerender = true` globally (see +layout.ts) --
 * SvelteKit executes a page's module during `npm run build` to
 * generate its static HTML shell, which means a module-scope
 * `createClient(...)` call runs then too, not just in the browser
 * after hydration as the feed page's onMount-driven fetch assumed.
 * createClient() throws synchronously on a missing/empty url or key,
 * and that's exactly what happened: the last two deploys' `npm run
 * build` step failed with "supabaseUrl is required" during
 * prerendering, because whatever env the build ran with at that
 * moment didn't have both vars populated.
 *
 * Deferring construction to first call means prerendering never
 * touches this at all -- the feed page still calls getSupabase() only
 * from inside onMount (browser-only, post-hydration), so this line
 * now never executes during a build no matter what the env vars are
 * at build time. The page keeps its real prerendered static shell
 * (checked into build/feed/index.html like every other route) --
 * nothing about prerendering itself was ever the problem; only
 * *when* the client got constructed was.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
	if (client) return client;
	if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
		// A real misconfiguration (unset repo secrets), not a build-time
		// prerendering artifact -- surfaced to the caller instead of
		// thrown, so a genuinely broken deploy shows a clear in-page
		// message (see feed/+page.svelte) instead of crashing.
		return null;
	}
	client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	return client;
}
