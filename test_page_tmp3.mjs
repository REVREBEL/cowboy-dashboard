import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.addInitScript(() => {
  window.__debugLogs = [];
});

await page.goto('http://localhost:3000/portal/room-types/6abd502ef996502133a61ac0', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

// Inspect React fiber to find formData state value for property-location
const result = await page.evaluate(() => {
  const trigger = document.getElementById('property-location');
  if (!trigger) return 'NOT FOUND';
  // walk up to find react fiber
  const key = Object.keys(trigger).find(k => k.startsWith('__reactFiber$'));
  let fiber = trigger[key];
  const info = [];
  let node = fiber;
  let depth = 0;
  while (node && depth < 30) {
    if (node.memoizedState && typeof node.memoizedState === 'object') {
      info.push({ depth, type: node.type?.name || node.type, memoizedState: JSON.stringify(node.memoizedState).slice(0, 200) });
    }
    node = node.return;
    depth++;
  }
  return info;
});
console.log(JSON.stringify(result, null, 2));

await browser.close();
