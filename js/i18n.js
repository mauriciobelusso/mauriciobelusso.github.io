(function (global) {
    const DEFAULT_LANG = 'pt-BR';
    const STORAGE_KEY = 'resume-lang';
    const LANGUAGES = [
        { code: 'pt-BR', label: 'PT', htmlLang: 'pt-BR' },
        { code: 'en', label: 'EN', htmlLang: 'en' },
        { code: 'es', label: 'ES', htmlLang: 'es' },
        { code: 'fr', label: 'FR', htmlLang: 'fr' }
    ];

    function normalizeLang(value) {
        if (!value) return null;
        const lower = String(value).trim().toLowerCase().replace(/_/g, '-');
        if (lower === 'pt' || lower.startsWith('pt-')) return 'pt-BR';
        if (lower.startsWith('en')) return 'en';
        if (lower.startsWith('es')) return 'es';
        if (lower.startsWith('fr')) return 'fr';
        return LANGUAGES.some((lang) => lang.code === value) ? value : null;
    }

    function detectLang() {
        const fromUrl = normalizeLang(new URLSearchParams(location.search).get('lang'));
        if (fromUrl) return fromUrl;

        try {
            const stored = normalizeLang(localStorage.getItem(STORAGE_KEY));
            if (stored) return stored;
        } catch (_) { /* ignore */ }

        const candidates = (navigator.languages && navigator.languages.length)
            ? navigator.languages
            : [navigator.language];

        for (const candidate of candidates) {
            const mapped = normalizeLang(candidate);
            if (mapped) return mapped;
        }

        return DEFAULT_LANG;
    }

    function htmlLangFor(lang) {
        const match = LANGUAGES.find((item) => item.code === lang);
        return match ? match.htmlLang : lang;
    }

    function persistLang(lang) {
        const normalized = normalizeLang(lang) || DEFAULT_LANG;

        try {
            localStorage.setItem(STORAGE_KEY, normalized);
        } catch (_) { /* ignore */ }

        const url = new URL(location.href);
        url.searchParams.set('lang', normalized);
        history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
        document.documentElement.lang = htmlLangFor(normalized);
        return normalized;
    }

    function resumeUrl(lang) {
        return `locales/${lang}/resume.json`;
    }

    function cvUrl(lang, print) {
        const params = new URLSearchParams({ lang });
        if (print) params.set('print', '1');
        return `cv.html?${params.toString()}`;
    }

    function portfolioUrl(lang) {
        return `./?lang=${encodeURIComponent(lang)}`;
    }

    async function loadResumeJson(lang) {
        const response = await fetch(resumeUrl(lang), { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }

    function renderLangSwitcher(container, currentLang, onChange) {
        if (!container) return;

        container.replaceChildren();
        container.setAttribute('role', 'group');

        LANGUAGES.forEach((item, index) => {
            if (index > 0) {
                const sep = document.createElement('span');
                sep.className = 'lang-sep';
                sep.setAttribute('aria-hidden', 'true');
                sep.textContent = '|';
                container.appendChild(sep);
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = item.code === currentLang ? 'lang-btn is-active' : 'lang-btn';
            button.dataset.lang = item.code;
            button.textContent = item.label;
            button.setAttribute('aria-pressed', String(item.code === currentLang));
            button.setAttribute('aria-label', item.label);
            button.addEventListener('click', () => {
                if (item.code !== currentLang) onChange(item.code);
            });
            container.appendChild(button);
        });
    }

    global.ResumeI18n = {
        DEFAULT_LANG,
        LANGUAGES,
        normalizeLang,
        detectLang,
        persistLang,
        resumeUrl,
        cvUrl,
        portfolioUrl,
        loadResumeJson,
        renderLangSwitcher
    };
})(window);
