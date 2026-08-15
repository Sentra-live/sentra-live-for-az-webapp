// Dynamically determine correct path prefix based on current location
const _pathLower = window.location.pathname.toLowerCase();
const pathPrefix = (_pathLower.includes('/solutions/') || _pathLower.includes('/products/') || _pathLower.includes('/case-studies/') || _pathLower.includes('/article/') || _pathLower.includes('/blogs/') || _pathLower.includes('/industries/')) ? '../' : './';

function finishNavInit() {
    // Deferred off the initial paint/LCP path: the YouTube IFrame API is a
    // slow external fetch, and initializing it late avoids competing with
    // hero text render and avoids a layout jump if it were sized eagerly.
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initBannerVideo, { timeout: 2000 });
    } else {
        setTimeout(initBannerVideo, 200);
    }
    initNavLink();
    initSidebar();
    initEditSidebar();
    initCounter();
    initThemeSwitch();
    initScrollHeader();
    initSearchBar();
    initSubmitContact();
    initSubmitNewsletter();
    initAnimateData();
    initLoadMoreStories();
    // Initialize dropdown handler after header is loaded
    if (typeof initDropdownHandler === 'function') {
        initDropdownHandler();
    }

    // Hide preloader after everything is loaded
    if (typeof window._hidePreloader === 'function') {
        // Small delay for layout settling
        setTimeout(window._hidePreloader, 500);
    }
}

var $headerEl = $("#header");
if ($headerEl.length && $headerEl.children().length) {
    // header/footer/sidebar are baked directly into the page HTML at deploy
    // time (see scripts/inline-partials.mjs) so crawlers see real <a> markup
    // instead of empty placeholder divs. Their own <script src> tags are
    // already real HTML at this point and loaded natively - just wire up
    // the interactive behavior.
    fixNavLinks();
    finishNavInit();
} else {
    // Fallback for pages that still ship the old empty placeholders (e.g.
    // local dev without running the inline-partials build step).
    Promise.all([
        fetch(pathPrefix + "header.html").then(res => res.text()),
        fetch(pathPrefix + "footer.html").then(res => res.text()),
        fetch(pathPrefix + "sidebar.html").then(res => res.text())
    ])
        .then(([headerHTML, footerHTML, sidebarHTML]) => {
            // Strip external <script src> tags from the partials BEFORE jQuery .html()
            // injects them: jQuery would otherwise re-execute them via _evalUrl, which
            // hardcodes `async: false` (synchronous XMLHttpRequest on the main thread -
            // a Chrome deprecation). The extracted scripts are loaded normally (async)
            // after injection instead. Inline scripts are left in place - jQuery runs
            // those without any XHR.
            var partialScripts = [];
            var stripScripts = function (html) {
                return html.replace(/<script\b[^>]*\bsrc\s*=\s*["'][^"']*["'][^>]*>\s*<\/script>/gi, function (tag) {
                    partialScripts.push(tag);
                    return '';
                });
            };

            $("#header").html(stripScripts(headerHTML));
            $("#footer").html(stripScripts(footerHTML));
            $("#sidebar").html(stripScripts(sidebarHTML));
            fixNavLinks();

            // Load the extracted scripts asynchronously (non-blocking, no sync XHR).
            partialScripts.forEach(function (tag) {
                var srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i);
                if (!srcMatch) return;
                var src = srcMatch[1];
                var script = document.createElement('script');
                // Resolve bare-relative paths against the page so subpages work too.
                script.src = (/^([a-z]+:)?\/\//i.test(src) || src.charAt(0) === '/' || src.indexOf(':') > -1)
                    ? src
                    : pathPrefix + src;
                document.head.appendChild(script);
            });
        })
        .then(finishNavInit);
}

