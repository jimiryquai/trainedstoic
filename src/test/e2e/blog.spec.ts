import { test, expect } from '@playwright/test';

test.describe('Blog Functionality', () => {
  test('should display blog posts on archive page', async ({ page }) => {
    await page.goto('/blog');
    
    // Check if blog archive page loads
    await expect(page.locator('h1')).toContainText('The Blog');
    
    // Check if blog posts are displayed
    await expect(page.locator('[data-tags]')).toHaveCount(1);
    
    // Check if the welcome post is displayed
    await expect(page.locator('h3')).toContainText('Welcome to Trained Stoic');
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');
    
    // Click on the first blog post
    await page.click('a[href="/blog/welcome-to-trained-stoic"]');
    
    // Check if we're on the individual post page
    await expect(page.locator('h1')).toContainText('Welcome to Trained Stoic');
    
    // Check if the content is rendered properly
    await expect(page.locator('article')).toBeVisible();
  });

  test('should render markdown content properly', async ({ page }) => {
    await page.goto('/blog/welcome-to-trained-stoic');
    
    // Check if markdown headings are rendered
    await expect(page.locator('h2')).toContainText('Why Another Blog About Stoicism?');
    
    // Check if markdown lists are rendered
    await expect(page.locator('ol li')).toContainText('The Dichotomy of Control');
    
    // Check if markdown bold text is rendered
    await expect(page.locator('strong')).toContainText('Demystify Stoic Philosophy');
  });

  test('should filter blog posts by tags', async ({ page }) => {
    await page.goto('/blog');
    
    // Check if tag filters are present
    await expect(page.locator('.badge-filter')).toHaveCount(5); // All + 4 tags
    
    // Click on Philosophy tag
    await page.click('[data-filter="Philosophy"]');
    
    // Check if only Philosophy posts are shown
    await expect(page.locator('[data-tags]')).toHaveCount(1);
  });
});