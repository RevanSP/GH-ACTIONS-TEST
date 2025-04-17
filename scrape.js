const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Pastikan mode headless
  });

  const page = await browser.newPage();
  await page.goto('https://jsonplaceholder.typicode.com/users');

  // Ambil data dalam format JSON
  const data = await page.evaluate(() => {
    return JSON.parse(document.body.innerText);
  });

  // Simpan data sebagai file JSON
  fs.writeFileSync('public/users.json', JSON.stringify(data, null, 2));

  await browser.close();
})();
