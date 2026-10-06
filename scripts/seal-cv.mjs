#!/usr/bin/env node
// Seals a résumé JSON for cv.html?v=<id>#<key>.
// Public file: { v, iv, ct } where ct is AES-256-GCM ciphertext with the 16-byte tag appended.
// The key is base64url (no padding) and is never written next to the ciphertext.

import { createCipheriv, randomBytes, webcrypto } from 'node:crypto';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://mauriciobelusso.dev';
const LANGS = new Set(['pt-BR', 'en', 'es', 'fr']);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function arg(name) {
    const index = process.argv.indexOf(name);
    if (index === -1) return null;
    return process.argv[index + 1] ?? null;
}

function hasFlag(name) {
    return process.argv.includes(name);
}

export function base64UrlEncode(bytes) {
    return Buffer.from(bytes).toString('base64url');
}

export async function sealPlaintext(plaintext) {
    const key = randomBytes(32);
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
    const payload = {
        v: 1,
        iv: base64UrlEncode(iv),
        ct: base64UrlEncode(ciphertext)
    };
    const opened = await openPayload(payload, base64UrlEncode(key));
    if (Buffer.compare(Buffer.from(opened), plaintext) !== 0) {
        throw new Error('round-trip do selo falhou');
    }
    return { key: base64UrlEncode(key), payload };
}

export async function openPayload(payload, keyB64) {
    if (!payload || payload.v !== 1 || !payload.iv || !payload.ct) {
        throw new Error('payload inválido');
    }
    const cryptoKey = await webcrypto.subtle.importKey(
        'raw',
        Buffer.from(keyB64, 'base64url'),
        'AES-GCM',
        false,
        ['decrypt']
    );
    const plain = await webcrypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Buffer.from(payload.iv, 'base64url') },
        cryptoKey,
        Buffer.from(payload.ct, 'base64url')
    );
    return Buffer.from(plain);
}

function prepareResume(raw, company, role) {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('o currículo precisa ser um objeto JSON');
    }
    if (!data.personal || typeof data.personal.name !== 'string' || !data.personal.name.trim()) {
        throw new Error('personal.name é obrigatório');
    }
    if (!data.meta || !LANGS.has(data.meta.lang)) {
        throw new Error('meta.lang precisa ser pt-BR, en, es ou fr');
    }
    if (!Array.isArray(data.experience)) {
        throw new Error('experience precisa ser uma lista');
    }
    const existing = data.meta.target && typeof data.meta.target === 'object' ? data.meta.target : {};
    data.meta.target = {
        company: company || existing.company || '',
        role: role || existing.role || '',
        createdAt: new Date().toISOString()
    };
    return data;
}

function appendIndex(indexPath, entry) {
    let index = { entries: [] };
    if (existsSync(indexPath)) {
        const parsed = JSON.parse(readFileSync(indexPath, 'utf8'));
        if (!parsed || !Array.isArray(parsed.entries)) {
            throw new Error(`${indexPath} está inválido`);
        }
        index = parsed;
    }
    index.entries.push(entry);
    writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, { mode: 0o600 });
    chmodSync(indexPath, 0o600);
}

function newId(outDir) {
    for (let attempt = 0; attempt < 5; attempt += 1) {
        const id = randomBytes(16).toString('hex');
        if (!existsSync(join(outDir, `${id}.json`))) return id;
    }
    throw new Error('não foi possível gerar um id livre');
}

export async function sealResumeFile(options) {
    const inputPath = resolve(options.inputPath);
    const outDir = resolve(options.outDir || join(repoRoot, 'v'));
    const origin = (options.origin || ORIGIN).replace(/\/$/, '');
    const company = options.company || '';
    const role = options.role || '';
    const data = prepareResume(readFileSync(inputPath, 'utf8'), company, role);
    const { key, payload } = await sealPlaintext(Buffer.from(JSON.stringify(data), 'utf8'));
    mkdirSync(outDir, { recursive: true });
    const id = newId(outDir);
    const publicPath = join(outDir, `${id}.json`);
    writeFileSync(publicPath, `${JSON.stringify(payload, null, 2)}\n`);
    const url = `${origin}/cv.html?v=${id}#${key}`;
    const entry = {
        id,
        key,
        url,
        company: data.meta.target.company,
        role: data.meta.target.role,
        lang: data.meta.lang,
        createdAt: data.meta.target.createdAt,
        file: publicPath
    };
    if (!options.noIndex) {
        appendIndex(join(outDir, 'index.private.json'), entry);
    }
    return entry;
}

async function main() {
    const inputPath = arg('--in');
    if (!inputPath || inputPath.startsWith('--')) {
        process.stderr.write('uso: node scripts/seal-cv.mjs --in <resume.json> [--company "..."] [--role "..."] [--out-dir v] [--origin https://mauriciobelusso.dev] [--no-index]\n');
        process.exit(1);
    }
    try {
        const entry = await sealResumeFile({
            inputPath,
            company: arg('--company') || '',
            role: arg('--role') || '',
            outDir: arg('--out-dir') || undefined,
            origin: arg('--origin') || undefined,
            noIndex: hasFlag('--no-index')
        });
        process.stdout.write(`${JSON.stringify({
            id: entry.id,
            url: entry.url,
            company: entry.company,
            role: entry.role,
            lang: entry.lang,
            createdAt: entry.createdAt,
            file: entry.file
        })}\n`);
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exit(1);
    }
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
    main();
}
