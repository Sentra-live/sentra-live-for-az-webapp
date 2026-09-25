// Solution pages: animations for the redesigned sections below the hero.
// Uses GSAP + ScrollTrigger (loaded in <head>). Everything is visible by default,
// so if GSAP fails to load or the visitor prefers reduced motion, the page still
// reads correctly; only the motion is skipped.
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- Interactions that don't need GSAP ---------- */

    // Cursor spotlight on parameter and benefit cards.
    function initSpotlight() {
        if (!finePointer) return;
        document.querySelectorAll('.solx-param, .solx-benefit').forEach(function (card) {
            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });
    }

    // Industry panels: the hovered or focused panel expands (desktop only; on
    // narrow screens CSS stacks them and shows every panel's text).
    function initIndustryPanels() {
        var panels = document.querySelectorAll('.solx-ind');
        if (!panels.length) return;
        function activate(panel) {
            panels.forEach(function (p) { p.classList.toggle('is-active', p === panel); });
        }
        panels.forEach(function (panel) {
            panel.addEventListener('mouseenter', function () { activate(panel); });
            panel.addEventListener('focus', function () { activate(panel); });
        });
    }

    function showStaticState() {
        document.querySelectorAll('.solx-flow-step, .solx-risk').forEach(function (el) {
            el.classList.add('is-on');
        });
    }

    initSpotlight();
    initIndustryPanels();

    if (reduceMotion) {
        showStaticState();
        return;
    }

    /* ---------- GSAP animations ---------- */

    function initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return false;
        gsap.registerPlugin(ScrollTrigger);

        // Section headers and single blocks: fade up as they enter.
        gsap.set('.solx-anim', { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch('.solx-anim', {
            start: 'top 88%',
            once: true,
            onEnter: function (batch) {
                gsap.fromTo(batch, { autoAlpha: 0, y: 32 }, {
                    autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true
                });
            }
        });

        // Card grids: staggered rise, row by row.
        [
            ['.solx-param', 0.07],
            ['.solx-benefit', 0.07],
            ['.solx-tile', 0.09],
            ['.solx-ind', 0.08]
        ].forEach(function (cfg) {
            if (!document.querySelector(cfg[0])) return;
            gsap.set(cfg[0], { autoAlpha: 0, y: 40 });
            ScrollTrigger.batch(cfg[0], {
                start: 'top 90%',
                once: true,
                onEnter: function (batch) {
                    gsap.to(batch, {
                        autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: cfg[1],
                        clearProps: 'transform'
                    });
                }
            });
        });

        // What We Do: slow parallax on the photo.
        var wwdImg = document.querySelector('.solx-wwd-media img');
        if (wwdImg) {
            gsap.fromTo(wwdImg, { yPercent: -8 }, {
                yPercent: 4, ease: 'none',
                scrollTrigger: { trigger: '.solx-wwd-media', start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }

        // Outcome counters.
        document.querySelectorAll('.solx-count').forEach(function (el) {
            var to = parseFloat(el.getAttribute('data-to'));
            var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            var state = { v: 0 };
            el.textContent = (0).toFixed(decimals);
            gsap.to(state, {
                v: to, duration: 2, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                onUpdate: function () { el.textContent = state.v.toFixed(decimals); }
            });
        });

        // System flow: the connector fills with scroll and lights up each layer
        // as it reaches it. Horizontal on desktop, vertical on mobile.
        var flow = document.querySelector('.solx-flow');
        if (flow) {
            var fill = flow.querySelector('.solx-flow-fill');
            var steps = flow.querySelectorAll('.solx-flow-step');
            var mm = gsap.matchMedia();
            mm.add({ wide: '(min-width: 992px)', narrow: '(max-width: 991px)' }, function (ctx) {
                var axis = ctx.conditions.wide ? 'scaleX' : 'scaleY';
                var from = {}; from[axis] = 0;
                var to = { ease: 'none' }; to[axis] = 1;
                to.scrollTrigger = {
                    trigger: flow,
                    start: ctx.conditions.wide ? 'top 75%' : 'top 70%',
                    end: ctx.conditions.wide ? 'bottom 55%' : 'bottom 60%',
                    scrub: 0.6,
                    onUpdate: function (self) {
                        steps.forEach(function (step, i) {
                            var threshold = steps.length > 1 ? i / (steps.length - 1) : 0;
                            step.classList.toggle('is-on', self.progress >= threshold - 0.02);
                        });
                    }
                };
                gsap.fromTo(fill, from, to);
            });
            gsap.from(steps, {
                autoAlpha: 0, y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.12,
                scrollTrigger: { trigger: flow, start: 'top 82%', once: true }
            });
        }

        // Alert tiers: bars grow left to right.
        var tierBars = document.querySelectorAll('.solx-tier-bar');
        if (tierBars.length) {
            gsap.from(tierBars, {
                scaleX: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
                scrollTrigger: { trigger: '.solx-tier-row', start: 'top 88%', once: true }
            });
        }

        // Risk list: each row slides in and marks its accent line.
        document.querySelectorAll('.solx-risk').forEach(function (row) {
            gsap.from(row, {
                autoAlpha: 0, x: 40, duration: 0.7, ease: 'power3.out',
                scrollTrigger: {
                    trigger: row, start: 'top 85%', once: true,
                    onEnter: function () { row.classList.add('is-on'); }
                }
            });
        });

        // CTA: background grid drifts, primary button follows the cursor slightly.
        var ctaGrid = document.querySelector('.solx-cta-grid-bg');
        if (ctaGrid) {
            gsap.fromTo(ctaGrid, { y: -30 }, {
                y: 30, ease: 'none',
                scrollTrigger: { trigger: '.solx-cta', start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }
        gsap.from('.solx-cta-panel', {
            autoAlpha: 0, y: 50, scale: 0.97, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.solx-cta', start: 'top 85%', once: true }
        });

        if (finePointer) {
            document.querySelectorAll('.solx-magnetic').forEach(function (btn) {
                var xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
                var yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
                btn.addEventListener('pointermove', function (e) {
                    var r = btn.getBoundingClientRect();
                    xTo((e.clientX - r.left - r.width / 2) * 0.18);
                    yTo((e.clientY - r.top - r.height / 2) * 0.3);
                });
                btn.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
            });
        }

        // Images load lazily and the sticky "How It Works" block changes layout,
        // so recalculate trigger positions once everything has settled.
        window.addEventListener('load', function () { ScrollTrigger.refresh(); });
        return true;
    }

    // GSAP scripts are in <head> without defer, so they are normally ready here.
    // If the CDN is slow, retry briefly and fall back to the static state.
    var tries = 0;
    (function start() {
        if (initAnimations()) return;
        if (++tries > 40) { showStaticState(); return; }
        setTimeout(start, 100);
    })();
})();
