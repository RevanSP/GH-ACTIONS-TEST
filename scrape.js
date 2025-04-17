const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://jsonplaceholder.typicode.com/users', { waitUntil: 'networkidle2' });

  const body = await page.evaluate(() => document.body.innerText);
  const data = JSON.parse(body);

  fs.mkdirSync('public', { recursive: true });
  fs.writeFileSync('public/users.json', JSON.stringify(data, null, 2));

  await browser.close();
})();