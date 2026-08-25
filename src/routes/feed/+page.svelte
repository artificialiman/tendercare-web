<script lang="ts">
	// @ts-nocheck -- this block is the original page's vanilla JS data layer,
	// ported verbatim for behavioral fidelity (see comment below). It was
	// untyped in the source and stays that way rather than retrofitting
	// strict-mode null checks onto logic that isn't being rewritten.
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	// This page is a standalone mobile-app-style mockup (no shared Nav/Footer —
	// it has its own "← Home" link and a fixed max-width phone-frame layout,
	// same as the original feed.html).
	//
	// Ported verbatim from the original page's <script> block. The original
	// author had already sketched a Supabase upgrade path in comments there
	// (table schema + RLS policies for tcc_comments/tcc_likes/tcc_feed_posts) —
	// see /supabase/migrations in tendercare-teacher once that repo exists.
	// This still runs on localStorage until that's wired up; kept as onMount
	// (not SSR'd) since it touches document/localStorage directly, and the
	// handler functions are exposed on window because the markup below calls
	// them via inline onclick="..." (e.g. onclick="toggleLike(this,'sports-1')"),
	// same fidelity-preserving approach used for the sports page's video modal.
	onMount(() => {
		/* ── DEMO BLOCK (localStorage) ───────────────────────────── */
		const STORE = {
		  get:    (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } },
		  set:    (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
		  getOne: (k,fb) => { try { return localStorage.getItem(k) || fb; } catch { return fb; } },
		  setOne: (k,v) => { try { localStorage.setItem(k,v); } catch {} }
		};
		async function loadComments(postId) { return STORE.get('tcc_c_'+postId); }
		async function saveComment(postId, author, body) {
		  const list = STORE.get('tcc_c_'+postId);
		  const c = { id: Date.now(), author, body, created_at: new Date().toISOString() };
		  list.push(c); STORE.set('tcc_c_'+postId, list); return c;
		}
		async function loadUserPosts() { return STORE.get('tcc_posts'); }
		async function saveUserPost(author, body) {
		  const list = STORE.get('tcc_posts');
		  const p = { id:'u'+Date.now(), author, body, created_at: new Date().toISOString() };
		  list.unshift(p); STORE.set('tcc_posts', list); return p;
		}
		/* ── END DEMO BLOCK ──────────────────────────────────────── */

		/* ── SHARED UI ───────────────────────────────────────────── */
		let currentUser = STORE.getOne('tcc_username','');
		const userToken = STORE.getOne('tcc_token','') || (() => {
		  const t = 'u'+Math.random().toString(36).slice(2);
		  STORE.setOne('tcc_token',t); return t;
		})();

		function updateUserUI() {
		  const lbl = document.getElementById('feedUserLabel');
		  const av  = document.getElementById('composeAvatar');
		  if (currentUser) {
		    lbl.textContent = 'Signed in as ' + currentUser;
		    av.textContent  = currentUser.slice(0,2).toUpperCase();
		    av.style.background = 'var(--color-purple)';
		  }
		}

		function promptName() {
		  document.getElementById('nameModal').classList.add('open');
		  setTimeout(() => document.getElementById('nameInput').focus(), 300);
		}
		function saveName() {
		  const v = document.getElementById('nameInput').value.trim();
		  if (!v) return;
		  currentUser = v;
		  STORE.setOne('tcc_username', v);
		  document.getElementById('nameModal').classList.remove('open');
		  updateUserUI();
		}
		document.getElementById('nameInput').addEventListener('keydown', e => { if(e.key==='Enter') saveName(); });
		document.getElementById('nameModal').addEventListener('click', e => {
		  if (e.target === document.getElementById('nameModal'))
		    document.getElementById('nameModal').classList.remove('open');
		});

		function toggleLike(el, postId) {
		  const k = 'tcc_lk_'+postId;
		  const c = el.querySelector('.like-count');
		  if (STORE.getOne(k,'')) {
		    el.classList.remove('liked'); c.textContent = parseInt(c.textContent)-1; STORE.setOne(k,'');
		  } else {
		    el.classList.add('liked'); c.textContent = parseInt(c.textContent)+1; STORE.setOne(k,'1');
		  }
		}

		function restoreLikes() {
		  document.querySelectorAll('[data-post-id]').forEach(card => {
		    const pid = card.dataset.postId;
		    if (STORE.getOne('tcc_lk_'+pid,'')) card.querySelector('.post-action')?.classList.add('liked');
		  });
		}

		function timeAgo(iso) {
		  const m = Math.floor((Date.now()-new Date(iso))/60000);
		  if (m<1) return 'Just now'; if (m<60) return m+'m ago';
		  const h = Math.floor(m/60); if (h<24) return h+'h ago';
		  return Math.floor(h/24)+'d ago';
		}
		function avatarColor(name) {
		  const c=['var(--color-purple)','var(--color-wine)','#20A060','#1A6640','#8A5C00','var(--color-purple-mid)'];
		  let h=0; for(let i=0;i<name.length;i++) h=name.charCodeAt(i)+((h<<5)-h);
		  return c[Math.abs(h)%c.length];
		}
		function renderComment(c) {
		  return `<div class="comment-item">
		    <div class="comment-avatar" style="background:${avatarColor(c.author)}">${c.author.slice(0,2).toUpperCase()}</div>
		    <div class="comment-bubble">
		      <div class="comment-name">${c.author}</div>
		      <div class="comment-text">${c.body}</div>
		      <div class="comment-time">${timeAgo(c.created_at)}</div>
		    </div>
		  </div>`;
		}

		async function toggleComments(postId) {
		  const thread = document.getElementById('comments-'+postId);
		  if (thread.classList.contains('open')) { thread.classList.remove('open'); return; }
		  thread.classList.add('open');
		  const comments = await loadComments(postId);
		  thread.innerHTML = comments.map(renderComment).join('') + `
		    <div class="comment-compose">
		      <input class="comment-input" id="ci-${postId}" type="text"
		        placeholder="${currentUser ? 'Add a comment…' : 'Set your name first'}"
		        ${!currentUser ? 'onfocus="promptName()" readonly' : ''} />
		      <div class="comment-send" onclick="submitComment('${postId}')">
		        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
		      </div>
		    </div>`;
		  document.getElementById('ci-'+postId)?.addEventListener('keydown', e => { if(e.key==='Enter') submitComment(postId); });
		  updateReplyCount(postId, comments.length);
		}

		function updateReplyCount(postId, n) {
		  const el = document.querySelector(`[data-post-id="${postId}"] .reply-count`);
		  if (el) el.textContent = n > 0 ? n : '';
		}

		async function submitComment(postId) {
		  if (!currentUser) { promptName(); return; }
		  const input = document.getElementById('ci-'+postId);
		  const body = input.value.trim(); if (!body) return;
		  input.value = '';
		  const c = await saveComment(postId, currentUser, body);
		  const thread = document.getElementById('comments-'+postId);
		  const compose = thread.querySelector('.comment-compose');
		  const el = document.createElement('div');
		  el.innerHTML = renderComment(c);
		  thread.insertBefore(el.firstElementChild, compose);
		  const all = await loadComments(postId);
		  updateReplyCount(postId, all.length);
		}

		async function submitPost() {
		  if (!currentUser) { promptName(); return; }
		  const input = document.getElementById('composeInput');
		  const body = input.value.trim(); if (!body) return;
		  input.value = '';
		  const post = await saveUserPost(currentUser, body);
		  renderUserPost(post, true);
		}
		document.getElementById('composeInput').addEventListener('keydown', e => { if(e.key==='Enter') submitPost(); });

		function renderUserPost(post, prepend=false) {
		  const el = document.createElement('div');
		  el.className = 'post-card post-card--user';
		  el.dataset.postId = post.id;
		  el.innerHTML = `
		    <div class="post-header">
		      <div class="post-avatar" style="background:${avatarColor(post.author)}">${post.author.slice(0,2).toUpperCase()}</div>
		      <div><div class="post-name">${post.author}</div><div class="post-time">${timeAgo(post.created_at)}</div></div>
		    </div>
		    <p class="post-body">${post.body}</p>
		    <div class="post-actions">
		      <span class="post-action" onclick="toggleLike(this,'${post.id}')">❤️ <span class="like-count">0</span></span>
		      <span class="post-action" onclick="toggleComments('${post.id}')">💬 <span class="reply-count"></span> Reply</span>
		    </div>
		    <div class="comments-thread" id="comments-${post.id}"></div>`;
		  const container = document.getElementById('userPosts');
		  if (prepend) container.prepend(el); else container.appendChild(el);
		}

		async function init() {
		  if (!currentUser) setTimeout(promptName, 1400);
		  updateUserUI();
		  restoreLikes();
		  const posts = await loadUserPosts();
		  posts.forEach(p => renderUserPost(p));
		}
		init();

		(window as any).promptName = promptName;
		(window as any).saveName = saveName;
		(window as any).submitComment = submitComment;
		(window as any).submitPost = submitPost;
		(window as any).toggleComments = toggleComments;
		(window as any).toggleLike = toggleLike;
	});</script>

