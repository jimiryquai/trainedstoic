import type { APIRoute } from 'astro';
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../../keystatic.config";
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Keystatic reader
const reader = createReader(process.cwd(), keystaticConfig);

// Load font data
let fontData: ArrayBuffer;
try {
  const fontPath = join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
  fontData = readFileSync(fontPath);
} catch {
  // Use a minimal font if Inter is not available
  fontData = new ArrayBuffer(0);
}

// OG Image dimensions
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Generate OG image element for Satori
function generateOGImageElement(post: any): any {
  const title = post.title || 'Trained Stoic';
  const description = post.description || 'Ancient wisdom meets modern challenges';
  const author = post.author || 'Trained Stoic';
  const publishedDate = post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  const tags = post.tags?.slice(0, 3) || [];

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: OG_WIDTH,
        height: OG_HEIGHT,
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      },
      children: [
        // Background pattern
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            },
          },
        },
        // Header
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '40px 60px 20px',
              position: 'relative',
              zIndex: 1,
            },
            children: [
              // Logo and title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: 40,
                          height: 40,
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                        },
                        children: '📚',
                      },
                    },
                    'Trained Stoic',
                  ],
                },
              },
              // Date
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 18,
                    color: '#cbd5e1',
                    fontWeight: 500,
                  },
                  children: publishedDate,
                },
              },
            ],
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 60px',
              position: 'relative',
              zIndex: 1,
            },
            children: [
              // Title
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: 56,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    margin: '0 0 24px 0',
                    color: '#f1f5f9',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    maxWidth: 900,
                  },
                  children: title,
                },
              },
              // Description
              {
                type: 'p',
                props: {
                  style: {
                    fontSize: 24,
                    lineHeight: 1.4,
                    margin: '0 0 32px 0',
                    color: '#e2e8f0',
                    maxWidth: 800,
                    fontWeight: 400,
                  },
                  children: description,
                },
              },
              // Tags
              ...(tags.length > 0 ? [{
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    gap: 12,
                    marginBottom: 24,
                  },
                  children: tags.map((tag: string) => ({
                    type: 'div',
                    props: {
                      style: {
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#93c5fd',
                        padding: '8px 16px',
                        borderRadius: 20,
                        fontSize: 16,
                        fontWeight: 500,
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      },
                      children: tag,
                    },
                  })),
                },
              }] : []),
            ],
          },
        },
        // Footer
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 60px 40px',
              position: 'relative',
              zIndex: 1,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 20,
                    color: '#94a3b8',
                    fontWeight: 500,
                  },
                  children: `By ${author}`,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 18,
                    color: '#64748b',
                    fontStyle: 'italic',
                  },
                  children: 'Ancient wisdom meets modern challenges',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;
    
    if (!slug) {
      return new Response('Slug parameter is required', { status: 400 });
    }

    // Get the blog post data
    const post = await reader.collections.posts.read(slug);
    
    if (!post) {
      // Create a generic OG image for non-existent posts
      const genericPost = {
        title: 'Page Not Found',
        description: 'The requested blog post could not be found.',
        author: 'Trained Stoic',
        publishedDate: new Date().toISOString(),
        tags: ['404']
      };
      
      const element = generateOGImageElement(genericPost);
      const svg = await satori(element, {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts: fontData.byteLength > 0 ? [{
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal',
        }] : [{
          name: 'sans-serif',
          data: new ArrayBuffer(0),
          weight: 400,
          style: 'normal',
        }],
      });
      
      const resvg = new Resvg(svg);
      
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      
      return new Response(pngBuffer, {
        status: 404,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Generate the OG image using Satori
    const element = generateOGImageElement(post);
    const svg = await satori(element, {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: fontData.byteLength > 0 ? [{
        name: 'Inter',
        data: fontData,
        weight: 400,
        style: 'normal',
      }] : [{
        name: 'sans-serif',
        data: new ArrayBuffer(0),
        weight: 400,
        style: 'normal',
      }],
    });

    // Convert SVG to PNG using resvg
    const resvg = new Resvg(svg);
    
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Store generation info in memory
    console.log(`Generated OG image for blog post: ${slug}`);

    return new Response(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000',
      },
    });

  } catch (error) {
    console.error('OG Image generation error:', error);
    
    // Return a fallback error image
    try {
      const errorPost = {
        title: 'Image Generation Error',
        description: 'An error occurred while generating the OG image.',
        author: 'Trained Stoic',
        publishedDate: new Date().toISOString(),
        tags: ['Error']
      };
      
      const element = generateOGImageElement(errorPost);
      const svg = await satori(element, {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts: fontData.byteLength > 0 ? [{
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal',
        }] : [{
          name: 'sans-serif',
          data: new ArrayBuffer(0),
          weight: 400,
          style: 'normal',
        }],
      });
      
      const resvg = new Resvg(svg);
      
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      
      return new Response(pngBuffer, {
        status: 500,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=300', // Cache errors for 5 minutes
        },
      });
      
    } catch (fallbackError) {
      console.error('Fallback OG image generation also failed:', fallbackError);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};