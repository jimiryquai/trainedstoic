# Satori OG Image Generation Architecture for SSR

## Current System Analysis

### Existing Setup
- **Astro Configuration**: SSR mode with Netlify adapter
- **Content Management**: Keystatic CMS with MDX blog posts
- **Blog Structure**: `/blog/[slug]` with dynamic content loading
- **React Integration**: Available for component-based OG image generation
- **Content Schema**: Title, description, publishedDate, author, image, tags

### Key Differences from Skyfall SSG Approach

#### SSG vs SSR Considerations
1. **Build Time vs Runtime**: SSG generates images at build time, SSR generates on-demand
2. **Performance**: SSR requires caching strategy, SSG has pre-built images
3. **Dynamic Content**: SSR can handle real-time content updates, SSG requires rebuilds
4. **Server Resources**: SSR uses runtime server resources, SSG uses build-time resources

## Proposed Architecture

### 1. API Route Structure
```
src/pages/api/og/
└── [slug].png.ts           # Dynamic OG image generation with inline component
```
Actual implementation uses a single API route with inline JSX component for simplicity.

### 2. Dependencies Required
```json
{
  "dependencies": {
    "satori": "^0.10.9",
    "@resvg/resvg-js": "^2.4.1",
    "@fontsource/inter": "^5.0.8"
  }
}
```
Note: We use @resvg/resvg-js instead of Sharp for SVG to PNG conversion, as it's better suited for Satori output.

### 3. Core Implementation Strategy

#### A. Dynamic API Route (`src/pages/api/og/[slug].png.ts`)
- Accept slug parameter from URL
- Load post data using Keystatic reader
- Generate SVG using Satori with inline JSX component
- Convert to PNG using @resvg/resvg-js
- Implement aggressive caching headers (1 year for immutable images)

#### B. OG Image Template (Inline JSX Function)
- Inline JSX generation function within API route
- Uses post metadata (title, author, date, tags)
- Fixed 1200x630 dimensions with responsive font sizing
- Trained Stoic branding with gradient backgrounds and proper typography

#### C. Caching Strategy
- **Browser Caching**: Set Cache-Control headers (1 year for immutable images)
- **CDN Caching**: Leverage Netlify edge caching with CDN-Cache-Control headers
- **Error Caching**: 5 minutes cache for errors to prevent retry storms

### 4. Integration Points

#### A. Blog Post Integration
- Update `[slug].astro` to include OG image meta tag
- Generate OG URL: `/api/og/${slug}.png`
- Fallback to default image if generation fails

#### B. SEO Component Updates
- Modify `SEO.astro` to automatically use generated OG images
- Implement fallback logic for missing images
- Add proper meta tags for social sharing

### 5. Performance Considerations

#### A. Image Generation Optimization
- **Font Loading**: Embed fonts in Satori config
- **Image Optimization**: Use Sharp for efficient PNG conversion
- **Memory Management**: Clean up resources after generation

#### B. Caching Strategy
- **HTTP Headers**: Set appropriate cache headers
- **Edge Caching**: Leverage Netlify Functions edge caching
- **Conditional Generation**: Only regenerate when content changes

### 6. Error Handling & Fallbacks

#### A. Error Scenarios
- Invalid slug parameter
- Missing post data
- Satori generation failure
- Sharp conversion issues

#### B. Fallback Strategy
- Default OG image for missing content
- Graceful degradation to static images
- Error logging for debugging

### 7. Development Workflow

#### A. Local Development
- Netlify Dev for testing API routes
- Hot reload for template changes
- Debug mode for image generation

#### B. Production Deployment
- Netlify Functions for API routes
- CDN optimization for image delivery
- Performance monitoring

## Implementation Benefits

### SSR-Specific Advantages
1. **Dynamic Content**: Real-time OG images for updated posts
2. **Personalization**: Potential for user-specific OG images
3. **A/B Testing**: Dynamic template variations
4. **Analytics**: Track OG image performance

### Performance Optimizations
1. **On-Demand Generation**: Only generate when requested
2. **Intelligent Caching**: Multi-layer caching strategy
3. **Resource Efficiency**: Server-side optimization
4. **Scalability**: Horizontal scaling with serverless functions

## Technical Implementation Details

### Font Handling
```typescript
// Load Inter font from @fontsource/inter package
const fontPath = join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
const fontData = readFileSync(fontPath);
```

### Image Generation Pipeline
```typescript
// Satori SVG generation → @resvg/resvg-js PNG conversion → HTTP response
const svg = await satori(generateOGImageElement(post), {
  width: 1200,
  height: 630,
  fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }]
});
const resvg = new Resvg(svg);
const pngData = resvg.render();
const pngBuffer = pngData.asPng();
```

### Cache Headers
```typescript
// Aggressive caching for immutable images
return new Response(pngBuffer, {
  headers: {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=31536000, immutable',
    'CDN-Cache-Control': 'public, max-age=31536000',
    'Vercel-CDN-Cache-Control': 'public, max-age=31536000',
  }
});
```

## Migration Strategy

### Implementation Status: ✅ COMPLETED

#### ✅ Phase 1: Core Implementation
1. ✅ Installed dependencies (satori, @resvg/resvg-js, @fontsource/inter)
2. ✅ Created API route `/src/pages/api/og/[slug].png.ts`
3. ✅ Implemented OG template with Trained Stoic branding
4. ✅ Tested with blog posts (working at http://127.0.0.1:4321/api/og/welcome-to-trained-stoic.png)

#### ✅ Phase 2: Integration
1. ✅ Updated SEO component with dynamic OG image support
2. ✅ Modified blog post templates to pass slug parameter
3. ✅ Added comprehensive error handling with fallback images
4. ✅ Implemented aggressive caching (1 year for immutable images)

#### 🎯 Phase 3: Production Ready
The implementation is complete and production-ready with:
- Dynamic OG image generation for all blog posts
- Proper fallback handling for errors
- Aggressive caching for performance
- Social media validation ready

## Security Considerations

### Input Validation
- Sanitize slug parameters
- Validate post data
- Prevent injection attacks

### Resource Limits
- Memory usage limits
- Generation timeout limits
- Rate limiting for API routes

## Monitoring & Analytics

### Performance Metrics
- Image generation time
- Cache hit rates
- Error rates
- Memory usage

### Business Metrics
- Social sharing rates
- Click-through rates
- SEO performance impact

This architecture provides a robust, scalable solution for dynamic OG image generation in an SSR environment while maintaining performance and providing rich social sharing experiences.