import { test, expect } from '@playwright/test';

test.describe('Markdown Rendering', () => {
  test('should render markdown as HTML, not raw text', async ({ page }) => {
    await page.goto('/blog/welcome-to-trained-stoic');
    
    // Check that markdown headings are rendered as HTML elements, not raw text
    await expect(page.locator('h1')).toContainText('Welcome to Trained Stoic');
    await expect(page.locator('h2')).toContainText('Why Another Blog About Stoicism?');
    
    // Verify that raw markdown syntax is NOT visible
    await expect(page.locator('article')).not.toContainText('## Why Another Blog About Stoicism?');
    await expect(page.locator('article')).not.toContainText('# Welcome to Trained Stoic');
    
    // Check that markdown lists are rendered as HTML lists
    await expect(page.locator('ol li')).toContainText('The Dichotomy of Control');
    await expect(page.locator('ul li')).toContainText('Deep Dives');
    
    // Verify that raw markdown list syntax is NOT visible
    await expect(page.locator('article')).not.toContainText('1. **The Dichotomy of Control**');
    await expect(page.locator('article')).not.toContainText('- **Deep Dives**');
    
    // Check that markdown bold text is rendered as HTML
    await expect(page.locator('strong')).toContainText('Demystify Stoic Philosophy');
    
    // Verify that raw markdown bold syntax is NOT visible
    await expect(page.locator('article')).not.toContainText('**Demystify Stoic Philosophy**');
    
    // Check that markdown links are rendered as HTML
    const links = page.locator('article a');
    await expect(links).toHaveCount(2); // Social share buttons
    
    // Verify content is in prose container with proper styling
    await expect(page.locator('.prose')).toBeVisible();
    await expect(page.locator('.prose h2')).toHaveCount(5); // Expected number of H2 headings
  });

  test('should have proper typography styles applied', async ({ page }) => {
    await page.goto('/blog/welcome-to-trained-stoic');
    
    // Check that prose styling is applied
    const proseContainer = page.locator('.prose');
    await expect(proseContainer).toBeVisible();
    
    // Check that headings have proper styling
    const h2Elements = page.locator('.prose h2');
    await expect(h2Elements.first()).toBeVisible();
    
    // Check that paragraphs are properly styled
    const paragraphs = page.locator('.prose p');
    await expect(paragraphs.first()).toBeVisible();
    
    // Check that lists are properly styled
    const lists = page.locator('.prose ul, .prose ol');
    await expect(lists.first()).toBeVisible();
  });

  test('should not show raw markdown syntax anywhere', async ({ page }) => {
    await page.goto('/blog/welcome-to-trained-stoic');
    
    // Get all text content
    const content = await page.locator('article').textContent();
    
    // Check that common markdown syntax is not present
    expect(content).not.toContain('##');
    expect(content).not.toContain('**');
    expect(content).not.toContain('1. **');
    expect(content).not.toContain('- **');
    expect(content).not.toContain('# Welcome');
    
    // Check that content is actually there (not empty)
    expect(content).toContain('Welcome to Trained Stoic');
    expect(content).toContain('Why Another Blog About Stoicism?');
  });
});