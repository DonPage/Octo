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

test.describe('Octo: Searching something on duckduckgo', () => {

  let driver: any;

  test.before(async () => {
    driver = new Octo(build());
    return;
  });

  test.it('Go, pageTitle', async () => {
    await driver.go('https://duckduckgo.com/');
    const title = await driver.pageTitle();
    expect(title).to.equal('DuckDuckGo');
    return;
  });

  test.it('El, Type', async () => {
    await driver.el('#search_form_input_homepage').type('Purple, Rock, Scissors.');
    return;
  });

  test.it('El, Click, Sleep', async () => {
    await driver.el('#search_button_homepage').click();
    return;
  });

  test.it('Click, El, WaitForDisplayed', async () => {
    await driver.click('div[data-domain="purplerockscissors.com"]');
    await driver.el('body.loaded').waitForDisplayed();
    return;
  });

  test.it('JumpTo', async () => {
    await driver.jumpTo('section.instafeed');
    return;
  });

  test.it('Quit', async () => {
    await driver.quit();
    return;
  });

});
