import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

page.on('console', msg => {
  const text = msg.text();
  if (text.includes('DEBUG')) console.log('CONSOLE:', text);
});

await page.goto('http://localhost:3000/portal/room-types/6abd502ef996502133a61ac0', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

await browser.close();
