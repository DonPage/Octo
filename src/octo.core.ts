import { EventEmitter } from 'events';
import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { Retry } from './_util';
import * as fs from 'fs';

const events = new EventEmitter();

export class Octo {
  public tabs: any[];
  public selenium: WebDriver;
  private _core: WebDriver;
  private signals: EventEmitter;

  constructor(...drivers: WebDriver[]) {
    // take the first driver out of array.
    this._core = drivers[0];
    this.signals = events;
    // get current tab handle and put it into tabs var.
    // when the builder starts, it only has one tab, so we can push that in.
    this.tabs = [];
    this._core.getAllWindowHandles().then(handles => {
      const obj = { handle: handles[0], active: true };
      this.tabs.push(obj);
    });
    this.selenium = this._core;
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
    this.signals.removeAllListeners();
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
    await this._core.executeScript(function (selector: string) {
      // tslint:disable-next-line
      var el: any = document.querySelector(selector);
      el.scrollIntoView(true);
      // tslint:disable-next-line
    }, selector);
    return;
  }

  @Retry(3)
  public async getAttr(selector: string, attribute: string): Promise<string> {
    const el = await this.getElement(selector);
    return await el.getAttribute(attribute);
  }

  @Retry(3)
  public async waitForDisplayed(selector: string, duration: number = 1000): Promise<void> {
    // await this.waitForVisible(selector, duration); // TODO: fix this.
    await this.waitForLocated(selector, duration);
    return;
  }

  /**
   * @method        readSignal
   * @description   Listen for a signal.
   * @param         {string} signal - signal you want to listen for
   * @param         {Function} action - function you want to execute when signal is called.
   */
  public readSignal(signal: string, action: Function): EventEmitter {
    return this.signals.once(signal, async (...data: Array<any>) => {
      await action(...data);
      return;
    });
  }

  /**
   * @method        writeSignal
   * @description   Emit signal.
   * @param         {string} signal - signal you want call.
   * @param         {any} data - any data you want to apply to the signal.
   */
  public async writeSignal(signal: string, ...data: Array<any>): Promise<void> {
    await this.signals.emit(signal, ...data);
    return;
  }

  public async switchTabs(tabIdx: number) {
    let tabObj = this.tabs[tabIdx];
    if (!tabObj) throw('tab does not exist');
    await this._core.switchTo().window(tabObj.handle);
    // deactivate all tabs.
    this.tabs.forEach((val, idx) => {
      if (val.active === true) this.tabs[idx].active = false;
    });
    // mark the tab we just switched to as active.
    tabObj.active = true;
  }

  public async openNewTab() {
    await this._core.executeScript(function() { window.open(); });
    const tabs = await this._core.getAllWindowHandles();
    // add new tab to tabs array.
    const obj = { handle: tabs[tabs.length - 1], active: false };
    this.tabs.push(obj);
    // switch to newly open tab.
    return await this.switchTabs(this.tabs.length - 1);
  }

  public async ss(title: string): Promise<void> {
    let titleBase = title;
    const fileType = '.png';
    const base64 = await this._core.takeScreenshot();

    // if (params) {
    //   params.map(val => {
    //     for (let i in val) titleBase += `&${i}=${<object>val[i]}`;
    //   });
    // }

    // await fs.writeFile(`./screenshots/${titleBase}${fileType}`, base64, 'base64');
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
      getAttribute: async (attribute: string) => await this.getAttr(selector, attribute),
      waitForDisplayed: async (duration = 1000) => await this.waitForDisplayed(selector, duration),
      jumpTo: async () => await this.jumpTo(selector)
    };
  }
}
