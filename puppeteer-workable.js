const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto('https://jobs.workable.com/');
    await page.setViewport({ width: 1440, height: 744 });
    await navigationPromise;

    await page.waitForSelector('ul li h3 a');
    let jobTitles = await page.$$eval('ul li h3 a', titles => {
      return titles.map(title => title.innerText);
    });
    console.log(`Job Titles on first page of Workable are: ${jobTitles.join(', ')}`);
    await browser.close();
  } catch (e) {
    console.log(`Error while fetching workable job titles ${e.message}`);
  }
})();
