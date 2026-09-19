import { createClient } from '@supabase/supabase-js';

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

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
