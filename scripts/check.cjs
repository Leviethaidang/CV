const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const pages = require('../routes.js');
const output = path.resolve(__dirname, '../dist');
let references = 0;

function checkReferences(html, base) {
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (!value || value.startsWith('#')) continue;
    const url = new URL(value, base);
    if (url.origin !== base.origin) continue;
    assert(url.pathname.startsWith(base.pathname), `Link escapes site root: ${value}`);
    let file = path.join(output, decodeURIComponent(url.pathname.slice(base.pathname.length)));
    if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
    assert(fs.existsSync(file), `Missing target: ${value}`);
    references++;
  }
}

function element() {
  const classes = new Set();
  return { hidden: true, innerHTML: '', textContent: '', value: '', dataset: {},
    classList: { add: name => classes.add(name), contains: name => classes.has(name), toggle(name, force) { if (force ?? !classes.has(name)) classes.add(name); else classes.delete(name); } },
    addEventListener() {}, setAttribute() {}, focus() {}, querySelector: () => null, querySelectorAll: () => [] };
}

for (const prefix of ['/', '/CV/']) {
  const base = new URL(`https://example.test${prefix}`);
  for (const page of pages) {
    const html = fs.readFileSync(path.join(output, page.path, 'index.html'), 'utf8');
    assert(!html.includes('placeholder.html'), 'Legacy route remains');
    const location = new URL(page.path, base);
    const baseHref = html.match(/<base href="([^"]+)">/)[1];
    assert.equal(new URL(baseHref, location).href, base.href);
    checkReferences(html.replace(/<base[^>]+>/, ''), base);

    const articleNodes = new Map([...html.matchAll(/data-project-page="([^"]+)"/g)].map(m => [m[1], element()]));
    const ids = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(m => [m[1], element()]));
    const projectNodes = ['empire-run', 'shorturl', 'hashop'].map(project => ({ ...element(), dataset: { project } }));
    const callbacks = [];
    const document = {
      currentScript: null, title: '',
      getElementById: id => ids.get(id) || null,
      addEventListener: (event, fn) => { if (event === 'DOMContentLoaded') callbacks.push(fn); },
      querySelectorAll(selector) {
        if (selector === '.project-node') return projectNodes;
        if (selector === '.topics li') return [element(), element()];
        return [];
      },
      querySelector(selector) {
        const key = selector.match(/^\[data-project-page="([^"]+)"\]$/)?.[1];
        if (key) return articleNodes.get(key) || null;
        if (selector === '.project-edge-nav') return page.project ? element() : null;
        if (selector.startsWith('.project-child-menu a[href=')) {
          const href = selector.match(/href="([^"]+)"/)?.[1];
          assert(html.includes(`href="${href}"`), `Active sidebar link missing: ${href}`);
        }
        return null;
      },
    };
    const context = vm.createContext({ document, location, URL, URLSearchParams, console, history: { replaceState() {} } });
    context.window = context;
    for (const script of html.matchAll(/<script src="([^"]+)"><\/script>/g)) {
      document.currentScript = { src: new URL(script[1], base).href };
      vm.runInContext(fs.readFileSync(path.join(output, script[1]), 'utf8'), context, { filename: script[1] });
    }
    callbacks.forEach(fn => fn());
    assert.equal(context.CVRoute.current.path, page.path);
    if (page.project) {
      const visible = [...articleNodes].filter(([, node]) => !node.hidden).map(([key]) => key);
      assert.deepEqual(visible, [page.page], `Incorrect page selection: ${page.path}`);
      const projectPages = pages.filter(p => p.project);
      const index = projectPages.indexOf(page);
      assert.equal(ids.get('project-prev').href, projectPages[index - 1]?.path || 'personalinformation/');
      assert.equal(ids.get('project-next').href, projectPages[index + 1]?.path || 'personalinformation/');
      articleNodes.forEach(node => checkReferences(node.innerHTML, base));
      if (context.HASHOP_CONSOLE_GUIDE) checkReferences(context.HASHOP_CONSOLE_GUIDE.html, base);
    }
  }
}
assert(!fs.existsSync(path.join(output, 'placeholder.html')));
assert(!fs.existsSync(path.join(output, 'templates')));
assert(fs.readFileSync(path.join(output, 'index.html'), 'utf8').includes('url=personalinformation/'));
console.log(`PASS: ${pages.length} routes at / and /CV/, page selection, previous/next links, ${references} local references, no legacy router.`);
