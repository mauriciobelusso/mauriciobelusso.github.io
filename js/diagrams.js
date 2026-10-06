(function (global) {
    const INK = '#E2E8F0';
    const MUTED = '#94A3B8';
    const FAINT = '#64748B';
    const LINE = '#334155';
    const FILL = '#182033';
    const EMERALD = '#34D399';
    const FONT = 'JetBrains Mono, ui-monospace, monospace';

    let seq = 0;

    function esc(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function svg(viewBox, title, body) {
        const id = `pic-${++seq}`;
        return `<svg viewBox="${viewBox}" class="h-auto w-full" role="img" aria-labelledby="${id}" font-family="${FONT}">
            <title id="${id}">${esc(title)}</title>
            ${body}
        </svg>`;
    }

    function figure(diagram, picture) {
        const caption = diagram.caption
            ? `<figcaption class="font-mono text-[11px] leading-relaxed text-slate-500">${esc(diagram.caption)}</figcaption>`
            : '';
        return `<figure class="space-y-2">${picture}${caption}</figure>`;
    }

    function label(x, y, text, color, size, anchor) {
        return `<text x="${x}" y="${y}" text-anchor="${anchor || 'start'}" font-size="${size || 12}" fill="${color || MUTED}">${esc(text)}</text>`;
    }

    function pods(diagram) {
        const before = diagram.before || {};
        const after = diagram.after || {};
        let cells = '';
        for (let i = 0; i < 12; i += 1) {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 8 + col * 40;
            const y = 36 + row * 46;
            const leak = i === 5;
            cells += `<rect x="${x}" y="${y}" width="32" height="38" rx="5" fill="${FILL}" stroke="${leak ? EMERALD : LINE}" stroke-width="${leak ? 1.4 : 1}"/>
                <rect x="${x + 4}" y="${y + (leak ? 8 : 16)}" width="24" height="${leak ? 26 : 18}" rx="2" fill="${EMERALD}" fill-opacity="${leak ? 0.55 : 0.18}"/>`;
            if (leak) {
                cells += `<rect x="${x + 6}" y="${y - 10}" width="20" height="14" rx="3" fill="${EMERALD}" fill-opacity="0.85"/>`;
            }
        }
        const calm = [0, 1].map((i) => {
            const x = 292 + i * 78;
            return `<rect x="${x}" y="78" width="64" height="46" rx="8" fill="rgba(52,211,153,0.08)" stroke="${EMERALD}" stroke-width="1.5"/>
                <rect x="${x + 8}" y="100" width="48" height="14" rx="2" fill="${EMERALD}" fill-opacity="0.45"/>`;
        }).join('');
        const body = `
            ${label(8, 22, before.kicker, FAINT, 12)}
            ${label(8, 188, `${before.value || ''} ${before.unit || ''}`.trim(), INK, 13)}
            ${label(8, 206, before.detail, FAINT, 11)}
            ${cells}
            ${label(250, 108, diagram.bridge, EMERALD, 11, 'middle')}
            ${calm}
            ${label(292, 22, after.kicker, EMERALD, 12)}
            ${label(292, 188, `${after.value || ''} ${after.unit || ''}`.trim(), INK, 13)}
            ${label(292, 206, after.detail, EMERALD, 11)}
        `;
        return figure(diagram, svg('0 0 460 220', diagram.title, body));
    }

    function megabytes(text) {
        const raw = String(text || '');
        const match = raw.replace(',', '.').match(/[\d.]+/);
        if (!match) return 0;
        const n = Number(match[0]);
        const lower = raw.toLowerCase();
        if (lower.includes('gb') || lower.includes('go')) return n * 1000;
        return n;
    }

    function splitAmount(text) {
        const raw = String(text || '').trim();
        const match = raw.match(/^([0-9]+(?:[.,][0-9]+)?)(?:\s+(.*))?$/);
        if (!match) return { value: raw, unit: '' };
        return { value: match[1], unit: match[2] || '' };
    }

    function threads(diagram) {
        const before = diagram.before || {};
        const after = diagram.after || {};
        const beforeMb = megabytes(before.detail);
        const afterMb = megabytes(after.detail);
        const memScale = Math.max(beforeMb, afterMb, 1);
        const beforeMem = splitAmount(before.detail);
        const afterMem = splitAmount(after.detail);
        const slot = { y: 28, h: 46, w: 56 };

        function cpuBars(x) {
            const bars = [0, 1, 2, 3].map((i) => {
                const bx = x + i * 14;
                return `<rect x="${bx}" y="${slot.y}" width="9" height="${slot.h}" rx="4" fill="${FILL}" stroke="${LINE}"/>`;
            }).join('');
            return `${bars}<rect x="${x + 18}" y="${slot.y + 18}" width="20" height="6" rx="2" fill="${FAINT}"/>`;
        }

        function fibers(x) {
            const heights = [18, 34, 46, 24, 42, 16, 30, 38];
            return heights.map((h, i) => {
                const lx = x + 4 + i * 7;
                const base = slot.y + slot.h;
                return `<line x1="${lx}" y1="${base - h}" x2="${lx}" y2="${base}" stroke="${EMERALD}" stroke-width="2" stroke-linecap="round" stroke-opacity="${0.55 + (i % 3) * 0.15}"/>`;
            }).join('');
        }

        function tank(x, ratio, accent) {
            const y = 108;
            const w = slot.w;
            const h = slot.h;
            const inner = h - 8;
            const fillH = Math.max(8, Math.round(inner * ratio));
            return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${FILL}" stroke="${accent ? EMERALD : LINE}"/>
                <rect x="${x + 4}" y="${y + h - 4 - fillH}" width="${w - 8}" height="${fillH}" rx="4" fill="${EMERALD}" fill-opacity="0.62"/>`;
        }

        function reading(x, y, value, unit, note, accent) {
            const unitColor = accent ? EMERALD : MUTED;
            const noteLine = note ? label(x, y + 32, note, unitColor, 11) : '';
            return `${label(x, y, value, INK, 20)}${label(x, y + 16, unit, unitColor, 11)}${noteLine}`;
        }

        const body = `
            ${label(8, 16, before.kicker, FAINT, 12)}
            ${label(228, 16, after.kicker, EMERALD, 12)}
            ${label(210, 96, diagram.bridge, EMERALD, 11, 'middle')}
            ${cpuBars(8)}
            ${reading(74, 50, before.value, before.unit, before.note, false)}
            ${fibers(228)}
            ${reading(294, 50, after.value, after.unit, after.note, true)}
            ${tank(8, beforeMb / memScale, false)}
            ${reading(74, 132, beforeMem.value, beforeMem.unit, '', false)}
            ${tank(228, afterMb / memScale, true)}
            ${reading(294, 132, afterMem.value, afterMem.unit, '', true)}
        `;
        return figure(diagram, svg('0 0 430 168', diagram.title, body));
    }

    function batch(diagram) {
        const nodes = diagram.nodes || [];
        const name = (i) => (nodes[i] && nodes[i].title) || '';
        const sub = (i) => (nodes[i] && nodes[i].sub) || '';
        let slips = '';
        for (let i = 0; i < 7; i += 1) {
            const y = 28 + i * 11;
            const top = i === 6;
            slips += `<rect x="${18 + i}" y="${y}" width="108" height="16" rx="3" fill="${top ? '#1C2A24' : FILL}" stroke="${top ? EMERALD : LINE}" stroke-opacity="${top ? 0.8 : 0.9}"/>`;
        }
        let queue = `<rect x="168" y="70" width="150" height="40" rx="20" fill="${FILL}" stroke="${LINE}"/>`;
        for (let i = 0; i < 6; i += 1) {
            const last = i === 5;
            queue += `<rect x="${180 + i * 22}" y="82" width="14" height="16" rx="2" fill="${last ? EMERALD : FAINT}" fill-opacity="${last ? 0.85 : 0.45}"/>`;
        }
        const workers = [0, 1, 2].map((i) => {
            const x = 352 + i * 34;
            const y = 58 + (i === 1 ? 0 : 10);
            return `<rect x="${x}" y="${y}" width="26" height="52" rx="6" fill="rgba(52,211,153,0.08)" stroke="${EMERALD}"/>
                <path d="M${x + 7} ${y + 28} l4 4 l8 -10" fill="none" stroke="${EMERALD}" stroke-width="1.6" stroke-linecap="round"/>`;
        }).join('');
        const body = `
            ${slips}
            ${label(18, 132, name(0), INK, 13)}
            ${label(18, 150, sub(0), MUTED, 11)}
            ${queue}
            ${label(168, 132, name(1), INK, 13)}
            ${label(168, 150, sub(1), MUTED, 11)}
            ${workers}
            ${label(352, 132, name(2), EMERALD, 13)}
            ${label(352, 150, sub(2), MUTED, 11)}
        `;
        return figure(diagram, svg('0 0 460 164', diagram.title, body));
    }

    function sheet(diagram) {
        const nodes = diagram.nodes || [];
        const name = (i) => (nodes[i] && nodes[i].title) || '';
        const page = (x, y, w, h, resolved) => {
            const fold = 16;
            const lines = [0, 1, 2, 3].map((i) => {
                const ly = y + 36 + i * 18;
                if (!resolved && (i === 1 || i === 3)) {
                    return `<rect x="${x + 16}" y="${ly - 10}" width="54" height="14" rx="4" fill="rgba(52,211,153,0.16)" stroke="${EMERALD}" stroke-opacity="0.7"/>
                        <text x="${x + 24}" y="${ly}" font-size="10" fill="${EMERALD}">{var}</text>`;
                }
                const lw = resolved ? w - 36 : (i === 0 ? w - 40 : w - 70);
                return `<line x1="${x + 16}" y1="${ly}" x2="${x + 16 + lw}" y2="${ly}" stroke="${resolved && i === 1 ? EMERALD : LINE}" stroke-width="${resolved && i === 1 ? 2 : 1.4}" stroke-linecap="round"/>`;
            }).join('');
            return `<path d="M${x} ${y + 8} q0 -8 8 -8 h${w - fold - 8} l${fold} ${fold} v${h - fold - 8} q0 8 -8 8 h${-(w - 16)} q-8 0 -8 -8 z" fill="${FILL}" stroke="${LINE}"/>
                <path d="M${x + w - fold} ${y} v${fold} h${fold}" fill="none" stroke="${LINE}"/>
                ${lines}`;
        };
        const body = `
            ${page(8, 8, 168, 132, false)}
            ${label(8, 158, name(0), INK, 12)}
            ${label(230, 78, name(1), EMERALD, 12, 'middle')}
            <path d="M196 70 H214" stroke="${EMERALD}" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M210 66 l6 4 l-6 4" fill="none" stroke="${EMERALD}" stroke-width="1.4" stroke-linecap="round"/>
            ${page(268, 16, 168, 120, true)}
            ${label(268, 158, name(2), EMERALD, 12)}
        `;
        return figure(diagram, svg('0 0 450 172', diagram.title, body));
    }

    function slab(x, y, w, h, title, sub, accent) {
        const two = Boolean(sub);
        const titleY = two ? y + h / 2 - 2 : y + h / 2 + 5;
        return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${accent ? 'rgba(52,211,153,0.1)' : FILL}" stroke="${accent ? EMERALD : LINE}" stroke-width="${accent ? 1.6 : 1}"/>
            <text x="${x + w / 2}" y="${titleY}" text-anchor="middle" font-size="14" fill="${accent ? EMERALD : INK}">${esc(title)}</text>
            ${two ? `<text x="${x + w / 2}" y="${titleY + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(sub)}</text>` : ''}`;
    }

    function platform(diagram) {
        const nodes = diagram.nodes || [];
        const byId = {};
        nodes.forEach((node) => { byId[node.id] = node; });
        const pick = (id) => byId[id] || { title: id, sub: '' };
        const api = pick('api');
        const ws = pick('ws');
        const eks = pick('eks');
        const sqs = pick('sqs');
        const s3 = pick('s3');
        const mongo = pick('mongo');
        const band = (y, title, sub, accent) => {
            const fill = accent ? 'rgba(52,211,153,0.12)' : 'transparent';
            return `<rect x="10" y="${y}" width="500" height="56" fill="${fill}"/>
                <text x="260" y="${y + 24}" text-anchor="middle" font-size="14" fill="${accent ? EMERALD : INK}">${esc(title)}</text>
                <text x="260" y="${y + 42}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(sub)}</text>`;
        };
        const split = (y, left, right) => `
            <line x1="260" y1="${y}" x2="260" y2="${y + 56}" stroke="${LINE}"/>
            <text x="134" y="${y + 24}" text-anchor="middle" font-size="14" fill="${INK}">${esc(left.title)}</text>
            <text x="134" y="${y + 42}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(left.sub)}</text>
            <text x="386" y="${y + 24}" text-anchor="middle" font-size="14" fill="${INK}">${esc(right.title)}</text>
            <text x="386" y="${y + 42}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(right.sub)}</text>`;
        const body = `
            <rect x="8" y="8" width="504" height="224" rx="18" fill="${FILL}" stroke="${LINE}"/>
            ${split(8, api, ws)}
            <line x1="8" y1="64" x2="512" y2="64" stroke="${LINE}"/>
            ${band(64, eks.title, eks.sub, true)}
            <line x1="8" y1="120" x2="512" y2="120" stroke="${LINE}"/>
            ${split(120, sqs, s3)}
            <line x1="8" y1="176" x2="512" y2="176" stroke="${LINE}"/>
            ${band(176, mongo.title, mongo.sub, false)}
        `;
        return figure(diagram, svg('0 0 520 244', diagram.title, body));
    }

    function render(diagram) {
        if (!diagram || !diagram.type) return '';
        if (diagram.type === 'compare') {
            return diagram.variant === 'threads' ? threads(diagram) : pods(diagram);
        }
        if (diagram.type === 'flow') {
            const batchFlow = (diagram.nodes || []).some((node) => node.title === 'SQS');
            return batchFlow ? batch(diagram) : sheet(diagram);
        }
        if (diagram.type === 'platform') return platform(diagram);
        return '';
    }

    function skillMark(index) {
        const marks = [
            `<svg viewBox="0 0 40 40" class="h-6 w-6" aria-hidden="true"><path d="M12 8 v24 M20 14 v18 M28 6 v26" fill="none" stroke="${EMERALD}" stroke-width="2" stroke-linecap="round"/></svg>`,
            `<svg viewBox="0 0 40 40" class="h-6 w-6" aria-hidden="true"><rect x="8" y="8" width="24" height="8" rx="2" fill="none" stroke="${EMERALD}" stroke-width="1.6"/><rect x="8" y="20" width="24" height="12" rx="2" fill="rgba(52,211,153,0.15)" stroke="${EMERALD}" stroke-width="1.6"/></svg>`,
            `<svg viewBox="0 0 40 40" class="h-6 w-6" aria-hidden="true"><path d="M8 12 h16 M8 20 h24 M8 28 h10" fill="none" stroke="${EMERALD}" stroke-width="2" stroke-linecap="round"/></svg>`
        ];
        return marks[index % marks.length];
    }

    global.ResumeDiagrams = { render, skillMark };
})(window);
