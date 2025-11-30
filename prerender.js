import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// Only prerender top-level routes to shorten build time
const routesToPrerender = [
  '/',
  '/osshub',
  '/architecture',
  '/stack',
  '/examples',
  '/docs',
];

(async () => {
  console.log(`Starting prerender for ${routesToPrerender.length} routes...`);
  
  // pre-render each route...
  for (const url of routesToPrerender) {
    const { html: appHtml, helmet } = await render(url);

    let html = template.replace(`<!--app-html-->`, appHtml);
    
    // Inject SEO tags
    if (helmet) {
      const helmetHead = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `;
      html = html.replace('<!--head-tags-->', helmetHead);
    }

    const filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`;
    
    // Ensure directory exists
    const dir = path.dirname(toAbsolute(filePath));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(toAbsolute(filePath), html);
    console.log('✓ pre-rendered:', filePath);
  }
  
  console.log(`\n✅ Successfully pre-rendered ${routesToPrerender.length} routes`);
})();
