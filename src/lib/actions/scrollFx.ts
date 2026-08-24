/**
 * Ported from the original Testy repo's js/main.js.
 * Each piece of global DOM-querying behavior becomes a scoped Svelte action
 * so it attaches only to the element that opts in, instead of re-querying
 * the whole document on every page load.
 */

/** Adds `.is-visible` once an element scrolls into view. Mirrors `[data-animate]`. */
export function animateOnScroll(node: HTMLElement) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}

/** Counts up to a target number once visible. Mirrors `[data-count]`. */
export function countUp(node: HTMLElement, params: { target: number; suffix?: string }) {
	const { target, suffix = '' } = params;
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const duration = 1800;
				const start = performance.now();
				const step = (now: number) => {
					const progress = Math.min((now - start) / duration, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					node.textContent = Math.round(eased * target) + suffix;
					if (progress < 1) requestAnimationFrame(step);
				};
				requestAnimationFrame(step);
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.5 }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}

/** Translates an element on scroll at a given speed. Mirrors `.parallax[data-speed]`. */
export function parallax(node: HTMLElement, speed = 0.3) {
	const onScroll = () => {
		node.style.transform = `translateY(${window.scrollY * speed}px)`;
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
	return { destroy: () => window.removeEventListener('scroll', onScroll) };
}
