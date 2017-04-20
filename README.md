# Octo
_A standalone wrapper for [Selenium webdriver](https://github.com/SeleniumHQ/selenium) that provides extra utility actions for the driver._

## Features
* Retry handling at the command level.
* Types with Typescript.
* Signaling across browsers.
* Using one command to control a fleet of browsers.
* Async/Await.

## Pre-requisites
It's important to know that Octo **ONLY** wraps the WebDriver portion of selenium-webdriver. This makes it so you can easily plug into any existing test runner or builder of your choosing while reaping the benefits listed above.
```js
function build(): WebDriver {
  const build = new selenium.Builder();
  return build.forBrowser('chrome').build();
}

const driver = new Octo(build());
```
