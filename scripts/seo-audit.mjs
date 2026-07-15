import { chromium } from 'playwright';
import fs from 'fs';

const routes = [
  { path: '/en', name: 'English Home' },
  { path: '/en/about', name: 'English About' },
  { path: '/en/work', name: 'English Work' },
  { path: '/en/contact', name: 'English Contact' },
  { path: '/en/tools', name: 'English Tools' },
  { path: '/ar', name: 'Arabic Home' },
  { path: '/ar/about', name: 'Arabic About' },
  { path: '/ar/work', name: 'Arabic Work' },
  { path: '/ar/contact', name: 'Arabic Contact' },
  { path: '/ar/tools', name: 'Arabic Tools' },
];

async function runSeoAudit() {
  console.log('Starting Comprehensive SEO & Technical Audit using Playwright...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Determine active port
  let baseUrl = 'http://localhost:3000';
  try {
    const res = await page.goto('http://localhost:3000/en', { waitUntil: 'domcontentloaded', timeout: 5000 });
    if (!res || !res.ok()) throw new Error('Not ok');
  } catch (e) {
    try {
      console.log('Port 3000 check failed or timeout, trying localhost:3001...');
      const res2 = await page.goto('http://localhost:3001/en', { waitUntil: 'domcontentloaded', timeout: 5000 });
      if (res2 && res2.ok()) {
        baseUrl = 'http://localhost:3001';
      }
    } catch (e2) {
      console.error('Could not connect to localhost:3000 or localhost:3001. Make sure Next.js dev server is running.');
      await browser.close();
      process.exit(1);
    }
  }

  console.log(`Connected to base URL: ${baseUrl}\n`);

  const results = [];

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    console.log(`Auditing [${route.name}] -> ${url}`);
    
    let httpStatus = 0;
    const startTime = Date.now();
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      httpStatus = response ? response.status() : 0;
    } catch (err) {
      console.error(`Failed to navigate to ${url}: ${err.message}`);
      continue;
    }
    const loadTimeMs = Date.now() - startTime;

    // Evaluate DOM properties
    const auditData = await page.evaluate(() => {
      const getMeta = (name) => {
        const el = document.querySelector(`meta[name="${name}" i], meta[property="${name}" i]`);
        return el ? el.getAttribute('content') || '' : null;
      };

      const title = document.title || null;
      const description = getMeta('description');
      const keywords = getMeta('keywords');
      const viewport = getMeta('viewport');
      const robots = getMeta('robots');

      // Open Graph & Social
      const ogTitle = getMeta('og:title');
      const ogDesc = getMeta('og:description');
      const ogType = getMeta('og:type');
      const ogImage = getMeta('og:image');
      const twitterCard = getMeta('twitter:card');

      // Canonical & Hreflang
      const canonicalEl = document.querySelector('link[rel="canonical" i]');
      const canonical = canonicalEl ? canonicalEl.getAttribute('href') : null;
      const hreflangs = Array.from(document.querySelectorAll('link[rel="alternate" i][hreflang]')).map(el => ({
        hreflang: el.getAttribute('hreflang'),
        href: el.getAttribute('href')
      }));

      // Headings
      const h1s = Array.from(document.querySelectorAll('h1')).map(el => el.innerText.trim());
      const h2s = Array.from(document.querySelectorAll('h2')).map(el => el.innerText.trim());
      const h3s = Array.from(document.querySelectorAll('h3')).map(el => el.innerText.trim());

      // Semantic Structure
      const hasMain = !!document.querySelector('main');
      const hasHeader = !!document.querySelector('header');
      const hasFooter = !!document.querySelector('footer');
      const hasNav = !!document.querySelector('nav');

      // Images & Alt attributes
      const images = Array.from(document.querySelectorAll('img'));
      const totalImages = images.length;
      const missingAltImages = images.filter(img => {
        const alt = img.getAttribute('alt');
        const role = img.getAttribute('role');
        return alt === null && role !== 'presentation';
      }).length;
      const emptyAltImages = images.filter(img => {
        const alt = img.getAttribute('alt');
        const role = img.getAttribute('role');
        return alt !== null && alt.trim() === '' && role !== 'presentation';
      }).length;

      // Links & accessibility
      const links = Array.from(document.querySelectorAll('a'));
      const totalLinks = links.length;
      const emptyLinks = links.filter(a => {
        const text = (a.innerText || '').trim();
        const ariaLabel = a.getAttribute('aria-label');
        const titleAttr = a.getAttribute('title');
        const hasImgWithAlt = Array.from(a.querySelectorAll('img')).some(i => (i.getAttribute('alt') || '').trim() !== '');
        return !text && !ariaLabel && !titleAttr && !hasImgWithAlt;
      }).length;

      // Html lang & dir
      const htmlLang = document.documentElement.getAttribute('lang') || null;
      const htmlDir = document.documentElement.getAttribute('dir') || null;

      return {
        title,
        description,
        keywords,
        viewport,
        robots,
        ogTitle,
        ogDesc,
        ogType,
        ogImage,
        twitterCard,
        canonical,
        hreflangs,
        headings: { h1Count: h1s.length, h1Texts: h1s, h2Count: h2s.length, h3Count: h3s.length },
        semantics: { hasMain, hasHeader, hasFooter, hasNav },
        images: { total: totalImages, missingAlt: missingAltImages, emptyAlt: emptyAltImages },
        links: { total: totalLinks, empty: emptyLinks },
        htmlAttr: { lang: htmlLang, dir: htmlDir }
      };
    });

    // Score calculation (out of 100)
    let score = 0;
    const breakdown = [];

    // 1. Title Tag (Max 20 pts)
    if (auditData.title) {
      const len = auditData.title.length;
      if (len >= 20 && len <= 70) {
        score += 20;
        breakdown.push({ item: 'Title Tag', status: 'Pass', score: 20, max: 20, note: `Optimal length (${len} chars): "${auditData.title}"` });
      } else if (len > 0) {
        score += 12;
        breakdown.push({ item: 'Title Tag', status: 'Warning', score: 12, max: 20, note: `Title length (${len} chars) outside optimal 20-70 range: "${auditData.title}"` });
      }
    } else {
      breakdown.push({ item: 'Title Tag', status: 'Fail', score: 0, max: 20, note: 'Missing <title> tag' });
    }

    // 2. Meta Description (Max 20 pts)
    if (auditData.description) {
      const len = auditData.description.length;
      if (len >= 70 && len <= 170) {
        score += 20;
        breakdown.push({ item: 'Meta Description', status: 'Pass', score: 20, max: 20, note: `Optimal length (${len} chars)` });
      } else if (len > 0) {
        score += 12;
        breakdown.push({ item: 'Meta Description', status: 'Warning', score: 12, max: 20, note: `Description length (${len} chars) outside optimal 70-170 range` });
      }
    } else {
      breakdown.push({ item: 'Meta Description', status: 'Fail', score: 0, max: 20, note: 'Missing meta description tag' });
    }

    // 3. Heading Structure (Max 15 pts)
    if (auditData.headings.h1Count === 1) {
      score += 15;
      breakdown.push({ item: 'H1 Tag Hierarchy', status: 'Pass', score: 15, max: 15, note: `Exactly 1 <H1> tag found: "${auditData.headings.h1Texts[0].substring(0, 50)}..."` });
    } else if (auditData.headings.h1Count === 0) {
      breakdown.push({ item: 'H1 Tag Hierarchy', status: 'Fail', score: 0, max: 15, note: 'No <H1> tag found on page' });
    } else {
      score += 7;
      breakdown.push({ item: 'H1 Tag Hierarchy', status: 'Warning', score: 7, max: 15, note: `Multiple H1 tags (${auditData.headings.h1Count}) found. Should have exactly 1 per page.` });
    }

    // 4. Canonical & Internationalization (Max 10 pts)
    let intlScore = 0;
    const intlNotes = [];
    if (auditData.canonical) {
      intlScore += 5;
      intlNotes.push(`Canonical URL present: ${auditData.canonical}`);
    } else {
      intlNotes.push('Canonical tag missing');
    }
    if (auditData.hreflangs.length > 0) {
      intlScore += 5;
      intlNotes.push(`Hreflang tags configured (${auditData.hreflangs.length} locales)`);
    } else {
      intlNotes.push('Hreflang tags missing');
    }
    score += intlScore;
    breakdown.push({ item: 'Canonical & Hreflangs', status: intlScore === 10 ? 'Pass' : intlScore > 0 ? 'Warning' : 'Fail', score: intlScore, max: 10, note: intlNotes.join(' | ') });

    // 5. Open Graph & Social Cards (Max 10 pts)
    let ogScore = 0;
    const ogNotes = [];
    if (auditData.ogTitle && auditData.ogDesc) { ogScore += 6; ogNotes.push('OG Title & Description set'); }
    else { ogNotes.push('Missing OG Title or Desc'); }
    if (auditData.ogImage) { ogScore += 4; ogNotes.push('OG Image present'); }
    else { ogNotes.push('Missing OG Image'); }
    score += ogScore;
    breakdown.push({ item: 'Open Graph & Social', status: ogScore === 10 ? 'Pass' : ogScore > 0 ? 'Warning' : 'Fail', score: ogScore, max: 10, note: ogNotes.join(' | ') });

    // 6. Semantic HTML & Mobile Viewport (Max 15 pts)
    let semScore = 0;
    if (auditData.viewport && auditData.viewport.includes('width=device-width')) semScore += 5;
    if (auditData.semantics.hasMain && auditData.semantics.hasHeader && auditData.semantics.hasFooter) semScore += 5;
    if (auditData.htmlAttr.lang && auditData.htmlAttr.dir) semScore += 5;
    score += semScore;
    breakdown.push({ item: 'Semantic Structure & Viewport', status: semScore === 15 ? 'Pass' : semScore >= 10 ? 'Warning' : 'Fail', score: semScore, max: 15, note: `Viewport: ${!!auditData.viewport}, <main/header/footer>: ${auditData.semantics.hasMain}/${auditData.semantics.hasHeader}/${auditData.semantics.hasFooter}, lang/dir: ${auditData.htmlAttr.lang}/${auditData.htmlAttr.dir}` });

    // 7. Image & Link Accessibility (Max 10 pts)
    let accScore = 10;
    const accNotes = [];
    if (auditData.images.missingAlt > 0) {
      accScore -= Math.min(5, auditData.images.missingAlt * 2);
      accNotes.push(`${auditData.images.missingAlt} images missing alt attr`);
    } else {
      accNotes.push('All images have alt attributes');
    }
    if (auditData.links.empty > 0) {
      accScore -= Math.min(5, auditData.links.empty * 2);
      accNotes.push(`${auditData.links.empty} links without text/aria-label`);
    } else {
      accNotes.push('All links have accessible names');
    }
    accScore = Math.max(0, accScore);
    score += accScore;
    breakdown.push({ item: 'Accessibility & Alt Text', status: accScore === 10 ? 'Pass' : accScore >= 5 ? 'Warning' : 'Fail', score: accScore, max: 10, note: accNotes.join(' | ') });

    results.push({
      route: route.name,
      path: route.path,
      httpStatus,
      loadTimeMs,
      totalScore: score,
      breakdown,
      data: auditData
    });
  }

  await browser.close();

  // Save detailed JSON output for report generation
  fs.writeFileSync('scripts/seo-audit-results.json', JSON.stringify(results, null, 2));
  console.log('\nAudit complete! Results saved to scripts/seo-audit-results.json');
}

runSeoAudit();
