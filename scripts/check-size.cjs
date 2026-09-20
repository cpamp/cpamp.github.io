const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { gzipSync } = require('node:zlib');

// Keep the entire homepage below a conservative 14 kB, even without compression.
// This is a transfer-size budget.
const page = readFileSync(join(__dirname, '..', 'index.html'));
const limit = 14_000;
console.log(`Homepage: ${page.length} bytes; ${gzipSync(page).length} bytes gzipped; budget < ${limit} bytes.`);
if (page.length >= limit) {
    console.error('Homepage exceeds its single-file size budget.');
    process.exitCode = 1;
}
