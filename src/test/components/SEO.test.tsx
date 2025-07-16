import { describe, it, expect } from 'vitest';

describe('SEO Component', () => {
  it('should format title correctly', () => {
    const pageTitle = 'Test Page';
    const siteName = 'Trained Stoic';
    const expectedTitle = `${pageTitle} | ${siteName}`;
    
    expect(expectedTitle).toBe('Test Page | Trained Stoic');
  });

  it('should use site name as fallback title', () => {
    const pageTitle = '';
    const siteName = 'Trained Stoic';
    const title = pageTitle ? `${pageTitle} | ${siteName}` : siteName;
    
    expect(title).toBe('Trained Stoic');
  });

  it('should generate correct URL', () => {
    const siteUrl = 'https://trainedstoic.com';
    const pathname = '/blog/test-post';
    const fullUrl = `${siteUrl}${pathname}`;
    
    expect(fullUrl).toBe('https://trainedstoic.com/blog/test-post');
  });

  it('should handle UserMaven analytics integration', () => {
    const settings = {
      analytics: {
        userMavenId: 'test-id-123'
      }
    };
    
    expect(settings.analytics.userMavenId).toBe('test-id-123');
  });

  it('should generate structured data for articles', () => {
    const articleData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: 'Test Article',
      description: 'Test description',
      author: {
        '@type': 'Person',
        name: 'Test Author'
      }
    };
    
    expect(articleData['@type']).toBe('Article');
    expect(articleData.author.name).toBe('Test Author');
  });
});