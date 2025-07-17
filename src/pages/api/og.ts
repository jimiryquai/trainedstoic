import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import OGImage from '../../components/OGImage';

// Load Inter font
const getInterFont = async (): Promise<Buffer | null> => {
  try {
    // Try to load Inter font from node_modules or system
    const fontPath = path.join(process.cwd(), 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-400-normal.woff');
    if (fs.existsSync(fontPath)) {
      return fs.readFileSync(fontPath);
    }
    
    // Fallback to system font
    return null;
  } catch (error) {
    console.warn('Could not load Inter font, using fallback');
    return null;
  }
};

const getInterBoldFont = async (): Promise<Buffer | null> => {
  try {
    const fontPath = path.join(process.cwd(), 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-700-normal.woff');
    if (fs.existsSync(fontPath)) {
      return fs.readFileSync(fontPath);
    }
    return null;
  } catch (error) {
    console.warn('Could not load Inter bold font, using fallback');
    return null;
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const title = url.searchParams.get('title');
    const author = url.searchParams.get('author');
    const publishedDate = url.searchParams.get('publishedDate');
    const description = url.searchParams.get('description');
    const tags = url.searchParams.get('tags');

    let ogProps = {
      title: title || 'Trained Stoic',
      author: author || 'Trained Stoic',
      publishedDate: publishedDate || undefined,
      description: description || undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    };

    // If slug is provided, get post data
    if (slug) {
      try {
        const post = await getEntry('posts', slug);
        if (post) {
          ogProps = {
            title: post.data.title,
            author: post.data.author || 'Trained Stoic',
            publishedDate: post.data.publishedDate,
            description: post.data.description,
            tags: post.data.tags || [],
          };
        }
      } catch (error) {
        console.warn(`Could not find post with slug: ${slug}`);
      }
    }

    // Load fonts
    const interFont = await getInterFont();
    const interBoldFont = await getInterBoldFont();

    // Create font array
    const fonts: any[] = [];
    if (interFont) {
      fonts.push({
        name: 'Inter',
        data: interFont.buffer,
        style: 'normal' as const,
        weight: 400,
      });
    }
    if (interBoldFont) {
      fonts.push({
        name: 'Inter',
        data: interBoldFont.buffer,
        style: 'normal' as const,
        weight: 700,
      });
    }

    // Fallback if no fonts loaded
    if (fonts.length === 0) {
      fonts.push({
        name: 'sans-serif',
        data: Buffer.from('').buffer,
        style: 'normal' as const,
        weight: 400,
      });
    }

    // Generate SVG using Satori
    const svg = await satori(
      OGImage(ogProps),
      {
        width: 1200,
        height: 630,
        fonts,
      }
    );

    // Convert SVG to PNG using resvg
    const resvg = new Resvg(svg, {
      background: 'white',
      fitTo: {
        mode: 'width' as const,
        value: 1200,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Return PNG response
    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Return error image or fallback
    return new Response('Error generating OG image', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
};