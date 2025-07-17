import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Trained Stoic';
  const description = url.searchParams.get('description') || 'Timeless wisdom for modern resilience';
  const author = url.searchParams.get('author') || 'Trained Stoic';
  const tags = url.searchParams.get('tags')?.split(',') || [];

  // For now, we'll create a simple SVG-based OG image
  // In a production environment, you might want to use a library like @vercel/og
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="1200" height="630" fill="#1f2937"/>
      
      <!-- Gradient overlay -->
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#1e40af;stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad1)"/>
      
      <!-- Content area -->
      <rect x="80" y="80" width="1040" height="470" fill="none" stroke="#374151" stroke-width="2" rx="16"/>
      
      <!-- Title -->
      <text x="600" y="180" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="bold" fill="#f9fafb">
        <tspan x="600" dy="0">${title.substring(0, 50)}</tspan>
        ${title.length > 50 ? `<tspan x="600" dy="60">${title.substring(50, 100)}</tspan>` : ''}
      </text>
      
      <!-- Description -->
      <text x="600" y="320" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#d1d5db">
        <tspan x="600" dy="0">${description.substring(0, 80)}</tspan>
        ${description.length > 80 ? `<tspan x="600" dy="35">${description.substring(80, 160)}</tspan>` : ''}
      </text>
      
      <!-- Author -->
      <text x="600" y="420" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#9ca3af">
        By ${author}
      </text>
      
      <!-- Tags -->
      ${tags.slice(0, 3).map((tag, index) => `
        <rect x="${520 + index * 120}" y="460" width="100" height="30" fill="#3b82f6" rx="15"/>
        <text x="${570 + index * 120}" y="480" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#ffffff">
          ${tag}
        </text>
      `).join('')}
      
      <!-- Logo/Brand -->
      <text x="600" y="580" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="#6b7280">
        trainedstoic.com
      </text>
    </svg>
  `;

  // Convert SVG to PNG (simple approach for now)
  // In production, you'd want to use a proper image generation library
  const response = new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });

  return response;
};