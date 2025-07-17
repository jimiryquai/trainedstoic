# OG Image Component Documentation

## Overview
The OG Image system automatically generates beautiful OpenGraph images for blog posts using Satori and the Trained Stoic branding.

## Files Created
- `/src/components/OGImage.tsx` - React component for OG image layout
- `/src/pages/api/og.ts` - API endpoint for generating PNG images
- `/src/test/components/OGImage.test.tsx` - Component tests
- `/src/test/api/og.test.ts` - API tests

## Features
✅ **1200x630 OG image dimensions** - Perfect for social media  
✅ **Trained Stoic branding** - Includes bird icon and consistent styling  
✅ **Smart text wrapping** - Long titles automatically wrap to multiple lines  
✅ **Author display** - Shows author name with avatar circle  
✅ **Publication date** - Formatted date display  
✅ **Tags display** - Shows up to 3 tags with overflow indicator  
✅ **Responsive typography** - Font sizes adjust based on title length  
✅ **Satori compatibility** - Uses JSX subset supported by Satori  
✅ **Inter font support** - Uses Inter font for consistent typography  

## How It Works

### 1. SEO Component Integration
The SEO component automatically generates OG image URLs for blog posts:

```typescript
// For articles, generates dynamic OG image
if (type === "article" && pageTitle) {
  const ogParams = new URLSearchParams({
    title: pageTitle,
    description: description,
    author: author || "Trained Stoic",
    ...(tags && tags.length > 0 && { tags: tags.join(',') })
  });
  image = `${siteUrl}/api/og.png?${ogParams.toString()}`;
}
```

### 2. API Endpoint
The `/api/og.ts` endpoint:
- Accepts query parameters for title, author, date, description, tags
- Can also accept a `slug` parameter to fetch post data automatically
- Uses Satori to render the React component as SVG
- Converts SVG to PNG using resvg-js
- Returns cached PNG with proper headers

### 3. OG Image Component
The `OGImage.tsx` component:
- Renders a 1200x630 image layout
- Includes Trained Stoic branding
- Handles long titles with smart text wrapping
- Shows author, date, and tags
- Uses consistent color scheme from the site

## Usage Examples

### Manual OG Image Generation
```
https://trainedstoic.com/api/og?title=My Blog Post&author=John Doe&publishedDate=2025-01-17&tags=philosophy,stoicism
```

### From Blog Post Slug
```
https://trainedstoic.com/api/og?slug=my-post-slug
```

### In Blog Post Layout
The OG image is automatically generated when you pass the correct props to the SEO component:

```astro
<SEO
  title={post.title}
  description={post.description}
  type="article"
  publishedDate={post.publishedDate}
  author={post.author}
  tags={post.tags}
/>
```

## Design Specifications

### Layout
- **Dimensions**: 1200x630px
- **Background**: White with subtle gradient
- **Typography**: Inter font family
- **Brand colors**: Matches site theme

### Elements
- **Header**: Bird icon + "Trained Stoic" logo
- **Title**: Large, bold text (responsive sizing)
- **Description**: Secondary text (if provided)
- **Footer**: Author avatar + date + tags

### Typography Scale
- **1 line title**: 72px font size
- **2 line title**: 60px font size  
- **3+ line title**: 48px font size
- **Description**: 24px font size
- **Meta info**: 16-20px font size

## Testing
Run the tests to ensure everything works:

```bash
npm test -- --run src/test/components/OGImage.test.tsx
npm test -- --run src/test/api/og.test.ts
```

## Dependencies
- `satori` - SVG generation from React components
- `@resvg/resvg-js` - SVG to PNG conversion
- `@fontsource/inter` - Inter font files

## Performance
- Images are cached with `Cache-Control: public, max-age=31536000, immutable`
- Font loading is optimized with fallbacks
- Build time: ~1-2 seconds per image
- File size: ~50-100KB per image

## Error Handling
- Graceful fallbacks for missing fonts
- Error responses for invalid requests
- Fallback to default OG image if generation fails

## Future Enhancements
- [ ] Add dark mode support
- [ ] Support for custom backgrounds
- [ ] Featured image overlay option
- [ ] Category-specific styling
- [ ] Performance optimizations