const puppeteer = require('puppeteer-core');
const fs = require('fs');
const { executablePath } = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: executablePath(), 
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto('https://jsonplaceholder.typicode.com/users');

  const body = await page.evaluate(() => document.body.innerText);
  const data = JSON.parse(body);

  fs.writeFileSync('public/users.json', JSON.stringify(data, null, 2));
  await browser.close();
})();
