const fs = require('node:fs');
const path = require('node:path');
const pages = require('../routes.js');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');

// Clean only this script's fixed, generated output directory.
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
for (const name of fs.readdirSync(root)) {
  if (/\.(css|js)$/.test(name)) fs.copyFileSync(path.join(root, name), path.join(output, name));
}

for (const page of pages) {
  const source = page.project ? 'projects.html' : 'personal.html';
  let html = fs.readFileSync(path.join(root, 'templates', source), 'utf8');
  const base = '../'.repeat(page.path.split('/').filter(Boolean).length);
  html = html.replace('<head>', `<head>\n  <base href="${base}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(/href="#([^"]*)"/g, `href="${page.path}#$1"`);
  const directory = path.join(output, page.path);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}

// The site root is an entry point, not an alias for the retired query router.
fs.writeFileSync(path.join(output, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Personal Information</title><meta http-equiv="refresh" content="0;url=personalinformation/">
</head><body><a href="personalinformation/">Personal Information</a></body></html>\n`);
console.log(`Built ${pages.length} pages and the root entry point in dist/`);
