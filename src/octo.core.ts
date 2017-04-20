import { WebDriver } from 'selenium-webdriver';
import { Retry } from './_util';

export class Octo {
  private greeting: string;

  constructor(private driver: WebDriver) {}

  @Retry()
  public async go(url: string): Promise<void> {
    await this.driver.get(url);
  }

  public async quit(): Promise<void> {
    await this.driver.quit();
    return;
  }
}
