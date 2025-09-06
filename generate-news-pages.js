import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const newsMdPath = path.resolve('public/news.md');
const newsOutputDir = path.resolve('public/news');

// make sure output folder exists
if (!fs.existsSync(newsOutputDir)) {
  fs.mkdirSync(newsOutputDir, { recursive: true });
}

const raw = fs.readFileSync(newsMdPath, 'utf-8');

// parse frontmatter and posts
const postRegex = /(^|\n)---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*?)(?=\n---\s*\n|$)/g;

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
}

let match;
const posts = [];
while ((match = postRegex.exec(raw)) !== null) {
  const fmRaw = match[2].trim();
  const bodyMd = match[3].trim();
  const meta = {};
  fmRaw.split(/\r?\n/).forEach(line => {
    if (!line.trim()) return;
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    val = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    meta[key] = val;
  });

  // fallback slug from title if not present
  meta.slug = meta.slug || (meta.title ? slugify(meta.title) : 'article-' + (posts.length + 1));
  posts.push({ meta, bodyMd });
}

// generate each article page
posts.forEach(({ meta, bodyMd }) => {
  // make relative html links point to root-level
  const fixedBodyMd = bodyMd.replace(/\]\((?!https?:\/\/)([^)]+\.html)\)/g, (m, link) => {
    if (link.startsWith('../') || link.startsWith('/')) return m; // already correct
    return m.replace(link, '../' + link); // prepend ../ for article pages
  });

  const htmlContent = marked.parse(fixedBodyMd);

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${meta.title || 'Article'} (article) — georges</title>

  <link rel="stylesheet" href="../styles.css" />
  <link rel="stylesheet" href="../blobs.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">


  <style>
    article {
      margin: 0;
      color: #f5f5f5;
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      padding: 40px 24px;
      padding-top: 60px;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }
    h1 {
      font-weight: 800;
      font-size: 2.4rem;
      margin-bottom: 8px;
    }
    .news-date {
      font-size: 14px;
      color: #aaa;
      margin-bottom: 24px;
    }
    img {
      max-width: 100%;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.6);
      margin-bottom: 32px;
      object-fit: cover;
    }
    .content :where(p, ul, ol, blockquote, pre) {
      margin-bottom: 1.2em;
    }
    .back-link {
      display: inline-block;
      margin-top: 48px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
    }
    @media (max-width: 600px) {
      article {
        padding-top: 100px;
      }
    }
  </style>
</head>
<body>
<iframe style="position: fixed !important; z-index: -500 !important; border: 0 !important; width: 100% !important; height: 100% !important; opacity: 40%" src="../grad.html"></iframe>
  <header class="site-header">
    <nav class="nav">
      <a href="../index.html" class="logo">georges</a>
      <div class="nav-links">
        <a href="../videos.html">watch</a>
        <a href="../listen.html">listen</a>
        <a href="../news.html">news</a>
        <a href="../index.html#contact">contact</a>
      </div>
    </nav>
  </header>

  <article>
    <h1>${meta.title || ''}</h1>
    ${meta.date ? `<div class="news-date">${meta.date}</div>` : ''}
    ${meta.image ? `<img src="../${meta.image}" alt="${meta.title || ''}" onerror="this.style.display='none'">` : ''}
    <div class="content">${htmlContent}</div>
    <a href="../news.html#${meta.slug}" class="back-link">&larr; back to news</a>
  </article>
</body>
</html>`;

  const outPath = path.join(newsOutputDir, `${meta.slug}.html`);
  fs.writeFileSync(outPath, html);
  console.log(`generated ${outPath}`);
});
