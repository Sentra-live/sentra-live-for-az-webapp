$(function () {

    var swiperPartner = new Swiper('.swiper.swiperPartner', {
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        slidesPerView: 6,
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        grabCursor: true,
        breakpoints: {
            1025: {
                slidesPerView: 6
            },
            767: {
                slidesPerView: 4
            },
            230: {
                slidesPerView: 3
            }
        },
    });

});


$(function () {
    var swiperTestimonial = new Swiper('.swiper.swiperTestimonial', {
        autoplay: {
            delay: 5000,
        },
        speed: 2000,
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        hasNavigation: true,
        grabCursor: true,
        breakpoints: {
            1025: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            769: {
                slidesPerView: 2
            },
            319: {
                slidesPerView: 1,
            },
        },
    });
});


$(function () {
    /**
     * Cap visible pagination bullets to a small window centered on the active
     * slide instead of rendering one dot per slide (can run to 20+ on the
     * products carousel). Navigation arrows remain the primary way to page
     * through slides beyond the visible window.
     *
     * Swiper's own renderBullet/event hooks proved unreliable for this
     * carousel's combination of loop + breakpoints + observer, so this reacts
     * to the actual DOM instead: a MutationObserver watches for Swiper moving
     * its "active" class between bullets (the bullet elements themselves are
     * long-lived, not recreated per transition) and re-applies the window
     * whenever that happens, regardless of which internal path caused it.
     */
    var MAX_VISIBLE_DOTS = 5;
    function watchPaginationDots(paginationEl) {
        if (!paginationEl) return;

        function apply() {
            var bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
            var total = bullets.length;
            if (!total) return;

            if (total <= MAX_VISIBLE_DOTS) {
                bullets.forEach(function (b) { b.classList.remove('dot-hidden'); });
                return;
            }

            var active = 0;
            bullets.forEach(function (b, i) {
                if (b.classList.contains('swiper-pagination-bullet-active')) active = i;
            });

            var half = Math.floor(MAX_VISIBLE_DOTS / 2);
            var start = Math.min(Math.max(active - half, 0), total - MAX_VISIBLE_DOTS);
            bullets.forEach(function (b, i) {
                b.classList.toggle('dot-hidden', i < start || i >= start + MAX_VISIBLE_DOTS);
            });
        }

        apply();
        var observer = new MutationObserver(apply);
        observer.observe(paginationEl, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true,
            childList: true,
        });
        return observer;
    }

    /**
     * Store original Swiper config to allow re-initialization on filter change.
     */
    function getSwiperConfig($container) {
        return {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 800,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 10,
            grabCursor: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
            },
            navigation: {
                nextEl: $container.find('.swiperProducts-btn-next')[0],
                prevEl: $container.find('.swiperProducts-btn-prev')[0],
            },
            pagination: {
                el: $container.find('.swiperProducts-pagination')[0],
                clickable: true,
                dynamicBullets: false,
            },
        };
    }

    /**
     * Initialize a Swiper instance inside $container.
     */
    function initSwiper($container) {
        var el = $container.find('.swiper.swiperProducts')[0];
        if (!el) return null;
        var config = getSwiperConfig($container);
        // Disable loop when there aren't enough slides for clean cloning (need >= slidesPerView * 2)
        var slideCount = $container.find('.swiper-wrapper .swiper-slide').length;
        if (slideCount < 6) {
            config.loop = false;
        }
        var swiper = new Swiper(el, config);
        watchPaginationDots(config.pagination.el);
        return swiper;
    }

    /**
     * Parse the original slide HTML from the first initialisation to have
     * a clean reference for filtering.
     */
    var originalSlidesHTML = [];
    var $firstContainer = $('.swiperProducts-layout').first();
    $firstContainer.find('.swiper.swiperProducts .swiper-slide').each(function () {
        originalSlidesHTML.push(this.outerHTML);
    });

    // Initialise all Swiper instances on the page
    var swiperInstances = [];
    $('.swiperProducts-layout').each(function () {
        var $container = $(this);
        var swiper = initSwiper($container);
        if (swiper) {
            swiperInstances.push({ container: $container, swiper: swiper });
        }
    });

    // ---- Product filter ----
    var $filterBar = $('.product-filter-bar');
    if ($filterBar.length && swiperInstances.length) {
        $filterBar.on('click', '.product-filter-btn', function () {
            var $btn = $(this);
            if ($btn.hasClass('active')) return;

            // Update active button
            $filterBar.find('.product-filter-btn').removeClass('active');
            $btn.addClass('active');

            var filter = $btn.data('filter');

            // Determine which original slides match the filter
            var matchingHTML = [];
            originalSlidesHTML.forEach(function (html) {
                // Parse the slide to read data-category
                var temp = document.createElement('div');
                temp.innerHTML = html;
                var slideEl = temp.firstElementChild;
                var category = slideEl.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    matchingHTML.push(html);
                }
            });

            // Guard: if no slides match, do nothing
            if (!matchingHTML.length) return;

            // Rebuild each Swiper instance with matching slides
            swiperInstances.forEach(function (item) {
                var $container = item.container;
                var oldSwiper = item.swiper;

                // Destroy old Swiper
                if (oldSwiper && oldSwiper.destroy) {
                    oldSwiper.destroy(true, true);
                }

                // Clear the wrapper and re-add matching slides
                var $wrapper = $container.find('.swiper-wrapper');
                $wrapper.empty();
                matchingHTML.forEach(function (html) {
                    $wrapper.append(html);
                });

                // Re-initialize Swiper
                var newSwiper = initSwiper($container);
                item.swiper = newSwiper;

                // Restart autoplay
                if (newSwiper && newSwiper.autoplay) {
                    newSwiper.autoplay.stop();
                    setTimeout(function () {
                        if (newSwiper && newSwiper.autoplay) {
                            newSwiper.autoplay.start();
                        }
                    }, 100);
                }
            });
        });
    }
});
