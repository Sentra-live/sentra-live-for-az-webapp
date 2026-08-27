/* ==========================================================================
   Resources Hub — data + interaction logic
   Unifies Blogs, Case Studies and Articles into one filterable page.
   ========================================================================== */

(function () {
    'use strict';

    var RESOURCES = [
        // ---------- Blogs ----------
        {
            id: 'blog-what-is-strain-gauge',
            title: 'What Is a Strain Gauge? Types, Working Principle & Applications',
            excerpt: 'How strain gauges work, the gauge factor formula, the main types (foil, semiconductor, rosette, vibrating wire), and where they fit in structural monitoring.',
            category: 'Sensor Technology',
            color: 'blue',
            type: 'blogs',
            date: '10 Aug 2026',
            image: './image/blogs/banners/blogs_what-is-a-strain-gauge-types-working-principle.webp',
            link: './blogs/what-is-a-strain-gauge-types-working-principle.html',
            featured: true
        },
        {
            id: 'blog-what-is-inclinometer',
            title: 'What Is an Inclinometer? Digital Tiltmeters Explained',
            excerpt: 'How digital inclinometers and tiltmeters measure tilt and rotation, and where they are used in slope, structural and rail monitoring.',
            category: 'Sensor Technology',
            color: 'orange',
            type: 'blogs',
            date: '3 Aug 2026',
            image: './image/blogs/banners/blogs_what-is-an-inclinometer-digital-tiltmeter-guide.webp',
            link: './blogs/what-is-an-inclinometer-digital-tiltmeter-guide.html'
        },
        {
            id: 'blog-what-is-accelerometer',
            title: 'What Is an Accelerometer Sensor? Working Principle, Types & Applications',
            excerpt: 'How accelerometer sensors work, piezoelectric vs capacitive MEMS vs tri-axial types, and their role in seismic and machinery monitoring.',
            category: 'Sensor Technology',
            color: 'purple',
            type: 'blogs',
            date: '20 Jul 2026',
            image: './image/blogs/banners/blogs_what-is-an-accelerometer-sensor-guide.webp',
            link: './blogs/what-is-an-accelerometer-sensor-guide.html'
        },
        {
            id: 'blog-what-is-data-logger',
            title: 'What Is a Data Logger? Types, How They Work & How to Choose One',
            excerpt: 'What a data logger is, the main types available, and what to look for when choosing one for remote infrastructure monitoring.',
            category: 'IoT Sensors',
            color: 'teal',
            type: 'blogs',
            date: '27 Jul 2026',
            image: './image/blogs/banners/blogs_what-is-a-data-logger-types-guide.webp',
            link: './blogs/what-is-a-data-logger-types-guide.html'
        },
        {
            id: 'blog-digital-twins-mesh-pointcloud-splatting',
            title: 'The Future of Digital Twins: Mesh, Point Clouds, and Gaussian Splatting Compared',
            excerpt: 'Discover how Mesh, Point Clouds, and Gaussian Splatting are transforming Digital Twins, BIM, and laser scanning for the AEC industry.',
            category: 'Digital Twin',
            color: 'purple',
            type: 'blogs',
            date: '24 Jul 2026',
            image: './image/blogs/banners/blogs_future-digital-twins-mesh-point-cloud-gaussian-splatting.webp',
            link: './blogs/future-digital-twins-mesh-point-cloud-gaussian-splatting.html',
            featured: true
        },
        {
            id: 'blog-seismic-monitoring',
            title: 'Seismic Monitoring for Buildings and Critical Infrastructure',
            excerpt: 'How IoT-enabled seismic monitoring systems protect buildings, bridges, dams, and tunnels from earthquake damage through real-time structural assessment.',
            category: 'Structural Health',
            color: 'blue',
            type: 'blogs',
            date: '15 Jun 2026',
            image: './image/blogs/banners/blogs_seismic-monitoring-buildings-critical-infrastructure.webp',
            link: './blogs/seismic-monitoring-buildings-critical-infrastructure.html'
        },
        {
            id: 'blog-construction-vibrations',
            title: 'Monitoring Construction-Induced Vibrations in Urban Environments',
            excerpt: 'Best practices for monitoring construction vibrations in dense urban settings — from pile driving to demolition — using real-time IoT sensor networks.',
            category: 'Structural Monitoring',
            color: 'orange',
            type: 'blogs',
            date: '10 Jun 2026',
            image: './image/blogs/banners/blogs_monitoring-construction-induced-vibrations.webp',
            link: './blogs/monitoring-construction-induced-vibrations.html'
        },
        {
            id: 'blog-bridge-warning-signs',
            title: '10 Early Warning Signs Your Bridge Needs Continuous Monitoring',
            excerpt: 'From cracking patterns to vibration anomalies — discover the 10 critical indicators that demand real-time structural health monitoring for bridges.',
            category: 'Bridge Safety',
            color: 'rose',
            type: 'blogs',
            date: '5 Jun 2026',
            image: './image/blogs/banners/blogs_10-early-warning-signs-bridge-continuous-monitoring.webp',
            link: './blogs/10-early-warning-signs-bridge-continuous-monitoring.html',
            featured: true
        },
        {
            id: 'blog-pump',
            title: 'Intelligent Pump House Monitoring & Control',
            excerpt: 'Intelligent monitoring and control system for pump houses with 40% energy savings.',
            category: 'Smart Pumping',
            color: 'teal',
            type: 'blogs',
            date: '20 May 2026',
            image: './image/blogs/banners/blogs_intelligent-pump-house-monitoring-and-control.webp',
            link: './blogs/intelligent-pump-house-monitoring-and-control.html'
        },
        {
            id: 'blog-iot',
            title: 'Advanced IoT Solutions',
            excerpt: 'Comprehensive IoT implementation with smart sensors and real-time data analytics.',
            category: 'IoT Sensors',
            color: 'blue',
            type: 'blogs',
            date: '15 Apr 2026',
            image: './image/blogs/banners/blogs_advanced-iot-solutions.webp',
            link: './blogs/advanced-iot-solutions.html'
        },
        {
            id: 'blog-facility',
            title: 'Asset Monitoring & Facility Management',
            excerpt: 'Comprehensive IoT implementation with smart sensors for real-time monitoring and management.',
            category: 'Facility Management',
            color: 'purple',
            type: 'blogs',
            date: '1 Mar 2026',
            image: './image/blogs/banners/blogs_asset-monitoring-facility-management.webp',
            link: './blogs/asset-monitoring-facility-management.html'
        },
        {
            id: 'blog-realtime',
            title: 'Real-Time Monitoring Solutions',
            excerpt: 'Transforming infrastructure safety & performance with always-on sensor networks.',
            category: 'Monitoring',
            color: 'teal',
            type: 'blogs',
            date: '15 Jan 2026',
            image: './image/blogs/banners/blogs_real-time-monitoring-solutions-transforming-infrastructure-safety-performance.webp',
            link: './blogs/real-time-monitoring-solutions-transforming-infrastructure-safety-performance.html'
        },
        {
            id: 'blog-fatigue',
            title: 'Fatigue Life Assessment',
            excerpt: 'Extending the service life of structures with IoT-powered monitoring.',
            category: 'Fatigue Analysis',
            color: 'blue',
            type: 'blogs',
            date: '1 Dec 2025',
            image: './image/blogs/banners/blogs_fatigue-life-assessment.webp',
            link: './blogs/fatigue-life-assessment.html'
        },
        {
            id: 'blog-shm',
            title: 'Structural Health Monitoring',
            excerpt: 'Continuous SHM that protects infrastructure, cuts maintenance spend, and prolongs asset life.',
            category: 'Structural Health',
            color: 'orange',
            type: 'blogs',
            date: '15 Oct 2025',
            image: './image/blogs/banners/blogs_structural-health-monitoring.webp',
            link: './blogs/structural-health-monitoring.html'
        },
        {
            id: 'blog-bridge-damage',
            title: 'Top 5 Hidden Structural Damages Manual Bridge Inspection Misses',
            excerpt: 'Bridge inspection plays a critical role in maintaining infrastructure safety and operational continuity.',
            category: 'Bridge Safety',
            color: 'rose',
            type: 'blogs',
            date: '1 Sep 2025',
            image: './image/blogs/banners/blogs_top-5-hidden-structural-damages-bridge-inspection.webp',
            link: './blogs/top-5-hidden-structural-damages-bridge-inspection.html',
            featured: true
        },
        {
            id: 'blog-bridge-scour-monitoring',
            title: 'Bridge Scour: How IoT Sensors and Digital Twins Catch What Inspections Miss',
            excerpt: 'Bridge scour erodes the soil around bridge piers and is the leading cause of bridge collapse. Learn how IoT sensors and digital twins detect it before it becomes a failure.',
            category: 'Bridge Safety',
            color: 'rose',
            type: 'blogs',
            date: '15 Aug 2026',
            image: './image/blogs/banners/blogs_bridge-scour-iot-sensors-digital-twins.webp',
            link: './blogs/bridge-scour-monitoring-iot-digital-twins.html'
        },
        {
            id: 'blog-building-shm-iot',
            title: 'Continuous Building Monitoring with IoT Sensors: What Actually Gets Measured',
            excerpt: 'Buildings settle, sway, and crack over time. Continuous structural health monitoring with IoT sensors gives owners real-time data to act before small issues grow.',
            category: 'Structural Health',
            color: 'orange',
            type: 'blogs',
            date: '25 Aug 2026',
            image: './image/blogs/banners/blogs_continuous-building-monitoring-iot-sensors.webp',
            link: './blogs/continuous-building-shm-iot-sensors.html',
            featured: true
        },

        // ---------- Case Studies ----------
        {
            id: 'cs-highway-shm',
            title: 'Structural Health Monitoring of Highway Bridges',
            excerpt: 'Continuous SHM enabling early deterioration detection and predictive maintenance for aging highway infrastructure through real-time sensor data and engineering analytics.',
            category: 'Infrastructure',
            color: 'teal',
            type: 'case-studies',
            date: '16 Jul 2026',
            image: './image/case-studies/banners/case_studies_structural-health-monitoring-of-highway-bridges.webp',
            link: './case-studies/structural-health-monitoring-of-highway-bridges.html'
        },
        {
            id: 'cs-railway',
            title: 'IoT Bridge Monitoring & Sensor Installation on Railway Bridges',
            excerpt: '24×7 monitoring, instant alerts, and data-driven decisions for safer rail networks.',
            category: 'Railways',
            color: 'blue',
            type: 'case-studies',
            date: '1 Jun 2026',
            image: './image/case-studies/banners/case_studies_iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.webp',
            link: './case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html'
        },
        {
            id: 'cs-bridgepulse',
            title: 'BridgePulse — AI & Drone Technology for Bridge Health Monitoring',
            excerpt: 'Impact of implementation of IoT sensors and regularized monitoring devices on bridge health programs.',
            category: 'Bridge Safety',
            color: 'rose',
            type: 'case-studies',
            date: '1 Mar 2026',
            image: './image/case-studies/banners/case_studies_bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.webp',
            link: './case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html',
            featured: true
        },

        // ---------- Articles ----------
        {
            id: 'art-10-construction-technologies',
            title: '10 Construction Technologies Redefining the Industry',
            excerpt: 'AI, reality capture, digital twins, IoT, BIM beyond design, connected construction, XR, robotics, 3D printing and predictive monitoring — and how they converge.',
            category: 'Construction Tech',
            color: 'teal',
            type: 'articles',
            date: '21 Aug 2026',
            image: './image/articles/articles_10constructiontechnologiesredefiningtheindustry.webp',
            link: './article/10-construction-technologies-redefining-the-industry.html',
            featured: true
        },
        {
            id: 'art-flood-monitoring-early-warning-system',
            title: 'Flood Monitoring & Early Warning System',
            excerpt: 'How real-time water-level sensing, threshold-based alerting, mobile warnings and downstream sirens turn upstream detection into evacuation time for communities.',
            category: 'Flood Early Warning',
            color: 'purple',
            type: 'articles',
            date: '27 Aug 2026',
            image: './image/articles/articles_floodmonitoringandearlywarningsystem.webp',
            link: './article/flood-monitoring-early-warning-system.html',
            featured: true
        },
        {
            id: 'art-ai-infrastructure-monitoring',
            title: 'AI Is Coming for Infrastructure Monitoring',
            excerpt: 'How AI transforms infrastructure monitoring: the signal chain, modal features, environmental normalisation, anomaly detection, computer-vision defect tracking and predictive digital twins.',
            category: 'AI & Monitoring',
            color: 'teal',
            type: 'articles',
            date: '15 Aug 2026',
            image: './image/articles/articles_ai_for_bridge_monitoring.webp',
            link: './article/ai-infrastructure-monitoring.html',
            featured: true
        },
        {
            id: 'art-digital-twin-predictive-maintenance',
            title: 'Digital Twin for Predictive Maintenance: How It Works, Benefits, Architecture & Implementation',
            excerpt: 'How a Digital Twin enables predictive maintenance: architecture, a 7-stage workflow, a maturity model, real infrastructure examples, benefits and rollout steps.',
            category: 'Digital Twin',
            color: 'purple',
            type: 'articles',
            date: '7 Aug 2026',
            image: './image/articles/article_digital-twin-predictive-maintenance-sentra.webp',
            link: './article/digital-twin-predictive-maintenance-sentra.html',
            featured: true
        },
        {
            id: 'art-revolutionizing-iot',
            title: 'IoT Infrastructure Monitoring: Sensors, Edge Gateways and Digital Twins',
            excerpt: 'Discover how IoT is transforming infrastructure monitoring with real-time data analytics, enabling proactive maintenance and optimized operations.',
            category: 'IoT Innovation',
            color: 'blue',
            type: 'articles',
            date: '10 Sep 2025',
            image: './image/articles/article_revolutionizing-infrastructure-monitoring-with-iot.webp',
            link: './article/revolutionizing-infrastructure-monitoring-with-iot.html'
        },
        {
            id: 'art-worldsensing-partnership',
            title: 'Celebrating One Year of Partnership: Clove Technologies & Worldsensing',
            excerpt: 'Clove Technologies and Worldsensing celebrate one year of partnership in India, advancing smarter, safer, and connected infrastructure monitoring through wireless IoT solutions.',
            category: 'Company News',
            color: 'orange',
            type: 'articles',
            date: '23 Jul 2026',
            image: './image/articles/worldsensing-official-reseller-india.png',
            link: './article/worldsensing-official-reseller-india.html',
            featured: true
        },
        {
            id: 'art-xgrids-reseller',
            title: 'Clove Technologies Becomes Authorized XGRIDS Reseller in India',
            excerpt: 'Clove Technologies is now an authorized reseller of XGRIDS products in India, offering Lixel K2, PortalCam and Lixel L2 Pro for advanced 3D reality capture, LiDAR, and Digital Twin solutions.',
            category: 'Company News',
            color: 'orange',
            type: 'articles',
            date: '23 Jul 2026',
            image: './image/articles/xgrids-authorized-reseller-india.webp',
            link: './article/xgrids-authorized-reseller-india.html',
            featured: true
        },
        {
            id: 'art-pump',
            title: 'Intelligent Pump House Monitoring & Control',
            excerpt: 'Transforming water infrastructure with IoT-driven efficiency, predictive maintenance, and energy optimization.',
            category: 'Smart Pumping',
            color: 'teal',
            type: 'articles',
            date: '26 Feb 2026',
            image: './image/articles/article_Intelligent%20Pump%20House%20Monitoring%20%26%20Control.webp',
            link: './article/intelligent-pump-house-monitoring-and-control.html',
            featured: true
        },
        {
            id: 'art-smartcities',
            title: 'Building Resilient Smart Cities with Data-Driven Insights',
            excerpt: 'Learn how connected IoT systems are shaping the future of urban planning and sustainable infrastructure.',
            category: 'Smart Cities',
            color: 'purple',
            type: 'articles',
            date: '3 Nov 2025',
            image: './image/articles/article_Building%20Resilient%20Smart%20Cities%20with%20Data-Driven%20Insights.webp',
            link: './article/building-resilient-smart-cities-with-data-driven-insights.html'
        },
        {
            id: 'art-rail-monitoring',
            title: 'Track to the Future: How Remote Monitoring Helps Safeguard Rail and Civil Infrastructure',
            excerpt: 'IoT sensors, wireless monitoring, and Digital Twin technology are reshaping the safety and longevity of aging rail and civil infrastructure assets worldwide.',
            category: 'Rail Infrastructure',
            color: 'orange',
            type: 'articles',
            date: '24 Jun 2026',
            image: './image/articles/article_track-to-the-future-remote-monitoring-rail-infrastructure.webp',
            link: './article/track-to-the-future-remote-monitoring-rail-infrastructure.html',
            featured: true
        }
    ];

    var TABS = [
        { id: 'all', label: 'All Resources', icon: 'fa-solid fa-layer-group' },
        { id: 'blogs', label: 'Blogs', icon: 'fa-solid fa-blog' },
        { id: 'case-studies', label: 'Case Studies', icon: 'fa-solid fa-award' },
        { id: 'articles', label: 'Articles', icon: 'fa-solid fa-newspaper' }
    ];

    var TYPE_ICON = {
        blogs: 'fa-solid fa-blog',
        'case-studies': 'fa-solid fa-award',
        articles: 'fa-solid fa-newspaper'
    };

    var TYPE_ACTION = {
        blogs: 'Read Blog',
        'case-studies': 'Read Case Study',
        articles: 'Read Article'
    };

    var state = {
        tab: 'all',
        search: '',
        categories: []
    };

    function parseDate(str) {
        if (!str) return 0;
        var parts = str.match(/(\d+)\s+(\w+)\s+(\d+)/);
        if (!parts) return 0;
        var months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        return new Date(parseInt(parts[3]), months[parts[2]] || 0, parseInt(parts[1])).getTime();
    }

    function sortByDate(arr) {
        return arr.slice().sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function allCategories() {
        var seen = {};
        var out = [];
        RESOURCES.forEach(function (r) {
            if (!seen[r.category]) {
                seen[r.category] = true;
                out.push(r.category);
            }
        });
        return out;
    }

    function byType(type) {
        return RESOURCES.filter(function (r) { return r.type === type; });
    }

    function filteredResources() {
        var q = state.search.trim().toLowerCase();
        return RESOURCES.filter(function (r) {
            var matchesTab = state.tab === 'all' || r.type === state.tab;
            var matchesSearch = !q ||
                r.title.toLowerCase().indexOf(q) !== -1 ||
                r.excerpt.toLowerCase().indexOf(q) !== -1 ||
                r.category.toLowerCase().indexOf(q) !== -1;
            var matchesCategory = state.categories.length === 0 || state.categories.indexOf(r.category) !== -1;
            return matchesTab && matchesSearch && matchesCategory;
        });
    }

    function cardMarkup(r, variant) {
        var icon = TYPE_ICON[r.type] || 'fa-solid fa-sparkles';
        var action = TYPE_ACTION[r.type] || 'View';
        var variantClass = variant === 'featured' ? ' rh-card--featured' : (variant === 'compact' ? ' rh-card--compact' : '');
        var metaBits = [];
        if (r.date) metaBits.push('<span>' + escapeHtml(r.date) + '</span>');

        var titleTag = variant === 'compact' ? 'h4' : 'h3';

        return (
            '<a href="' + r.link + '" class="rh-card' + variantClass + '" data-id="' + r.id + '">' +
            '<div class="rh-card-banner rh-grad-' + r.color + (r.image ? ' has-image' : '') + '">' +
            (r.image ? '<img class="rh-card-img" src="' + r.image + '" alt="' + escapeHtml(r.title) + '" loading="lazy">' : '') +
            '<i class="' + icon + ' rh-banner-icon"></i>' +
            '<span class="rh-card-type"><i class="' + icon + '"></i></span>' +
            (variant !== 'compact' ? '<span class="rh-card-tag">' + escapeHtml(r.category) + '</span>' : '') +
            '</div>' +
            '<div class="rh-card-body">' +
            (variant === 'compact' ? '<span class="rh-card-tag" style="position:static;display:inline-block;margin-bottom:6px;background:transparent;border:0;padding:0;color:var(--accent-color);">' + escapeHtml(r.category) + '</span>' : '') +
            '<' + titleTag + ' class="rh-card-title">' + escapeHtml(r.title) + '</' + titleTag + '>' +
            '<p class="rh-card-excerpt">' + escapeHtml(r.excerpt) + '</p>' +
            '<div class="rh-card-foot">' +
            '<span class="rh-card-meta">' + metaBits.join('') + '</span>' +
            '<span class="rh-card-action">' + action + ' <i class="fa-solid fa-arrow-right"></i></span>' +
            '</div>' +
            '</div>' +
            '</a>'
        );
    }

    function renderHero() {
        $('#rh-count-blogs').text(byType('blogs').length);
        $('#rh-count-cs').text(byType('case-studies').length);
        $('#rh-count-articles').text(byType('articles').length);
    }

    function renderCategories() {
        var $wrap = $('#rh-categories');
        $wrap.empty();
        allCategories().forEach(function (cat) {
            var active = state.categories.indexOf(cat) !== -1;
            var $chip = $('<button type="button" class="rh-chip' + (active ? ' active' : '') + '">' + escapeHtml(cat) + '</button>');
            $chip.on('click', function () {
                var idx = state.categories.indexOf(cat);
                if (idx === -1) state.categories.push(cat); else state.categories.splice(idx, 1);
                render();
            });
            $wrap.append($chip);
        });
    }

    function renderTabs() {
        var $wrap = $('#rh-tabs');
        $wrap.empty();
        TABS.forEach(function (tab) {
            var $btn = $('<button type="button" class="rh-tab' + (state.tab === tab.id ? ' active' : '') + '"><i class="' + tab.icon + '"></i><span>' + tab.label + '</span></button>');
            $btn.on('click', function () {
                state.tab = tab.id;
                render();
                var target = document.getElementById('rh-section-' + tab.id);
                if (target) {
                    setTimeout(function () {
                        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
                    }, 80);
                }
            });
            $wrap.append($btn);
        });
    }

    function marqueeCardMarkup(r) {
        var typeLabel = r.type === 'blogs' ? 'Blog' : (r.type === 'case-studies' ? 'Case Study' : 'Article');
        return (
            '<a href="' + r.link + '" class="marquee-card">' +
            '<div class="marquee-card-img">' +
            (r.image ? '<img src="' + r.image + '" alt="' + escapeHtml(r.title) + '" loading="lazy">' : '') +
            '<span class="marquee-card-type type-' + r.type + '">' + typeLabel + '</span>' +
            '</div>' +
            '<div class="marquee-card-body">' +
            '<span class="marquee-card-cat">' + escapeHtml(r.category) + '</span>' +
            '<h4>' + escapeHtml(r.title) + '</h4>' +
            '</div>' +
            '</a>'
        );
    }

    function renderRecent(filtered) {
        var $section = $('#rh-recent');
        var pool = filtered.length ? filtered : RESOURCES;
        var ordered = sortByDate(pool).slice(0, 6);

        if (!ordered.length) {
            $section.hide();
            return;
        }
        $section.show();

        var cardsHtml = ordered.map(marqueeCardMarkup).join('');
        // Duplicate the set so the CSS marquee animation (translateX to -50%) loops seamlessly.
        var trackHtml = ordered.length > 1 ? cardsHtml + cardsHtml : cardsHtml;

        var html = '<div class="insight-marquee insight-marquee--single">' +
            '<div class="marquee-row">' +
            '<div class="marquee-track">' + trackHtml + '</div>' +
            '</div>' +
            '</div>';

        $('#rh-recent-grid').html(html);
        $('#rh-recent-heading').text(state.search ? 'Search Results for "' + state.search + '"' : 'Recently Published');
    }

    function renderCarousel(type, filtered) {
        var items = sortByDate(filtered.filter(function (r) { return r.type === type; }));
        var $section = $('#rh-section-' + type);
        var $track = $section.find('.rh-track');

        if (!items.length) {
            $track.empty();
            $section.hide();
            return;
        }
        $section.show();
        $section.find('.rh-section-count').text(items.length);

        $track.html(items.map(function (r) { return cardMarkup(r, 'default'); }).join(''));
        updateScrollButtons($section);
    }

    function updateScrollButtons($section) {
        var track = $section.find('.rh-track')[0];
        if (!track) return;
        var $left = $section.find('.rh-scroll-left');
        var $right = $section.find('.rh-scroll-right');
        $left.prop('disabled', track.scrollLeft <= 4);
        $right.prop('disabled', track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
    }

    function bindCarouselControls() {
        $('.rh-section').each(function () {
            var $section = $(this);
            var track = $section.find('.rh-track')[0];
            if (!track) return;

            $section.find('.rh-scroll-left').on('click', function () {
                track.scrollBy({ left: -track.clientWidth * 0.6, behavior: 'smooth' });
            });
            $section.find('.rh-scroll-right').on('click', function () {
                track.scrollBy({ left: track.clientWidth * 0.6, behavior: 'smooth' });
            });
            track.addEventListener('scroll', function () { updateScrollButtons($section); }, { passive: true });
            window.addEventListener('resize', function () { updateScrollButtons($section); });
        });
    }

    function render() {
        var filtered = filteredResources();

        renderTabs();
        renderCategories();
        $('#rh-results-count').text(filtered.length + (filtered.length === 1 ? ' RESULT' : ' RESULTS'));

        if (!filtered.length) {
            $('#rh-empty').show();
            $('#rh-recent').hide();
        } else {
            $('#rh-empty').hide();
            renderRecent(filtered);
        }

        renderCarousel('blogs', filtered);
        renderCarousel('case-studies', filtered);
        renderCarousel('articles', filtered);

        $('#rh-footer-blogs-count').text(byType('blogs').length);
        $('#rh-footer-cs-count').text(byType('case-studies').length);
        $('#rh-footer-articles-count').text(byType('articles').length);
        $('#rh-stat-total').text(RESOURCES.length);
        $('#rh-stat-current').text(filtered.length);
        $('#rh-stat-categories').text(allCategories().length);
    }

    function applyHashTab() {
        var hash = (window.location.hash || '').replace('#', '');
        var valid = TABS.some(function (t) { return t.id === hash; });
        if (valid) state.tab = hash;
    }

    $(function () {
        if (!$('.resources-hub').length) return;

        applyHashTab();
        $(window).on('hashchange', function () {
            applyHashTab();
            render();
        });
        renderHero();
        render();
        bindCarouselControls();

        $('#rh-search-input').on('input', function () {
            state.search = $(this).val();
            $('#rh-search-clear').toggle(!!state.search);
            render();
        });

        $('#rh-search-clear').on('click', function () {
            state.search = '';
            $('#rh-search-input').val('');
            $(this).hide();
            render();
        });

        $('#rh-empty-clear').on('click', function () {
            state.search = '';
            $('#rh-search-input').val('');
            $('#rh-search-clear').hide();
            render();
        });

        $('.rh-footer-tab-link').on('click', function () {
            state.tab = $(this).data('tab');
            render();
        });

        $('.rh-footer-cat-link').on('click', function () {
            var cat = $(this).data('cat');
            state.tab = 'all';
            state.categories = [cat];
            render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        $('.rh-clear-filters').on('click', function () {
            state.categories = [];
            state.search = '';
            $('#rh-search-input').val('');
            $('#rh-search-clear').hide();
            render();
        });

        $('.rh-back-top').on('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();
