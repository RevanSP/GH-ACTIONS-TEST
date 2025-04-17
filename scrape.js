const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://jsonplaceholder.typicode.com/users');

  const body = await page.evaluate(() => document.body.innerText);
  const data = JSON.parse(body);

  fs.writeFileSync('public/users.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