<svelte:head>
	<title>Student Feed — Tendercare Comprehensive College</title>
</svelte:head>

<!-- Name prompt modal -->
<div class="name-modal" id="nameModal">
  <div class="name-modal__box">
    <p style="font-family:var(--font-sans);font-size:var(--text-base);font-weight:600;margin-bottom:var(--space-2);">What's your name?</p>
    <p style="font-size:var(--text-sm);color:var(--color-ash-dark);margin-bottom:var(--space-5);">Used for your posts and comments. Stored on this device only.</p>
    <input style="width:100%;background:#f5f2ec;border:1px solid var(--color-cream-deep);border-radius:var(--radius-full);padding:var(--space-3) var(--space-5);font-family:var(--font-sans);font-size:var(--text-base);outline:none;margin-bottom:var(--space-4);" id="nameInput" type="text" placeholder="e.g. Temi Adeyemi · SS3" maxlength="40" />
    <button class="btn btn--primary" style="width:100%;justify-content:center;" onclick={(e) => (window as any).saveName()}>Continue</button>
  </div>
</div>

<div class="feed-layout">
  <div class="feed__header">
    <div>
      <div style="font-family:var(--font-sans);font-size:var(--text-lg);font-weight:700;color:var(--color-ink);">TCC Feed</div>
      <div style="font-size:11px;color:var(--color-ash-dark);margin-top:1px;" id="feedUserLabel">Tendercare Comprehensive College</div>
    </div>
    <div style="display:flex;align-items:center;gap:var(--space-3);">
      <a href="{base}/" style="font-family:var(--font-sans);font-size:var(--text-xs);color:var(--color-purple);font-weight:500;">← Home</a>
      <div style="width:8px;height:8px;border-radius:50%;background:var(--color-lemon);animation:pulse 2s ease-in-out infinite;"></div>
    </div>
  </div>

  <div class="tomorrow-banner">
    <div class="tomorrow-pulse"></div>
    <div>
      <div style="font-size:var(--text-sm);font-weight:700;color:var(--color-ink);">Tomorrow's Schedule</div>
      <div style="font-size:11px;color:rgba(26,16,32,0.6);margin-top:1px;">Assembly 7:45am · Period 1: 8:10am · Break: 10:30am</div>
    </div>
  </div>

  <div id="feedPosts">
    <div class="post-card post-card--pinned" data-post-id="pinned-1">
      <div class="post-header">
        <div class="post-avatar" style="background:var(--color-purple);">VP</div>
        <div><div class="post-name">Vice Principal's Office <span class="post-role">Admin</span></div><div class="post-time">Pinned · Today</div></div>
      </div>
      <span class="post-tag tag--notice">📌 Notice</span>
      <p class="post-body">All SS3 students are to submit their clearance forms by end of day tomorrow. Collection is at the Admin office from 8am. No late submissions.</p>
      <div class="post-actions">
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleLike(e.currentTarget,'pinned-1'); }} onclick={(e) => (window as any).toggleLike(e.currentTarget,'pinned-1')}>❤️ <span class="like-count">14</span></span>
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleComments('pinned-1'); }} onclick={(e) => (window as any).toggleComments('pinned-1')}>💬 <span class="reply-count"></span> Reply</span>
      </div>
      <div class="comments-thread" id="comments-pinned-1"></div>
    </div>

    <div class="post-card" data-post-id="sports-1">
      <div class="post-header">
        <div class="post-avatar" style="background:var(--color-lemon);color:var(--color-ink);">SC</div>
        <div><div class="post-name">Sports Coordinator</div><div class="post-time">2 hours ago</div></div>
      </div>
      <span class="post-tag tag--sports">🏆 Sports</span>
      <p class="post-body">The 3rd Interhouse is now officially in the record books. Full results and photo gallery are live on the Sports page. Well done every house. 🎉</p>
      <div class="post-actions">
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleLike(e.currentTarget,'sports-1'); }} onclick={(e) => (window as any).toggleLike(e.currentTarget,'sports-1')}>❤️ <span class="like-count">47</span></span>
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleComments('sports-1'); }} onclick={(e) => (window as any).toggleComments('sports-1')}>💬 <span class="reply-count"></span> Reply</span>
      </div>
      <div class="comments-thread" id="comments-sports-1"></div>
    </div>

    <div class="post-card" data-post-id="student-1">
      <div class="post-header">
        <div class="post-avatar" style="background:var(--color-wine);">T</div>
        <div><div class="post-name">Temi Adeyemi <span class="post-role">SS3</span></div><div class="post-time">4 hours ago</div></div>
      </div>
      <span class="post-tag tag--social">💬 Social</span>
      <p class="post-body">The relay race today 😭😭 I cannot believe we came from behind like that. Greatest day in TCC history??</p>
      <div class="post-actions">
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleLike(e.currentTarget,'student-1'); }} onclick={(e) => (window as any).toggleLike(e.currentTarget,'student-1')}>❤️ <span class="like-count">33</span></span>
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleComments('student-1'); }} onclick={(e) => (window as any).toggleComments('student-1')}>💬 <span class="reply-count"></span> Reply</span>
      </div>
      <div class="comments-thread" id="comments-student-1"></div>
    </div>

    <div class="post-card post-card--announcement" data-post-id="maths-1">
      <div class="post-header">
        <div class="post-avatar" style="background:var(--color-purple);">MA</div>
        <div><div class="post-name">Mathematics Department</div><div class="post-time">Yesterday</div></div>
      </div>
      <span class="post-tag tag--academic">📐 Academic</span>
      <p class="post-body">Mathematics Olympiad team selections begin next Monday. Any JSS3–SS2 student with interest is encouraged to register at the Maths office.</p>
      <div class="post-actions">
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleLike(e.currentTarget,'maths-1'); }} onclick={(e) => (window as any).toggleLike(e.currentTarget,'maths-1')}>❤️ <span class="like-count">21</span></span>
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleComments('maths-1'); }} onclick={(e) => (window as any).toggleComments('maths-1')}>💬 <span class="reply-count"></span> Reply</span>
      </div>
      <div class="comments-thread" id="comments-maths-1"></div>
    </div>

    <div class="post-card" data-post-id="student-2">
      <div class="post-header">
        <div class="post-avatar" style="background:#20A060;">K</div>
        <div><div class="post-name">Kemi Okafor <span class="post-role">SS2</span></div><div class="post-time">Yesterday</div></div>
      </div>
      <p class="post-body">Can the food tomorrow please not be rice again 🙏🙏 Asking for everyone in Block B.</p>
      <div class="post-actions">
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleLike(e.currentTarget,'student-2'); }} onclick={(e) => (window as any).toggleLike(e.currentTarget,'student-2')}>❤️ <span class="like-count">62</span></span>
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleComments('student-2'); }} onclick={(e) => (window as any).toggleComments('student-2')}>💬 <span class="reply-count"></span> Reply</span>
      </div>
      <div class="comments-thread" id="comments-student-2"></div>
    </div>

    <div class="post-card post-card--announcement" data-post-id="mgmt-1">
      <div class="post-header">
        <div class="post-avatar" style="background:var(--color-ink);">TCC</div>
        <div><div class="post-name">School Management <span class="post-role">Official</span></div><div class="post-time">2 days ago</div></div>
      </div>
      <span class="post-tag tag--notice">📣 Notice</span>
      <p class="post-body">Following the incredible success of the 3rd Interhouse Sports, the school leadership wishes to formally commend every student, teacher, and parent. Tendercare continues to rise.</p>
      <div class="post-actions">
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleLike(e.currentTarget,'mgmt-1'); }} onclick={(e) => (window as any).toggleLike(e.currentTarget,'mgmt-1')}>❤️ <span class="like-count">89</span></span>
        <span class="post-action" role="button" tabindex="0" onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).toggleComments('mgmt-1'); }} onclick={(e) => (window as any).toggleComments('mgmt-1')}>💬 <span class="reply-count"></span> Reply</span>
      </div>
      <div class="comments-thread" id="comments-mgmt-1"></div>
    </div>

    <div id="userPosts"></div>
  </div>
