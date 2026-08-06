// Homepage-only GSAP animations. Loaded after GSAP + ScrollTrigger CDN scripts.
// Degrades silently if GSAP fails to load (e.g. offline) so the page never breaks.
(function () {
    if (typeof gsap === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance (headline, subheading, pills, CTAs, reviewer, video card) is
    // now a CSS-only @keyframes animation (see index.html <head>) so it doesn't
    // depend on GSAP/ScrollTrigger loading before the LCP heading becomes visible.

    function initSolutionCardsReveal() {
        var cards = gsap.utils.toArray(".card-solution-col");
        if (!cards.length) return;

        gsap.set(cards, { opacity: 0, y: 40 });

        ScrollTrigger.batch(cards, {
            start: "top 88%",
            onEnter: function (batch) {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.12,
                });
            },
            once: true,
        });
    }

    function initSolutionCardTilt() {
        var cards = gsap.utils.toArray(".card-solution");
        cards.forEach(function (card) {
            card.addEventListener("mouseenter", function () {
                gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
            });
            card.addEventListener("mouseleave", function () {
                gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Solution cards live further down the static markup, but ScrollTrigger
        // needs layout to settle first.
        ScrollTrigger.refresh();
        initSolutionCardsReveal();
        initSolutionCardTilt();
    });
})();
