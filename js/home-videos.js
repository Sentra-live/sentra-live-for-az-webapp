// Homepage video slider: manual scrolling (arrows, drag, swipe, keyboard) and
// click-to-play YouTube embeds. Only one video plays at a time; starting another
// puts the previous card back to its thumbnail. Nothing auto-scrolls.
(function () {
    'use strict';

    var slider = document.querySelector('.hv-slider');
    if (!slider) return;

    var track = slider.querySelector('.hv-track');
    var cards = Array.prototype.slice.call(track.querySelectorAll('.hv-card'));
    var prev = slider.querySelector('.hv-prev');
    var next = slider.querySelector('.hv-next');
    var bar = slider.querySelector('.hv-progress span');
    var current = slider.querySelector('.hv-count b');
    var playing = null;

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function step() {
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function update() {
        var max = track.scrollWidth - track.clientWidth;
        var pos = track.scrollLeft;
        prev.disabled = pos <= 2;
        next.disabled = pos >= max - 2;
        var visible = Math.max(1, Math.round(track.clientWidth / step()));
        var index = Math.min(cards.length, Math.round(pos / step()) + visible);
        if (pos >= max - 2) index = cards.length;
        current.textContent = pad(index);
        bar.style.width = (index / cards.length * 100) + '%';
    }

    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Mouse drag to scroll (touch and trackpads already scroll natively).
    var dragging = false, moved = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        if (e.target.closest('iframe')) return;
        dragging = true;
        moved = false;
        startX = e.clientX;
        startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) {
            moved = true;
            track.classList.add('is-dragging');
        }
        if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
        if (!dragging) return;
        dragging = false;
        if (moved) {
            track.classList.remove('is-dragging');
            // Settle on the nearest card once the drag ends.
            var target = Math.round(track.scrollLeft / step()) * step();
            track.scrollTo({ left: target, behavior: 'smooth' });
        }
    });
    // A drag should not count as a click on the card underneath.
    track.addEventListener('click', function (e) {
        if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
        }
    }, true);

    // Click-to-play.
    function stop(card) {
        var media = card.querySelector('.hv-media');
        var iframe = media.querySelector('iframe');
        if (iframe) iframe.remove();
        media.querySelector('.hv-play').hidden = false;
        card.classList.remove('is-playing');
    }

    cards.forEach(function (card) {
        var btn = card.querySelector('.hv-play');
        btn.addEventListener('click', function () {
            if (playing && playing !== card) stop(playing);
            var id = card.getAttribute('data-video');
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
            iframe.title = card.querySelector('h3').textContent;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;
            btn.hidden = true;
            card.querySelector('.hv-media').appendChild(iframe);
            card.classList.add('is-playing');
            playing = card;
            iframe.focus();
        });
    });

    update();
})();