</div>

<!-- Compose bar -->
<div class="compose-bar">
  <div class="post-avatar" id="composeAvatar" role="button" tabindex="0" style="background:var(--color-ash);width:34px;height:34px;font-size:11px;cursor:pointer;" onclick={(e) => (window as any).promptName()} onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") (window as any).promptName(); }} title="Tap to set your name">?</div>
  <input class="compose-input" id="composeInput" type="text" placeholder="What's on your mind?" />
  <button class="compose-btn" aria-label="Send post" onclick={(e) => (window as any).submitPost()}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  </button>
</div>


<style>
    .feed-layout { max-width:480px;margin:0 auto;min-height:100svh;background:#F5F2EC;padding-bottom:90px; }
    .feed__header { background:rgba(245,242,236,0.92);backdrop-filter:blur(12px);padding:var(--space-4) var(--space-5);border-bottom:1px solid rgba(0,0,0,0.06);position:sticky;top:0;z-index:var(--z-raised);display:flex;align-items:center;justify-content:space-between; }
    .tomorrow-banner { background:var(--color-lemon);padding:var(--space-3) var(--space-5);display:flex;align-items:center;gap:var(--space-3);margin:var(--space-3) var(--space-4);border-radius:var(--radius-xl); }
    .tomorrow-pulse { width:8px;height:8px;border-radius:50%;background:var(--color-ink);animation:pulse 2s ease-in-out infinite;flex-shrink:0; }
    .post-card { background:white;border-radius:20px;margin:var(--space-3) var(--space-4);padding:var(--space-5);box-shadow:0 1px 8px rgba(0,0,0,0.06); }
    .post-card--pinned { border:2px solid var(--color-lemon);background:#FDFAE8; }
    .post-card--announcement { border-left:4px solid var(--color-purple); }
    :global(.post-card--user) { background:var(--color-purple-ghost);border:1px solid var(--color-purple-light);animation:slideInFromBottom 0.35s var(--ease-out) both; }
    .post-header { display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3); }
    .post-avatar { width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white; }
    .post-name { font-size:var(--text-sm);font-weight:600;color:var(--color-ink);display:flex;align-items:center;gap:var(--space-2);flex-wrap:wrap; }
    .post-role { font-size:var(--text-xs);background:var(--color-purple-ghost);color:var(--color-purple);padding:2px 8px;border-radius:var(--radius-full);font-weight:500; }
    .post-time { font-size:11px;color:var(--color-ash-dark);margin-top:2px; }
    .post-body { font-size:var(--text-base);line-height:1.55;color:var(--color-ink-soft); }
    .post-actions { display:flex;gap:var(--space-2);margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid #f0ece4;flex-wrap:wrap; }
    .post-action { font-size:var(--text-xs);font-weight:500;color:var(--color-ash-dark);display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 10px;border-radius:var(--radius-full);transition:background 0.15s,color 0.15s;user-select:none;border:1px solid transparent; }
    .post-action:hover { background:var(--color-purple-ghost);color:var(--color-purple); }
    :global(.post-action.liked) { background:#fff0f0;color:#c0392b;border-color:#fad4d4; }
    .post-tag { display:inline-block;font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;padding:2px 8px;border-radius:var(--radius-full);margin-bottom:var(--space-3); }
    .tag--sports { background:#FFF3C4;color:#8A5C00; }
    .tag--academic { background:var(--color-purple-ghost);color:var(--color-purple); }
    .tag--social { background:#FFE8E8;color:var(--color-wine); }
    .tag--notice { background:#E8F8F0;color:#1A6640; }

    /* Comments */
    .comments-thread { margin-top:var(--space-3);padding-top:var(--space-3);border-top:1px solid #f0ece4;display:none; }
    :global(.comments-thread.open) { display:block; }
    :global(.comment-item) { display:flex;gap:var(--space-3);margin-bottom:var(--space-3);animation:fadeUp 0.3s var(--ease-out) both; }
    :global(.comment-avatar) { width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;background:var(--color-purple-mid); }
    :global(.comment-bubble) { background:#f5f2ec;border-radius:0 12px 12px 12px;padding:var(--space-2) var(--space-3);flex:1; }
    :global(.comment-name) { font-size:11px;font-weight:600;color:var(--color-ink);margin-bottom:2px; }
    :global(.comment-text) { font-size:var(--text-sm);color:var(--color-ink-soft);line-height:1.45; }
    :global(.comment-time) { font-size:10px;color:var(--color-ash-dark);margin-top:3px; }
    :global(.comment-compose) { display:flex;gap:var(--space-2);margin-top:var(--space-3);align-items:center; }
    :global(.comment-input) { flex:1;background:#f0ece4;border:none;border-radius:var(--radius-full);padding:8px 14px;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink);outline:none; }
    :global(.comment-input:focus) { background:var(--color-purple-ghost);box-shadow:0 0 0 2px var(--color-purple-light); }
    :global(.comment-send) { width:32px;height:32px;border-radius:50%;background:var(--color-purple);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background 0.15s,transform 0.1s; }
    :global(.comment-send:hover) { background:var(--color-purple-deep);transform:scale(1.05); }

    /* Name modal */
    .name-modal { position:fixed;inset:0;background:rgba(26,16,32,0.5);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:flex-end;justify-content:center;padding:var(--space-4);opacity:0;pointer-events:none;transition:opacity 0.2s; }
    :global(.name-modal.open) { opacity:1;pointer-events:all; }
    .name-modal__box { background:white;border-radius:20px;padding:var(--space-6);width:100%;max-width:480px;transform:translateY(20px);transition:transform 0.3s var(--ease-out); }
    :global(.name-modal.open .name-modal__box) { transform:translateY(0); }

    /* Compose bar */
    .compose-bar { position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;background:rgba(245,242,236,0.95);backdrop-filter:blur(12px);border-top:1px solid rgba(0,0,0,0.07);padding:var(--space-3) var(--space-4);display:flex;align-items:center;gap:var(--space-3);z-index:40; }
    .compose-input { flex:1;background:#EDE9E0;border:none;border-radius:var(--radius-full);padding:10px 16px;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--color-ink);outline:none; }
    .compose-input:focus { background:var(--color-purple-ghost);box-shadow:0 0 0 2px var(--color-purple-light); }
    .compose-btn { width:38px;height:38px;border-radius:50%;background:var(--color-purple);color:white;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s,transform 0.1s;cursor:pointer; }
    .compose-btn:hover { background:var(--color-purple-deep);transform:scale(1.05); }
</style>
