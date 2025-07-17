import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  let posts: any[] = [];
  let pages: any[] = [];
  
  try {
    posts = await getCollection('posts');
    pages = await getCollection('pages');
    console.log('Posts found:', posts.length);
    console.log('Pages found:', pages.length);
  } catch (error) {
    console.error('Error fetching collections:', error);
  }
  
  // Use fallback URL if site is not configured
  const siteUrl = site || 'https://trainedstoic.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}blog/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}about/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${siteUrl}blog/${post.slug}/</loc>
    <lastmod>${post.data.publishedDate ? new Date(post.data.publishedDate).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${pages.map(page => `
  <url>
    <loc>${siteUrl}${page.slug}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};