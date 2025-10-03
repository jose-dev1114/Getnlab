import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '../build/client');

// Find the entry client file
const assetsDir = path.join(clientDir, 'assets');
let entryFile = '';
let cssFiles = [];

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  entryFile = files.find(f => f.startsWith('entry.client-') && f.endsWith('.js'));
  cssFiles = files.filter(f => f.endsWith('.css'));
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>nLab - Build Electronics, Change the World</title>
    <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.cdnfonts.com/css/titling-gothic-fb-compressed" rel="stylesheet" />
    ${cssFiles.map(f => `<link rel="stylesheet" href="/assets/${f}" />`).join('\n    ')}
  </head>
  <body>
    <div id="root"></div>
    ${entryFile ? `<script type="module" src="/assets/${entryFile}"></script>` : ''}
  </body>
</html>`;

fs.writeFileSync(path.join(clientDir, 'index.html'), html);
console.log('✓ Generated index.html');

