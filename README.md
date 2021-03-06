# Octo <img align="right" src="./octo.png" width="120" height="146">
_A standalone wrapper for [Selenium webdriver](https://github.com/SeleniumHQ/selenium) that provides extra utility actions for the driver._

## Installing
`npm install octo-driver --save-dev`

## Features
* Retry handling at the command level.
* Types with Typescript.
* Signaling across browsers.
* Async/Await.

## Pre-requisites
It's important to know that Octo **ONLY** wraps the WebDriver instance portion of selenium-webdriver. This makes it so you can easily plug into any existing test runner or builder of your choosing.
```js
import Octo from 'octo-driver';

function build(): WebDriver {
  const build = new selenium.Builder();
  return build.forBrowser('chrome').build();
}

const driver = new Octo(build());
```

## Example
Extending a Page Object.
```js
import { WebDriver } from 'selenium-webdriver';
import Octo from 'octo-driver';
import env from '../env';

export class BasePage extends Octo {
  public baseURL = env.urls.homepage;
  public sitemap = {
    home: '/',
  };
  public DOM = {
    wrapper: 'body'
  };
  constructor(private driver: WebDriver) {
    super(driver);
  }

  public async load(page: string = this.sitemap.home): Promise<void> {
    await super.go(`${this.baseURL}${page}`);
    await super.waitForDisplayed(this.DOM.wrapper);
    return;
  }

}
```

## Why Octo?
This project was heavily inspired from a blog post written by Uber called [Rescued by Octopus](https://eng.uber.com/rescued-by-octopus/). In this post they demonstrated the complex user scenarios and inner device communication that their test have to complete in order the confirm end-to-end app functionality. The name was taken from the project at Uber and made to solve similar issues using NodeJS while also adding extra utility.
