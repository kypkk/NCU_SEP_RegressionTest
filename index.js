/**
 * copyright kypkk 2023
 */

/* import dependencies
   -------------------------------------------------------------------------------
   puppeteer-extra -- acts like a browser
   cheerio -- helps with parsing HTML
--------------------------------------------------------------------------------*/
const puppeteer = require("puppeteer");

let browser;

const openBrowser = async () => {
  browser = await puppeteer.launch({ headless: "new" }); // launch headless browser
};

const Test_PrimaryShortenButton = async () => {
  const page = await browser.newPage(); // open new page

  // Get to the webapp page
  await page.goto("http://localhost:3000/");

  await Promise.all([
    page.waitForNavigation(),
    await page.click("button.btn-primary-shorten"),
  ]);

  let url = await page.url();

  return new Promise((resolve, reject) => {
    if (url === "http://localhost:3000/shorten") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_PrimaryQRButton = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/");

  await Promise.all([
    page.waitForNavigation(),
    await page.click("button.btn-primary-genqr"),
  ]);

  let url = await page.url();
  return new Promise((resolve, reject) => {
    if (url === "http://localhost:3000/genqr") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_NavBarButton = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/");

  await page.setViewport({ width: 1920, height: 1200 });

  await Promise.all([
    page.waitForNavigation(),
    await page.click(".btn-nav-home"),
  ]);
  const homeUrl = await page.url();

  await Promise.all([
    page.waitForNavigation(),
    await page.click(".btn-nav-shorten"),
  ]);
  const shortenUrl = await page.url();

  await Promise.all([
    page.waitForNavigation(),
    await page.click(".btn-nav-custom"),
  ]);
  const customUrl = await page.url();

  await Promise.all([
    page.waitForNavigation(),
    await page.click(".btn-nav-genqr"),
  ]);
  const genqrUrl = await page.url();

  await Promise.all([
    page.waitForNavigation(),
    await page.click("button.btn-nav-whatsup"),
  ]);
  const whatsupUrl = await page.url();

  return new Promise((resolve, reject) => {
    if (
      homeUrl === "http://localhost:3000/" &&
      shortenUrl === "http://localhost:3000/shorten" &&
      customUrl === "http://localhost:3000/custom" &&
      genqrUrl === "http://localhost:3000/genqr" &&
      whatsupUrl === "http://localhost:3000/"
    ) {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_shortenURL = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/shorten");

  await page.type("#input-shortenURL", "https://www.youtube.com/");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let shortenURLelement = await page.$(".shortenUrl");
  let URLvalue = await page.evaluate((el) => el.textContent, shortenURLelement);

  return new Promise((resolve, reject) => {
    if (URLvalue === "http://localhost:3000/BKD/CkI3I") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_emptyShortenURL = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/shorten");

  await page.type("#input-shortenURL", "");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let shortenURLelement = await page.$(".shortenUrl");
  let emptyReturn = await page.evaluate(
    (el) => el.textContent,
    shortenURLelement
  );

  return new Promise((resolve, reject) => {
    if (emptyReturn === "輸入不能為空，且必須是合法網址") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_invalidShortenURL = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/shorten");

  await page.type("#input-shortenURL", "abc");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let shortenURLelement = await page.$(".shortenUrl");
  let invalidReturn = await page.evaluate(
    (el) => el.textContent,
    shortenURLelement
  );

  return new Promise((resolve, reject) => {
    if (invalidReturn === "輸入不能為空，且必須是合法網址") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_repeatedShortenURL = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/shorten");

  await page.type("#input-shortenURL", "https://twitter.com/home");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let shortenURLelement = await page.$(".shortenUrl");
  let shortenURL = await page.evaluate(
    (el) => el.textContent,
    shortenURLelement
  );

  await page.goto("http://localhost:3000/shorten");

  await page.type("#input-shortenURL", "https://twitter.com/home");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let repeatedElement = await page.$(".shortenUrl");
  let repeatedURL = await page.evaluate(
    (el) => el.textContent,
    repeatedElement
  );

  return new Promise((resolve, reject) => {
    if (repeatedURL === shortenURL) {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_customURL = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/custom");

  await page.type("#input-shortenURL", "https://www.youtube.com/");
  await page.type("#keyword", "abc");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let customURLelement = await page.$(".shortenUrl");
  let customURL = await page.evaluate((el) => el.textContent, customURLelement);

  return new Promise((resolve, reject) => {
    if (customURL === "http://localhost:3000/BKD/abc") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_repeatedKeyword = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/custom");

  await page.type("#input-shortenURL", "https://twitter.com/home");
  await page.type("#keyword", "abc");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let customURLelement = await page.$(".shortenUrl");
  let invalidURL = await page.evaluate(
    (el) => el.textContent,
    customURLelement
  );

  return new Promise((resolve, reject) => {
    if (invalidURL === "這個關鍵字已被使用，請換一個關鍵字") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_emptyKeyword = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/custom");

  await page.type("#input-shortenURL", "");
  await page.type("#keyword", "");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let customURLelement = await page.$(".shortenUrl");
  let invalidURL = await page.evaluate(
    (el) => el.textContent,
    customURLelement
  );

  return new Promise((resolve, reject) => {
    if (invalidURL === "輸入不能為空，且必須是合法網址") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const Test_InvalidKeywordUrl = async () => {
  const page = await browser.newPage(); // open new page
  // Get to the webapp page
  await page.goto("http://localhost:3000/custom");

  await page.type("#input-shortenURL", "abc");
  await page.type("#keyword", "abc");
  await page.click("button.submit");
  await page.waitForTimeout(3000);
  await page.waitForSelector(".shortenUrl");

  let customURLelement = await page.$(".shortenUrl");
  let invalidURL = await page.evaluate(
    (el) => el.textContent,
    customURLelement
  );

  return new Promise((resolve, reject) => {
    if (invalidURL === "輸入不能為空，且必須是合法網址") {
      resolve(0);
    } else reject(new Error(1));
  });
};

const TestAll = async () => {
  await openBrowser();
  await Test_PrimaryShortenButton();
  await Test_PrimaryQRButton();
  await Test_NavBarButton();
  await Test_shortenURL();
  await Test_emptyShortenURL();
  await Test_invalidShortenURL();
  await Test_repeatedShortenURL();
  await Test_customURL();
  await Test_repeatedKeyword();
  await Test_emptyKeyword();
  await Test_InvalidKeywordUrl();
  await browser.close();
  console.log(0);
  return 0;
};

TestAll();