function fixNavLinks() {
    const isInSubfolder = window.location.pathname.includes('/solutions/') || window.location.pathname.includes('/products/') || window.location.pathname.includes('/case-studies/') || window.location.pathname.includes('/article/') || window.location.pathname.includes('/blogs/') || window.location.pathname.includes('/industries/');

    if (isInSubfolder) {
        $("#header a[href], #footer a[href], #sidebar a[href]").each(function () {
            const href = $(this).attr('href');
            if (href && href.startsWith('./') && !href.startsWith('../')) {
                $(this).attr('href', '../' + href.substring(2));
            }
        });
        /* Fix data-img / data-url on mega-prod-links for subfolder pages */
        $('#header [data-img]').each(function () {
            const img = $(this).attr('data-img');
            if (img && img.startsWith('./')) $(this).attr('data-img', '../' + img.slice(2));
        });
        $('#header [data-url]').each(function () {
            const url = $(this).attr('data-url');
            if (url && url.startsWith('./')) $(this).attr('data-url', '../' + url.slice(2));
        });
        /* Fix the initial preview image src */
        const prevImg = document.getElementById('megaPreviewImg');
        if (prevImg) {
            const src = prevImg.getAttribute('src');
            if (src && src.startsWith('./')) prevImg.setAttribute('src', '../' + src.slice(2));
        }
        /* Fix sol-img-card background-image inline style paths */
        $('#header .sol-img-card-bg').each(function () {
            const raw = this.getAttribute('style') || '';
            if (raw.includes('./image/')) {
                this.setAttribute('style', raw
                    .replace(/url\('\.\/image\//g, "url('../image/")
                    .replace(/url\("\.\/image\//g, 'url("../image/'));
            }
        });
        /* Fix footer image src paths for subfolder pages */
        $('#footer img[src]').each(function () {
            const src = $(this).attr('src');
            if (src && src.startsWith('./image/')) {
                $(this).attr('src', '../' + src.substring(2));
            }
        });
    }
}

function initBannerVideo() {
    // Plain autoplay/loop iframe instead of the YT.Player IFrame API: native
    // `loop=1&playlist=<id>` already loops a single video with no JS needed,
    // so we skip loading youtube.com/iframe_api (player base.js + embed.js,
    // ~700KB) purely to detect "ended" and call playVideo() again.
    var $bg = $('#banner-video-background');
    var videoId = $bg.data('video-id');
    if (!videoId) return;

    var params = $.param({
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: videoId,
        controls: 0,
        fs: 0,
        showinfo: 0,
        rel: 0,
        disablekb: 1,
        modestbranding: 1,
        iv_load_policy: 3,
        playsinline: 1, // required for reliable autoplay on iOS Safari
        origin: window.location.origin
    });

    var $iframe = $('<iframe>', {
        src: 'https://www.youtube-nocookie.com/embed/' + videoId + '?' + params,
        title: 'Background video',
        frameborder: 0,
        allow: 'autoplay; encrypted-media',
        referrerpolicy: 'strict-origin-when-cross-origin'
    });

    $bg.append($iframe);
    setYoutubeSize();
    $(window).on('resize', setYoutubeSize);

    function setYoutubeSize() {
        var $container = $('.banner-video-container');
        var containerWidth = $container.outerWidth();
        var containerHeight = $container.outerHeight();
        var aspectRatio = 16 / 9;
        var newWidth, newHeight;

        if (containerWidth / containerHeight > aspectRatio) {
            newWidth = containerWidth;
            newHeight = containerWidth / aspectRatio;
        } else {
            newWidth = containerHeight * aspectRatio;
            newHeight = containerHeight;
        }

        $iframe.width(newWidth).height(newHeight);
    }
}

function initThemeSwitch() {
    let lightMode = false;

    if (localStorage.getItem('lightmode') === 'active') {
        lightMode = true;
        $('body').addClass('lightmode').removeClass('dark-mode');
    } else {
        lightMode = false;
        $('body').addClass('dark-mode').removeClass('lightmode');
    }

    const updateLogos = () => {
        const sidebarLogos = $('.sidebar .site-logo');
        const headerLogos = $('.navbar-brand .site-logo');
        const partnerLogos = $('.partner-logo');
        const navbarToggler = $('.navbar-toggler.nav-btn .fa-solid.fa-bars');
        const closeBtn = $('.close-btn');

        // Specific icons to apply greyscale in light mode
        const chooseUsIcons = $('img[src*="IoT_icon.webp"], img[src*="Digital_Solutions_icon.webp"], img[src*="Transparent_icon.webp"]');

        if (lightMode) {
            $('body').addClass('lightmode').removeClass('dark-mode');
            localStorage.setItem('lightmode', 'active');

            sidebarLogos.attr('src', pathPrefix + 'image/branding/sentra_black_1.svg');
            headerLogos.attr('src', pathPrefix + 'image/branding/sentra_white_1.svg');

            // Change navbar toggle and close button colors to black in light mode
            navbarToggler.css('color', '#000000');
            closeBtn.css('color', '#000000');

            // Apply dark greyscale filter to specific choose us icons in light mode
            chooseUsIcons.css('filter', 'grayscale(100%) brightness(0.3)');

            partnerLogos.each(function () {
                const $img = $(this);
                const src = $img.attr('src');
                if (!src.includes('')) {
                    $img.attr('src', src.replace('.png', '.png'));
                }
            });
        } else {
            $('body').addClass('dark-mode').removeClass('lightmode');
            localStorage.removeItem('lightmode');

            sidebarLogos.attr('src', pathPrefix + 'image/branding/sentra_white_1.svg');
            headerLogos.attr('src', pathPrefix + 'image/branding/sentra_white_1.svg');

            // Reset navbar toggle and close button colors in dark mode (remove inline styles)
            navbarToggler.css('color', '');
            closeBtn.css('color', '');

            // Remove greyscale filter from choose us icons in dark mode
            chooseUsIcons.css('filter', '');

            partnerLogos.each(function () {
                const $img = $(this);
                const src = $img.attr('src');
                $img.attr('src', src.replace('.png', '.png'));
            });
        }
    };

    updateLogos();

    const observer = new MutationObserver(() => {
        updateLogos();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Listen for theme changes from themeswitch.js (View Transitions API)
    $(document).on('themeChanged', function (e) {
        const theme = e.detail ? e.detail.theme : null;
        if (theme === 'light') {
            lightMode = true;
        } else if (theme === 'dark') {
            lightMode = false;
        }
        setTimeout(function () {
            updateLogos();
        }, 50);
    });
}



$(document).ready(function () {
    initThemeSwitch();
});

function initCounter() {
    var $counters = $(".counter");

    function updateCount($counter) {
        var target = +$counter.data("target");
        var count = +$counter.text().replace("+", "");
        var duration = 2000;
        var steps = 60;
        var increment = Math.max(1, Math.ceil(target / steps));
        var delay = Math.floor(duration / (target / increment));

        if (count < target) {
            var nextCount = Math.min(target, count + increment);
            $counter.text(nextCount);
            setTimeout(function () {
                updateCount($counter);
            }, delay);
        } else {
            $counter.text(target);
        }
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var $counter = $(entry.target);
                // Markup ships with the real target number so crawlers and no-JS
                // visitors never see a bare 0; reset to 0 here so JS users still
                // get the count-up animation.
                $counter.text(0);
                updateCount($counter);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    $counters.each(function () {
        observer.observe(this);
    });
}

function initNavLink() {
    const currentPath = window.location.pathname;
    $(".navbar-nav .nav-link:not(.dropdown-toggle)").each(function () {
        const linkPath = new URL(this.href).pathname;
        if (linkPath === currentPath) {
            $(this).addClass("active");
        }
    });
    $(".navbar-nav .dropdown-menu .dropdown-item, .navbar-nav .dropdown-menu .product-link, .navbar-nav .dropdown-menu .column-title").each(function () {
        const linkPath = new URL(this.href).pathname;
        if (linkPath === currentPath) {
            $(this).closest(".dropdown").find(".nav-link.dropdown-toggle").addClass("active");
        }
    });
}

$(function () {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add(entry.target.getAttribute('data-animate'));
                    entry.target.style.opacity = 1;

                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    elements.forEach(el => observer.observe(el));
});

function initSidebar() {
    const $menuBtn = $('.nav-btn');
    const $overlay = $('.mmenu-overlay');
    const $panel = $('.mmenu-panel');

    function positionPanel() {
        /* .navbar-wrapper reserves ~36px below the visible bar for the desktop
           mega-dropdown's hover offset (see --mega-menu-top in header.html).
           Measure the actual visible bar (.navbar) so the mobile panel hugs it. */
        const headerEl = document.querySelector('.navbar') || document.querySelector('.navbar-wrapper');
        if (!headerEl) return;
        const bottom = headerEl.getBoundingClientRect().bottom;
        document.documentElement.style.setProperty('--mmenu-top', Math.max(bottom, 0) + 8 + 'px');
    }

    function isOpen() {
        return $panel.hasClass('active');
    }

    function openMenu() {
        positionPanel();
        $overlay.addClass('active');
        $panel.addClass('active');
        $menuBtn.addClass('is-open').attr('aria-expanded', 'true');
        $menuBtn.find('i').removeClass('fa-bars').addClass('fa-xmark');
    }

    function closeMenu() {
        $overlay.removeClass('active');
        $panel.removeClass('active');
        $menuBtn.removeClass('is-open').attr('aria-expanded', 'false');
        $menuBtn.find('i').removeClass('fa-xmark').addClass('fa-bars');
    }

    $menuBtn.on('click', function () {
        isOpen() ? closeMenu() : openMenu();
    });

    $overlay.on('click', closeMenu);

    $panel.on('click', 'a', closeMenu);

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) closeMenu();
    });

    /* Keep the panel glued to the navbar's live bottom edge while open, so the
       header snapping into its sticky/compact state mid-scroll (see .scrolled
       in initScrollHeader) can never leave a stale gap above the panel. */
    $(window).on('resize scroll', function () {
        if (isOpen()) positionPanel();
    });
}

function initEditSidebar() {
    const $contentBtn = $('.content-edit');
    const $closeBtn = $('.close-btn-second');
    const $overlay = $('.content-overlay');
    const $sidebar = $('.content-edit-sidebar');

    $contentBtn.click(function () {
        $sidebar.addClass('active');
        setTimeout(() => {
            $overlay.addClass('active');
        }, 200);
    });

    $closeBtn.click(function () {
        $sidebar.removeClass('active');
        setTimeout(() => {
            $overlay.removeClass('active');
        }, 200);
    });
}

function initSearchBar() {
    const $searchBtn = $(".search-btn");
    const $overlay = $(".search-overlay");
    const $closeBtn = $(".search-close");

    if ($overlay.length === 0) return;

    $searchBtn.on("click", function () {
        $overlay.addClass("active");
        setTimeout(() => {
            $overlay.addClass("active");
        }, 200);
    });

    $closeBtn.on("click", function () {
        $overlay.removeClass("active");
        setTimeout(() => {
            $overlay.removeClass("active");
        }, 200);
    });

    $overlay.on("click", function (e) {
        if ($(e.target).hasClass("search-overlay")) {
            $overlay.removeClass("active");
        }
    });
}



$(document).ready(function () {
    const data = [
        {
            title: "Home",
            description: "Empowering infrastructure with next-generation Smart Structural Health Monitoring (SHM) systems. SENTRA delivers IoT-based sensing, data analytics, and predictive maintenance solutions for bridges, railways, and industrial structures across India. Explore our technology that ensures safer, smarter, and more reliable assets.",
            url: "index.html"
        },
        {
            title: "About",
            description: "About SENTRA | Hill 2, Plot No. 9, Pedda Rushikonda, Visakhapatnam. SENTRA specializes in Structural Health Monitoring, IoT-driven asset tracking, and predictive maintenance systems for large-scale infrastructure. Our mission is to enhance safety, sustainability, and longevity through advanced sensor technologies and intelligent data analytics.",
            url: "about.html"
        },
        {
            title: "Services",
            description: "Our Core Services | SENTRA offers end-to-end IoT and Monitoring Solutions — including Structural Health Monitoring (SHM), IoT Sensor Deployment, Data Acquisition Systems, Predictive Analytics, and Remote Infrastructure Monitoring. Our solutions are tailored for bridges, buildings, and industrial projects to ensure operational excellence.",
            url: "service.html"
        },
        {
            title: "Single Services",
            description: "Structural Health Monitoring | SENTRA provides real-time insights into structural performance using advanced sensors, gateways, and analytics platforms. Our technology detects stress, strain, and vibration anomalies early to prevent potential failures and improve asset reliability.",
            url: "single_services.html"
        },
        {
            title: "Case Studies",
            description: "Explore SENTRA Case Studies — Discover how our IoT-driven SHM systems have improved safety and reliability across India’s bridges, railway lines, and industrial plants. See the measurable benefits in data accuracy, cost reduction, and preventive maintenance efficiency.",
            url: "resources.html#case-studies"
        },
        {
            title: "Our Team",
            description: "Meet the SENTRA Team — A group of engineers, IoT specialists, and data scientists dedicated to redefining how infrastructure is monitored. Our team combines expertise in electronics, civil engineering, and analytics to deliver reliable SHM solutions for the real world.",
            url: "team.html"
        },
        {
            title: "Partnership",
            description: "Strong Partnerships, Proven Success | SENTRA collaborates with leading research institutes, contractors, and public sector organizations to develop advanced monitoring systems for infrastructure safety. Join hands with us to make data-driven decisions for a more resilient tomorrow.",
            url: "partnership.html"
        },
        {
            title: "Pricing Plan",
            description: "Flexible Pricing Plans | SENTRA offers scalable IoT monitoring packages for projects of all sizes. From single-site bridge monitoring to full-scale multi-structure SHM solutions, our plans are designed to deliver maximum insights with minimal complexity.",
            url: "pricing.html"
        },
        {
            title: "Testimonial",
            description: "What Our Clients Say | SENTRA’s SHM systems have transformed maintenance practices across railways, bridges, and smart city infrastructures. Clients appreciate the precision, stability, and reliability of our real-time IoT monitoring solutions that enhance safety and reduce downtime.",
            url: "testimonial.html"
        },
        {
            title: "FAQs",
            description: "Frequently Asked Questions | Have questions about SENTRA’s IoT and SHM systems? Learn how our sensors work, what data they capture, and how predictive analytics can prevent structural failures. Contact our team at +91 88857 30066 for personalized guidance.",
            url: "faq.html"
        },
        {
            title: "Error 404",
            description: "404 — Oops! Page Not Found. The page you’re looking for might have been moved or temporarily unavailable. Return to SENTRA Home to explore our Smart Monitoring Solutions for infrastructure and industrial applications.",
            url: "404-page.html"
        },
        {
            title: "Blog",
            description: "Our Blogs | Explore insights on Structural Health Monitoring, IoT innovations, data analytics, and smart infrastructure development. Learn how SENTRA is driving digital transformation in the monitoring of critical assets across India.",
            url: "resources.html#blogs"
        },
        {
            title: "Single Post",
            description: "Enhancing Infrastructure Reliability with IoT | SENTRA’s case-based insights highlight how real-time data from vibration, strain, and tilt sensors can prevent catastrophic failures. Learn from our field studies and see how SHM is shaping modern engineering.",
            url: "single_post.html"
        },
        {
            title: "Contact Us",
            description: "Contact SENTRA | Reach out to us for end-to-end IoT monitoring solutions, structural safety assessments, and system integrations. Address: Hill 2, Plot No. 9, Pedda Rushikonda, Rushikonda, Visakhapatnam, Andhra Pradesh 530045. Phone: +91 88857 30066. Email: info@sentra.com",
            url: "contact.html"
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q");

    const $resultContainer = $("#search-results");
    const $resultTitle = $("#result-title");

    if (keyword) {
        $resultTitle.text(`Search Result for "${keyword}" SENTRA - SMART IoT SOLUTIONS`);

        const result = data.filter(item =>
            item.title.toLowerCase().includes(keyword.toLowerCase()) ||
            item.description.toLowerCase().includes(keyword.toLowerCase())
        );

        if (result.length > 0) {
            result.forEach(item => {
                const $div = $("<div>").addClass("result").html(`
                    <a href="${item.url}"><h2>${item.title}</h2></a>
                    <p>${item.description}</p>
                `);
                $resultContainer.append($div);
            });
        } else {
            $resultContainer.html(`<p>No results found for the keyword.</p>`);
        }
    } else {
        $resultTitle.text("Enter search keywords.");
    }
});

function initAnimateData() {
    const $elements = $('[data-animate]');
    const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $el = $(entry.target);
                const delay = $el.data('delay') || 0;
                setTimeout(() => {
                    $el.addClass($el.data('animate'));
                    $el.css('opacity', 1);
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    $elements.each(function () {
        observer.observe(this);
    });
}

function initScrollHeader() {
    const header = document.querySelector('header');
    const threshold = 80;

    function updateMegaMenuTop() {
        const isSticky = header && header.classList.contains('scrolled');
        const navbar = document.querySelector('.navbar');
        const el = isSticky ? navbar : header;
        if (!el) return;
        const bottom = el.getBoundingClientRect().bottom;
        if (bottom <= 0) return;
        // sticky: open menu 20px above navbar bottom; normal: current offset
        const offset = isSticky ? 15 : 37;
        document.documentElement.style.setProperty('--mega-menu-top', (bottom - offset) + 'px');
    }

    function toggleScrolled() {
        if (window.scrollY > threshold) {
            header.classList.add('scrolled');
            document.body.style.paddingTop = header.offsetHeight + 'px';
        } else {
            header.classList.remove('scrolled');
            document.body.style.paddingTop = '0';
        }
        updateMegaMenuTop();
    }

    window.addEventListener('scroll', toggleScrolled);
    window.addEventListener('resize', updateMegaMenuTop);
    toggleScrolled(); // check on load
}


/* ================== Preloader ================== */
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const countEl = document.getElementById('preloader-count');
    const barFill = document.querySelector('.preloader-bar-fill');
    const duration = 1800; // ms
    const startTime = performance.now();
    let rafId = null;

    function animatePreloader(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic for smoother feel
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * 100);

        if (countEl) countEl.textContent = value;
        if (barFill) barFill.style.width = (eased * 100) + '%';

        if (progress < 1) {
            rafId = requestAnimationFrame(animatePreloader);
        }
    }

    rafId = requestAnimationFrame(animatePreloader);

    // Expose hide function for use after all assets are loaded
    window._hidePreloader = function () {
        if (rafId) cancelAnimationFrame(rafId);
        // Ensure counter shows 100
        if (countEl) countEl.textContent = '100';
        if (barFill) barFill.style.width = '100%';
        // Brief delay then fade out
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 300);
    };
})();

function initLoadMoreStories() {
    const $loadMoreBtn = $('#load-more-stories');
    if ($loadMoreBtn.length === 0) return;

    // Show 4 "cards" per click
    const cardsPerClick = 4;

    // Select all hidden case-study rows
    let $hiddenRows = $('.hidden-case-study');

    // Make sure they are hidden initially
    $hiddenRows.css('display', 'none');

    $loadMoreBtn.off('click').on('click', function () {
        // Refresh the list of still-hidden rows
        $hiddenRows = $('.hidden-case-study');

        if ($hiddenRows.length === 0) {
            $loadMoreBtn.fadeOut();
            return;
        }

        // Determine how many cards per row (for grouping)
        const sampleRow = $hiddenRows.first();
        const cardsPerRow = sampleRow.find('.case-studies-content, .blog-content, .card').length || 2;
        const rowsPerClick = Math.ceil(cardsPerClick / cardsPerRow);

        // Reveal that many rows
        const $toShow = $hiddenRows.slice(0, rowsPerClick);
        $toShow.each(function (i, row) {
            const $row = $(row);
            setTimeout(() => {
                $row.css('display', 'flex');
                $row.removeClass('hidden-case-study');

                // Trigger fade-in animations if applicable
                $row.find('[data-animate]').each(function () {
                    const $el = $(this);
                    const delay = $el.data('delay') || 0;
                    setTimeout(() => {
                        $el.addClass($el.data('animate'));
                        $el.css('opacity', 1);
                    }, delay);
                });
            }, i * 100);
        });

        // If all rows are now visible, hide the button
        setTimeout(() => {
            if ($('.hidden-case-study').length === 0) {
                $loadMoreBtn.fadeOut();
            }
        }, 500);
    });
}

/* ================== Scroll reveal for .animate-box ==================
   The markup carries `animate__animated` but never an animate.css effect class,
   and nothing added one at runtime - so `.animate-box { opacity: 0 }` hid those
   blocks forever (whole sections of the homepage rendered blank).

   Elements already in (or above) the viewport when this runs are left alone, so
   nothing that has painted flashes out. Everything below the fold is hidden and
   faded in as it scrolls into view. */
(function () {
    var boxes = Array.prototype.slice.call(document.querySelectorAll('.animate-box'));
    if (!boxes.length) return;

    var EFFECT = 'animate__fadeInUp';
    var HIDDEN = 'animate-box-hidden';

    function reveal(el) {
        el.classList.remove(HIDDEN);
        el.classList.add(EFFECT);
    }

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
        // Nothing to do: CSS already leaves .animate-box visible.
        return;
    }

    var viewportBottom = window.innerHeight || document.documentElement.clientHeight;
    var pending = boxes.filter(function (el) {
        return el.getBoundingClientRect().top > viewportBottom;
    });
    if (!pending.length) return;

    pending.forEach(function (el) { el.classList.add(HIDDEN); });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -12% 0px' });

    pending.forEach(function (el) { observer.observe(el); });

    // Safety net: never leave content hidden if the observer somehow never fires.
    setTimeout(function () {
        pending.forEach(function (el) {
            if (el.classList.contains(HIDDEN)) reveal(el);
        });
    }, 5000);
})();
