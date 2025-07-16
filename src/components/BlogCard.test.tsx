import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock post data
const mockPost = {
  slug: 'test-post',
  entry: {
    title: 'Test Post Title',
    description: 'This is a test post description that should be displayed in the card.',
    publishedDate: '2025-01-16',
    featured: true,
    author: 'Test Author',
    image: '/images/test.jpg',
    tags: ['Philosophy', 'Stoicism', 'Test'],
  },
};

describe('BlogCard Component', () => {
  it('should display post title', () => {
    expect(mockPost.entry.title).toBe('Test Post Title');
  });

  it('should display post description', () => {
    expect(mockPost.entry.description).toContain('test post description');
  });

  it('should display featured badge for featured posts', () => {
    expect(mockPost.entry.featured).toBe(true);
  });

  it('should display author name', () => {
    expect(mockPost.entry.author).toBe('Test Author');
  });

  it('should display tags', () => {
    expect(mockPost.entry.tags).toContain('Philosophy');
    expect(mockPost.entry.tags).toContain('Stoicism');
  });

  it('should generate correct blog post URL', () => {
    const expectedUrl = `/blog/${mockPost.slug}`;
    expect(expectedUrl).toBe('/blog/test-post');
  });

  it('should format date correctly', () => {
    const date = new Date(mockPost.entry.publishedDate);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    expect(formatted).toBe('January 16, 2025');
  });
});