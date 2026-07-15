import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  
  const pagesToCheck = ['/', '/en', '/en/about', '/en/work', '/en/contact', '/en/tools', '/ar'];
  const viewports = [
    { name: 'mobile (iPhone 13 / 375px)', width: 375, height: 812, isMobile: true },
    { name: 'desktop (MacBook / 1440px)', width: 1440, height: 900, isMobile: false }
  ];

  for (const vp of viewports) {
    console.log(`\n================ Testing Viewport: ${vp.name} ================`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });
    const page = await context.newPage();

    for (const route of pagesToCheck) {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1200);

      const info = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const docWidth = document.documentElement.scrollWidth;
        return {
          viewportWidth,
          docWidth,
          hasHorizontalScroll: docWidth > viewportWidth
        };
      });

      console.log(`Route: ${route.padEnd(12)} -> viewportWidth: ${info.viewportWidth}, docWidth: ${info.docWidth}, hasHorizontalScroll: ${info.hasHorizontalScroll}`);
    }

    await context.close();
  }

  await browser.close();
})();
