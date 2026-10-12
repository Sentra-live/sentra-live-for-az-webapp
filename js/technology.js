// Technology section (technology/*.html): tabbed explorers and diagram hotspots.
// Without JS every panel is visible in document order; the .tx-js class on <html>
// switches to one-panel-at-a-time.
(function () {
    document.documentElement.classList.add('tx-js');

    // One explorer = [data-tx-tabs]; its triggers carry data-tx-tab="id", its panels data-tx-panel="id".
    // Triggers can be buttons in a list or <g> hotspots inside an SVG.
    function initExplorer(root) {
        var triggers = root.querySelectorAll('[data-tx-tab]');
        var panels = root.querySelectorAll('[data-tx-panel]');
        if (!triggers.length || !panels.length) return;

        function select(id, focus) {
            triggers.forEach(function (t) {
                var on = t.getAttribute('data-tx-tab') === id;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
                t.setAttribute('tabindex', on ? '0' : '-1');
                if (on && focus) t.focus();
            });
            panels.forEach(function (p) {
                p.classList.toggle('is-active', p.getAttribute('data-tx-panel') === id);
            });
        }

        triggers.forEach(function (t, i) {
            t.addEventListener('click', function () { select(t.getAttribute('data-tx-tab')); });
            t.addEventListener('keydown', function (e) {
                var next = null;
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = triggers[(i + 1) % triggers.length];
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = triggers[(i - 1 + triggers.length) % triggers.length];
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(t.getAttribute('data-tx-tab')); }
                if (next) { e.preventDefault(); select(next.getAttribute('data-tx-tab'), true); }
            });
        });

        // Optional stepper: [data-tx-prev] / [data-tx-next] buttons, a [data-tx-count]
        // number and a [data-tx-progress] bar, all inside the same explorer.
        var prev = root.querySelector('[data-tx-prev]');
        var next = root.querySelector('[data-tx-next]');
        var count = root.querySelector('[data-tx-count]');
        var progress = root.querySelector('[data-tx-progress]');
        function current() {
            for (var k = 0; k < triggers.length; k++) if (triggers[k].classList.contains('is-active')) return k;
            return 0;
        }
        function step(by) {
            var k = (current() + by + triggers.length) % triggers.length;
            select(triggers[k].getAttribute('data-tx-tab'));
        }
        if (prev) prev.addEventListener('click', function () { step(-1); });
        if (next) next.addEventListener('click', function () { step(1); });
        if (count || progress) {
            var baseSelect = select;
            select = function (id, focus) {
                baseSelect(id, focus);
                var k = current();
                if (count) count.textContent = String(k + 1).padStart(2, '0');
                if (progress) progress.style.width = ((k + 1) / triggers.length * 100) + '%';
            };
        }

        var initial = root.querySelector('[data-tx-tab].is-active') || triggers[0];
        select(initial.getAttribute('data-tx-tab'));
    }

    // Replay the stroke-draw animation of a signal when its panel becomes visible.
    function replayWaves(root) {
        root.addEventListener('click', function (e) {
            if (!e.target.closest('[data-tx-tab]')) return;
            root.querySelectorAll('.tx-panel.is-active .tx-wave').forEach(function (w) {
                w.style.animation = 'none';
                void w.getBoundingClientRect();
                w.style.animation = '';
            });
        });
    }

    function start() {
        document.querySelectorAll('[data-tx-tabs]').forEach(function (root) {
            initExplorer(root);
            replayWaves(root);
        });
        // SMIL packets ignore CSS reduced-motion rules; pause them explicitly.
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('svg').forEach(function (s) {
                if (s.pauseAnimations) s.pauseAnimations();
            });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
