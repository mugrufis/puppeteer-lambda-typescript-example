import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
// import Chromium from 'chrome-aws-lambda';

import {default as Chromium} from 'chrome-aws-lambda';

import {Browser} from "puppeteer-core";


export const hello: APIGatewayProxyHandler = async (event, _context) => {
  let browser: Browser = null;
  console.log(event);
  try {
    browser  = await Chromium.puppeteer.launch({
      args: Chromium.args,
      defaultViewport: Chromium.defaultViewport,
      executablePath: await Chromium.executablePath,
      headless: Chromium.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://stackoverflow.com/questions/71091145/serverless-deploy-throwing-error-object-notation-for-service-property-is-not");
    const title = await page.title();
    return {
      statusCode: 200,
      body: JSON.stringify({
        title,
        // url,
      }, null, 2),
    };
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
