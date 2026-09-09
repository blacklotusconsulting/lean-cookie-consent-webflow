import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { generateSnippet } from '../scripts/generate-snippet.mjs';

const template = readFileSync(new URL('../snippets/head-code.html', import.meta.url), 'utf8');

assert.match(template, /YOUR_SITE_KEY/);
assert.match(template, /https:\/\/api\.leancookieconsent\.com\/embed\.js\?site=/);
assert.match(template, /encodeURIComponent\(siteKey\)/);
assert.match(template, /window\.LeanCookieConsentWebflow/);
assert.doesNotMatch(template, /apiBase|runtimeUrl|endpointUrl|customUrl/);

const generated = generateSnippet('site_webflow_test_123');
assert.match(generated, /var siteKey = "site_webflow_test_123";/);
assert.match(generated, /encodeURIComponent\(siteKey\)/);
assert.match(generated, /document\.head\.appendChild\(script\)/);

const escaped = generateSnippet('site_A-B_1234');
assert.match(escaped, /"site_A-B_1234"/);

assert.throws(() => generateSnippet(''), /Site Key is required/);
assert.throws(() => generateSnippet('short'), /8-128/);
assert.throws(() => generateSnippet('site_bad<script>'), /letters, numbers/);

console.log('Webflow snippet tests passed');
