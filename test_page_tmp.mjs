import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure()?.errorText));

await page.goto('http://localhost:3000/portal/room-types/6abd502ef996502133a61ac0', { waitUntil: 'networkidle', timeout: 30000 });

await page.waitForTimeout(3000);

// Look for the property-location select trigger text
const selects = await page.locator('button[role="combobox"]').allTextContents();
console.log('SELECT TEXTS:', JSON.stringify(selects));

await browser.close();
