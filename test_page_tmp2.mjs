import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:3000/portal/room-types/6abd502ef996502133a61ac0', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

const inputs = await page.locator('input[type="text"]').evaluateAll(els => els.map(el => ({ id: el.id, value: el.value })));
console.log('INPUTS:', JSON.stringify(inputs, null, 2));

const selectTriggers = await page.locator('button[role="combobox"]').evaluateAll(els => els.map(el => ({ id: el.id })));
console.log('SELECT IDS:', JSON.stringify(selectTriggers));

await browser.close();
