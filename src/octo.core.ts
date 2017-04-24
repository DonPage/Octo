import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { Retry } from './_util';

export class Octo {
  private greeting: string;
  private _core: WebDriver;

  constructor(...drivers: WebDriver[]) {
    // take the first driver out of array.
    this._core = drivers[0];
  }

  public async go(url: string): Promise<void> {
    await this._core.get(url);
    return;
  }

  public el(selector: string) {
    return this.wrapElement(selector);
  }

  @Retry(5)
  public async click(selector: string): Promise<void> {
    const element = await this.getElement(selector);
    await element.click();
    return;
  }

  public async quit(): Promise<void> {
    await this._core.quit();
    return;
  }

  public async sleep(ms: number = 50) {
    await this._core.sleep(ms);
    return;
  }

  public async type(selector: string, input: string, throttle: number = 150): Promise<void> {
      const el = await this.getElement(selector);
      const keys = input.split('');
      for (let key of keys) {
        await this.sleep(throttle + (Math.random() * (10 * 2) + 2));
        await el.sendKeys(key);
      }
      return;
  }

  public async getText(selector: string): Promise<string> {
    const el = await this.getElement(selector);
    return await el.getText();
  }

  public async pageTitle(): Promise<string> {
    return await this._core.getTitle();
  }

  @Retry(3)
  public async jumpTo(selector: string): Promise<void> {
    // tslint:disable-next-line
    await this._core.executeScript(function(selector: string) {
      // tslint:disable-next-line
      var el: any = document.querySelector(selector);
      el.scrollIntoView(true);
    }, selector);
    return;
  }

  @Retry(3)
  public async waitForDisplayed(selector: string): Promise<void> {
    await this.waitForLocated(selector);
    await this.waitForVisible(selector);
    return;
  }

  private async getElement(selector: string): Promise<WebElement> {
    return await this._core.findElement(By.css(selector));
  }

  @Retry(1)
  private async waitForVisible(selector: string, duration: number = 1000): Promise<void> {
    const el = await this.getElement(selector);
    await this._core.wait(until.elementIsVisible(el), duration);
    return;
  }

  @Retry(1)
  private async waitForLocated(selector: string, duration: number = 1000): Promise<void> {
    await this._core.wait(until.elementLocated(By.css(selector)), duration);
    return;
  }

  private wrapElement(selector: string) {
    return {
      _selector: selector,
      driverEl: async () => await this.getElement(selector),
      click: async () => await this.click(selector),
      type: async (input: string, throttle = 50) => await this.type(selector, input, throttle),
      getText: async () => await this.getText(selector),
      waitForDisplayed: async () => await this.waitForDisplayed(selector),
      jumpTo: async () => await this.jumpTo(selector)
    };
  }
}
