import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'src/content/docs');

export type DocData = {
  slug: string;
  product: string;
  title: string;
  content: string;
};

export function getDocSlugs(product: string) {
  const productDir = path.join(docsDirectory, product);
  if (!fs.existsSync(productDir)) return [];
  const fileNames = fs.readdirSync(productDir);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export function getDocBySlug(product: string, slug: string): DocData | null {
  const fullPath = path.join(docsDirectory, product, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // If title is missing in frontmatter, extract it from the first markdown heading (# Title)
  let title = data.title;
  if (!title) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1].trim() : slug;
  }

  return {
    slug,
    product,
    title,
    content,
    ...data,
  };
}

export function getAllDocs(product: string): DocData[] {
  const slugs = getDocSlugs(product);
  const docs = slugs
    .map((slug) => getDocBySlug(product, slug))
    .filter((doc): doc is DocData => doc !== null);
  
  // Sort docs alphabetically by slug to respect prefixes like 01-, 02-
  return docs.sort((a, b) => {
    // If README is present, it usually goes first
    if (a.slug.toLowerCase() === 'readme') return -1;
    if (b.slug.toLowerCase() === 'readme') return 1;
    return a.slug.localeCompare(b.slug);
  });
}
