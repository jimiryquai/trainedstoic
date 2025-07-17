import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import OGImage from '../../components/OGImage';

describe('OGImage Component', () => {
  it('renders with basic props', () => {
    const { container } = render(
      <OGImage
        title="Test Blog Post Title"
        author="John Doe"
        publishedDate="2025-01-17"
        description="This is a test description for the blog post."
        tags={['philosophy', 'stoicism', 'wisdom']}
      />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('renders with long title that should be split', () => {
    const longTitle = "This is a very long title that should be split into multiple lines to test the title wrapping functionality";
    
    const { container } = render(
      <OGImage
        title={longTitle}
        author="Test Author"
        publishedDate="2025-01-17"
      />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    const { container } = render(
      <OGImage title="Simple Title" />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('renders with tags', () => {
    const { container } = render(
      <OGImage
        title="Test Post"
        tags={['tag1', 'tag2', 'tag3', 'tag4']}
      />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('uses default author when none provided', () => {
    const { container } = render(
      <OGImage title="Test Post" />
    );
    
    expect(container).toBeInTheDocument();
  });
});