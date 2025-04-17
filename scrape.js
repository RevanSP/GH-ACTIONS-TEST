const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,  // Jalankan browser dalam mode headless
    args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Menonaktifkan sandboxing
  });

  const page = await browser.newPage();
  await page.goto('https://jsonplaceholder.typicode.com/users');

  const data = await page.evaluate(() => {
    return JSON.parse(document.body.innerText);
  });

  fs.writeFileSync('public/users.json', JSON.stringify(data, null, 2));

  await browser.close();
})();
