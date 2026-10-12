/**
 * Monitoring Assessment form (monitoring-assessment.html).
 *
 * Posts to /api/assessment on the Worker, which writes one column per answer to
 * the 'Assessment Leads' sheet, adds a summary row to 'Contact Leads' (so it
 * shows in the admin dashboard) and emails it via Mailgun.
 *
 * Deep links: ?asset=<slug> pre-selects the asset type (bridge, railway,
 * building, dam, tunnel, mine, industrial, other); ?source=<slug> records which
 * page the visitor came from. Both are passed to GA4 with generate_lead.
 *
 * Depends on sentraApiUrl() and showToast() from submit-form.js.
 */
(function () {
    var TOTAL_STEPS = 4;
    var formStarted = false;
    var params = new URLSearchParams(window.location.search);

    function track(name, data) {
        if (window.trackEvent) window.trackEvent(name, data || {});
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function val(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function checkedValues(name) {
        var out = [];
        document.querySelectorAll('input[name="' + name + '"]:checked').forEach(function (cb) { out.push(cb.value); });
        return out;
    }

    function assetInput() {
        return document.querySelector('input[name="asset-type"]:checked');
    }

    function showError(msg) {
        var box = document.getElementById('error-message');
        box.querySelector('p').textContent = msg;
        box.classList.remove('hidden');
        document.getElementById('success-message').classList.add('hidden');
        setTimeout(function () { box.classList.add('hidden'); }, 3500);
    }

    // Only block forward moves; going back is always allowed.
    function stepIsValid(from) {
        if (from === 1 && !assetInput()) { showError('Please choose an asset type.'); return false; }
        if (from === 3 && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val('email'))) {
            showError('Please enter a valid work email.');
            return false;
        }
        return true;
    }

    var currentStep = 1;

    window.goStep = function (n) {
        if (n > currentStep) {
            for (var s = currentStep; s < n; s++) if (!stepIsValid(s)) return;
        }
        document.querySelectorAll('#assessmentForm .step-content').forEach(function (el) { el.classList.remove('active'); });
        document.querySelectorAll('#assessmentForm .step-connector-fill').forEach(function (el) { el.style.width = '0'; });
        document.querySelector('#assessmentForm .step-content[data-step="' + n + '"]').classList.add('active');

        for (var i = 1; i <= TOTAL_STEPS; i++) {
            var dot = document.querySelector('#assessmentForm .step-dot[data-step="' + i + '"]');
            var label = dot.querySelector('.step-label').textContent;
            dot.classList.remove('active', 'completed');
            if (i < n) {
                dot.classList.add('completed');
                dot.innerHTML = '<span class="step-label">' + label + '</span>';
                var conn = document.querySelector('#assessmentForm .step-connector[data-connector="' + i + '"] .step-connector-fill');
                if (conn) conn.style.width = '100%';
            } else {
                if (i === n) dot.classList.add('active');
                dot.innerHTML = '<span class="step-num">' + i + '</span><span class="step-label">' + label + '</span>';
            }
        }

        // Forward progress only, so the funnel shows how far visitors get.
        if (n > currentStep) track('form_step', { form_name: 'assessment', step: n });
        currentStep = n;
        if (n === TOTAL_STEPS) buildReview();
    };

    function collect() {
        var asset = assetInput();
        return {
            assetType: asset ? asset.value : '',
            assetSlug: asset ? asset.getAttribute('data-slug') : '',
            assetAge: val('asset-age'),
            assetCount: val('asset-count'),
            location: val('asset-location'),
            parameters: checkedValues('parameters'),
            inspection: val('inspection-method'),
            problem: val('problem'),
            firstName: val('first-name'),
            lastName: val('last-name'),
            company: val('company'),
            email: val('email'),
            phone: val('phone'),
            source: val('assess-source')
        };
    }

    function buildReview() {
        var d = collect();
        var rows = [
            ['Asset type', d.assetType],
            ['Asset age', d.assetAge],
            ['Number of assets', d.assetCount],
            ['Location', d.location],
            ['Monitor', d.parameters.join(', ')],
            ['Current inspection', d.inspection],
            ['Problem', d.problem],
            ['Name', (d.firstName + ' ' + d.lastName).trim()],
            ['Company', d.company],
            ['Email', d.email],
            ['Phone', d.phone]
        ];
        document.getElementById('reviewGrid').innerHTML = rows.map(function (r) {
            return '<div class="step-review-row"><span class="step-review-label">' + r[0] +
                '</span><span class="step-review-value">' + escapeHtml(r[1] || '—') + '</span></div>';
        }).join('');
    }

    function prefill() {
        var asset = (params.get('asset') || '').toLowerCase();
        if (asset) {
            var radio = document.querySelector('input[name="asset-type"][data-slug="' + asset.replace(/[^a-z-]/g, '') + '"]');
            if (radio) radio.checked = true;
        }
        var source = params.get('source') || '';
        if (!source && document.referrer) {
            try { source = new URL(document.referrer).pathname; } catch (err) { /* ignore */ }
        }
        document.getElementById('assess-source').value = source.slice(0, 120);
    }

    function init() {
        var form = document.getElementById('assessmentForm');
        if (!form) return;
        prefill();

        form.addEventListener('focusin', function () {
            if (formStarted) return;
            formStarted = true;
            track('form_start', { form_name: 'assessment', source: val('assess-source') });
        });
        form.addEventListener('change', function (e) {
            if (!formStarted && e.target.name === 'asset-type') {
                formStarted = true;
                track('form_start', { form_name: 'assessment', source: val('assess-source') });
            }
        });

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var btn = document.getElementById('finalSubmitBtn');
            if (btn.disabled) return;
            if (!stepIsValid(1)) { window.goStep(1); return; }
            if (!stepIsValid(3)) { window.goStep(3); return; }

            var d = collect();
            var original = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Sending...';

            try {
                var res = await fetch(sentraApiUrl() + '/api/assessment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: d.firstName,
                        lastName: d.lastName,
                        email: d.email,
                        phone: d.phone,
                        company: d.company,
                        assetType: d.assetType,
                        assetAge: d.assetAge,
                        assetCount: d.assetCount,
                        location: d.location,
                        parameters: d.parameters.join(', '),
                        inspection: d.inspection,
                        problem: d.problem,
                        source: d.source
                    })
                });
                var data = await res.json().catch(function () { return {}; });

                if (res.status === 409 && data.duplicate) {
                    showError('This request was already submitted. Our team will be in touch.');
                    return;
                }
                if (!res.ok) throw new Error(data.error || 'Submission failed');

                document.getElementById('error-message').classList.add('hidden');
                document.getElementById('success-message').classList.remove('hidden');
                track('generate_lead', { form_name: 'assessment', asset_type: d.assetSlug, source: d.source });
                if (typeof showToast === 'function') showToast('Assessment request sent. We will be in touch within 24 hours.', 'success');
                form.reset();
                prefill();
                formStarted = false;
                window.goStep(1);
            } catch (err) {
                showError('Oops! Form submission failed. Please try again.');
            } finally {
                btn.disabled = false;
                btn.textContent = original;
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
