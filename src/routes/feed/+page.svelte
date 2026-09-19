<script lang="ts">
	// Full replacement of the old localStorage/open-commenting feed, per
	// the September rollover handoff (Lane 2). That version let anyone
	// set an arbitrary display name and post/comment anything — the real
	// spec is the opposite: admin/result activity only, reactions-only
	// with no comments, posted server-side via DB triggers in
	// tendercare-teacher (see supabase/migrations/0016 and 0017 there),
	// never client-writable here.
	//
	// This page is a standalone mobile-app-style mockup (no shared
	// Nav/Footer — its own "← Home" link, fixed max-width phone-frame
	// layout), same as before.
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { supabase } from '$lib/supabase';

	type FeedKind = 'result_upload' | 'class_average' | 'media_change' | 'staff_role_change' | 'staff_arrival';

	interface FeedPost {
		id: string;
		kind: FeedKind;
		payload: Record<string, unknown>;
		created_at: string;
		reaction_count: number;
	}

	let posts = $state<FeedPost[]>([]);
	let loading = $state(true);
	let loadError = $state('');

	/**
	 * One sentence per kind, built from payload -- see 0016's comment on
	 * feed_posts.payload: rendering happens here, not stored pre-baked,
	 * so wording can change without a migration. Deliberately does NOT
	 * surface a student's full_name for result_upload/media_change --
	 * the spec is "upload dates" as an activity signal, not a public
	 * per-student results board; class_id and staff full_name are the
	 * only identifying details these render, matching what the trigger
	 * migrations actually put in payload.
	 */
	function describePost(post: FeedPost): string {
		const p = post.payload;
		switch (post.kind) {
			case 'result_upload':
				return `Results updated for ${p.class_id ?? 'a class'}.`;
			case 'class_average':
				return `${p.class_id ?? 'A class'}'s average is now ${p.average ?? '—'}.`;
			case 'media_change':
				return `A student portrait was updated in ${p.class_id ?? 'a class'}.`;
			case 'staff_arrival': {
				const kind = p.staff_type === 'corps_member' ? 'corps member' : 'part-time teacher';
				return `${p.full_name ?? 'A new teacher'} joined as a ${kind}.`;
			}
			case 'staff_role_change':
				return `${p.full_name ?? 'A teacher'}'s role was updated${p.subject ? ` — now teaching ${p.subject}` : ''}.`;
			default:
				return 'Activity update.';
		}
	}

	function tagFor(kind: FeedKind): { label: string; class: string } {
		switch (kind) {
			case 'result_upload':
			case 'class_average':
				return { label: '📊 Results', class: 'tag--academic' };
			case 'media_change':
				return { label: '🖼️ Media', class: 'tag--social' };
			case 'staff_arrival':
			case 'staff_role_change':
				return { label: '👤 Staff', class: 'tag--notice' };
		}
	}

	function timeAgo(iso: string): string {
		const diffMs = Date.now() - new Date(iso).getTime();
		const mins = Math.floor(diffMs / 60000);
		if (mins < 60) return `${Math.max(mins, 0)}m ago`;
		const hours = Math.floor(mins / 60);
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	}

	onMount(async () => {
		try {
			// Reaction counts computed via a joined count rather than a
			// stored counter column on feed_posts -- feed_reactions is the
			// source of truth (0016), and per-row reactions need to stay
			// auditable for whenever reacting is actually wired up here
			// (see the note near the reaction display below). The *3
			// display inflation happens here, not in the DB, per 0016's
			// comment on feed_reactions -- the stored count stays the true
			// number.
			const { data, error } = await supabase
				.from('feed_posts')
				.select('id, kind, payload, created_at, feed_reactions(count)')
				.order('created_at', { ascending: false })
				.limit(50);

			if (error) throw error;

			posts = (data ?? []).map((row: any) => ({
				id: row.id,
				kind: row.kind,
				payload: row.payload ?? {},
				created_at: row.created_at,
				reaction_count: (row.feed_reactions?.[0]?.count ?? 0) * 3
			}));
		} catch (e) {
			loadError = e instanceof Error ? e.message : 'Could not load the feed';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Feed — Tendercare Comprehensive College</title>
</svelte:head>

<div class="feed-layout">
	<div class="feed__header">
		<a href="{base}/" class="back-link">← Home</a>
		<span class="feed__title">School Feed</span>
	</div>

	<div class="feed__body">
		{#if loading}
			<p class="feed__status">Loading…</p>
		{:else if loadError}
			<p class="feed__status feed__status--error">Couldn't load the feed right now. Try again shortly.</p>
		{:else if posts.length === 0}
			<p class="feed__status">No activity yet.</p>
		{:else}
			{#each posts as post (post.id)}
				{@const tag = tagFor(post.kind)}
				<div class="post-card">
					<span class="post-tag {tag.class}">{tag.label}</span>
					<p class="post-body">{describePost(post)}</p>
					<div class="post-actions">
						<span class="post-time">{timeAgo(post.created_at)}</span>
						<!--
							Reactions are read-only here for now: reacting requires
							a genuine per-student Supabase Auth session
							(feed_reactions' RLS policy checks
							auth.jwt() ->> 'student_id', see 0016 in
							tendercare-teacher), and tendercare-web has no student
							login of any kind yet -- there's no honest way to let a
							visitor react as a specific student without one. The
							count itself is real, live data; only the ability to
							add a reaction from this page is what's pending on
							that auth work.
						-->
						<span class="post-reaction-count" title="Reactions">❤️ {post.reaction_count}</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.feed-layout {
		max-width: 480px;
		margin: 0 auto;
		min-height: 100svh;
		background: #f5f2ec;
		padding-bottom: 40px;
	}
	.feed__header {
		background: rgba(245, 242, 236, 0.92);
		backdrop-filter: blur(12px);
		padding: var(--space-4) var(--space-5);
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		position: sticky;
		top: 0;
		z-index: var(--z-raised);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.back-link {
		font-size: var(--text-sm);
		color: var(--color-ink-soft);
		text-decoration: none;
	}
	.feed__title {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-ink);
	}
	.feed__body {
		padding-top: var(--space-2);
	}
	.feed__status {
		text-align: center;
		color: var(--color-ash-dark);
		font-size: var(--text-sm);
		padding: var(--space-6) var(--space-5);
	}
	.feed__status--error {
		color: var(--color-wine);
	}
	.post-card {
		background: white;
		border-radius: 20px;
		margin: var(--space-3) var(--space-4);
		padding: var(--space-5);
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
	}
	.post-tag {
		display: inline-block;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 2px 8px;
		border-radius: var(--radius-full);
		margin-bottom: var(--space-3);
	}
	.tag--academic {
		background: var(--color-purple-ghost);
		color: var(--color-purple);
	}
	.tag--social {
		background: #ffe8e8;
		color: var(--color-wine);
	}
	.tag--notice {
		background: #e8f8f0;
		color: #1a6640;
	}
	.post-body {
		font-size: var(--text-base);
		line-height: 1.55;
		color: var(--color-ink-soft);
	}
	.post-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--space-4);
		padding-top: var(--space-3);
		border-top: 1px solid #f0ece4;
	}
	.post-time {
		font-size: 11px;
		color: var(--color-ash-dark);
	}
	.post-reaction-count {
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-ash-dark);
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
