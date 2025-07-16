import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'speed-index',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'total-blocking-time',
      'accessibility',
      'best-practices',
      'seo'
    ],
  },
};

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options, config);
  await chrome.kill();

  return runnerResult;
}

// Performance thresholds
const thresholds = {
  performance: 90,
  accessibility: 90,
  'best-practices': 90,
  seo: 90
};

async function testPerformance() {
  const baseUrl = 'http://localhost:4321';
  const pages = ['/', '/blog', '/blog/welcome-to-trained-stoic', '/about'];
  
  for (const page of pages) {
    console.log(`\n📊 Testing ${page}...`);
    const result = await runLighthouse(`${baseUrl}${page}`);
    
    const { categories } = result.lhr;
    
    for (const [category, threshold] of Object.entries(thresholds)) {
      const score = Math.round(categories[category].score * 100);
      const status = score >= threshold ? '✅' : '❌';
      console.log(`${status} ${category}: ${score}/100 (threshold: ${threshold})`);
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  testPerformance().catch(console.error);
}

export { runLighthouse, testPerformance };