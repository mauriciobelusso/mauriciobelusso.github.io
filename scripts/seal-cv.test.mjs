import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { openPayload, sealResumeFile } from './seal-cv.mjs';

const resume = {
    meta: { lang: 'pt-BR' },
    personal: {
        name: 'Mauricio Belusso',
        title: 'Staff Backend Engineer',
        summary: 'Resumo de teste.'
    },
    experience: [],
    ui: { cvTitleSuffix: 'Currículo' }
};

test('selo abre com Web Crypto e a chave não vai no arquivo público', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'seal-cv-'));
    const inputPath = join(dir, 'resume.json');
    const outDir = join(dir, 'v');
    try {
        const { writeFileSync } = await import('node:fs');
        writeFileSync(inputPath, JSON.stringify(resume));
        const entry = await sealResumeFile({
            inputPath,
            company: 'Acme',
            role: 'Staff Engineer',
            outDir,
            origin: 'https://mauriciobelusso.dev',
            noIndex: false
        });

        assert.match(entry.id, /^[a-f0-9]{32}$/);
        assert.equal(entry.url, `https://mauriciobelusso.dev/cv.html?v=${entry.id}#${entry.key}`);
        const payload = JSON.parse(readFileSync(join(outDir, `${entry.id}.json`), 'utf8'));
        assert.deepEqual(Object.keys(payload).sort(), ['ct', 'iv', 'v']);
        assert.equal(JSON.stringify(payload).includes(entry.key), false);

        const opened = JSON.parse((await openPayload(payload, entry.key)).toString('utf8'));
        assert.equal(opened.personal.name, 'Mauricio Belusso');
        assert.equal(opened.meta.target.company, 'Acme');
        assert.equal(opened.meta.target.role, 'Staff Engineer');
        assert.equal(opened.meta.lang, 'pt-BR');

        const index = JSON.parse(readFileSync(join(outDir, 'index.private.json'), 'utf8'));
        assert.equal(index.entries.length, 1);
        assert.equal(index.entries[0].key, entry.key);

        const badKey = `${entry.key.slice(0, 8)}${entry.key[8] === 'A' ? 'B' : 'A'}${entry.key.slice(9)}`;
        await assert.rejects(() => openPayload(payload, badKey));
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
});
