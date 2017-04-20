import * as test from 'selenium-webdriver/testing';
import * as chai from 'chai';
import * as selenium from 'selenium-webdriver';
import Octo from '../lib';
import { WebDriver } from 'selenium-webdriver';

const expect = chai.expect;

function build(): WebDriver {
  const build = new selenium.Builder();
  build.usingServer('http://localhost:4444/wd/hub');
  build.withCapabilities(selenium.Capabilities.chrome());
  return build.build();
}

test.describe('Octo Core: go method', () => {

  let driver: any;

  test.before(async () => {
    driver = new Octo(build());
    return;
  });

  test.it('it can do stuff', async () => {
    await driver.go('https://google.com');
    return;
  });

  test.it('quit', async () => {
    await driver.quit();
    return;
  });

});
