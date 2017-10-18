import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const PixelDiff = require('pixel-diff');
const browserLogs = require('protractor-browser-logs');

describe('Set style', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  it('should change the style', async () => {
    await browser.get('/set-style');
    const elm = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(elm), 2000);
    const radios = await browser.findElements(by.tagName('mat-radio-button'));
    await browser.sleep(4000);
    const style1 = await browser.takeScreenshot();
    await radios[1].click();
    await browser.sleep(500);
    const style2 = await browser.takeScreenshot();
    const result = new PixelDiff({
      imageA: new Buffer(style1, 'base64'),
      imageB: new Buffer(style2, 'base64')
    }).runSync();
    expect(result.differences).toBeGreaterThan(0);
    await radios[0].click();
    await browser.sleep(1000);
    const style1bis = await browser.takeScreenshot();
    const result2 = new PixelDiff({
      imageA: new Buffer(style1, 'base64'),
      imageB: new Buffer(style1bis, 'base64')
    }).runSync();
    expect(result2.differences).toBe(0);
  });
});
