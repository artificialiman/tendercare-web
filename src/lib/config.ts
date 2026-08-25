/**
 * URLs for the other apps in the Tendercare Svelte migration.
 *
 * tendercare-web doesn't have its own result/transcript data — that lives in
 * tendercare-portal, a separately-deployed app. Every link from this app to
 * results/student-portal/teacher-dashboard goes through this file so there's
 * one place to update once those apps have real deploy URLs, instead of
 * hardcoded hrefs scattered across every page.
 *
 * TODO: replace with the real deployed URL once tendercare-portal exists.
 * Until then this points at a relative path that will 404 — intentionally
 * visible rather than silently broken.
 */
export const PORTAL_URL = 'https://TODO-tendercare-portal-not-deployed-yet.example';
export const TEACHER_URL = 'https://TODO-tendercare-teacher-not-deployed-yet.example';
