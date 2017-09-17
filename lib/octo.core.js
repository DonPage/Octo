"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const selenium_webdriver_1 = require("selenium-webdriver");
const _util_1 = require("./_util");
const events = new events_1.EventEmitter();
class Octo {
    constructor(...drivers) {
        this._core = drivers[0];
        this.signals = events;
        this.tabs = [];
        this._core.getAllWindowHandles().then(handles => {
            const obj = { handle: handles[0], active: true };
            this.tabs.push(obj);
        });
        this.selenium = this._core;
    }
    go(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._core.get(url);
            return;
        });
    }
    el(selector) {
        return this.wrapElement(selector);
    }
    click(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.getElement(selector);
            yield element.click();
            return;
        });
    }
    quit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._core.quit();
            this.signals.removeAllListeners();
            return;
        });
    }
    sleep(ms = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._core.sleep(ms);
            return;
        });
    }
    type(selector, input, throttle = 150) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.getElement(selector);
            const keys = input.split('');
            for (let key of keys) {
                yield this.sleep(throttle + (Math.random() * (10 * 2) + 2));
                yield el.sendKeys(key);
            }
            return;
        });
    }
    getText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.getElement(selector);
            return yield el.getText();
        });
    }
    pageTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._core.getTitle();
        });
    }
    jumpTo(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._core.executeScript(function (selector) {
                var el = document.querySelector(selector);
                el.scrollIntoView(true);
            }, selector);
            return;
        });
    }
    getAttr(selector, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.getElement(selector);
            return yield el.getAttribute(attribute);
        });
    }
    waitForDisplayed(selector, duration = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForLocated(selector, duration);
            return;
        });
    }
    readSignal(signal, action) {
        return this.signals.once(signal, (...data) => __awaiter(this, void 0, void 0, function* () {
            yield action(...data);
            return;
        }));
    }
    writeSignal(signal, ...data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.signals.emit(signal, ...data);
            return;
        });
    }
    switchTabs(tabIdx) {
        return __awaiter(this, void 0, void 0, function* () {
            let tabObj = this.tabs[tabIdx];
            if (!tabObj)
                throw ('tab does not exist');
            yield this._core.switchTo().window(tabObj.handle);
            this.tabs.forEach((val, idx) => {
                if (val.active === true)
                    this.tabs[idx].active = false;
            });
            tabObj.active = true;
        });
    }
    openNewTab() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._core.executeScript(function () { window.open(); });
            const tabs = yield this._core.getAllWindowHandles();
            const obj = { handle: tabs[tabs.length - 1], active: false };
            this.tabs.push(obj);
            return yield this.switchTabs(this.tabs.length - 1);
        });
    }
    ss(title) {
        return __awaiter(this, void 0, void 0, function* () {
            let titleBase = title;
            const fileType = '.png';
            const base64 = yield this._core.takeScreenshot();
            return;
        });
    }
    getElement(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._core.findElement(selenium_webdriver_1.By.css(selector));
        });
    }
    waitForVisible(selector, duration = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.getElement(selector);
            yield this._core.wait(selenium_webdriver_1.until.elementIsVisible(el), duration);
            return;
        });
    }
    waitForLocated(selector, duration = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._core.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css(selector)), duration);
            return;
        });
    }
    wrapElement(selector) {
        return {
            _selector: selector,
            driverEl: () => __awaiter(this, void 0, void 0, function* () { return yield this.getElement(selector); }),
            click: () => __awaiter(this, void 0, void 0, function* () { return yield this.click(selector); }),
            type: (input, throttle = 50) => __awaiter(this, void 0, void 0, function* () { return yield this.type(selector, input, throttle); }),
            getText: () => __awaiter(this, void 0, void 0, function* () { return yield this.getText(selector); }),
            getAttribute: (attribute) => __awaiter(this, void 0, void 0, function* () { return yield this.getAttr(selector, attribute); }),
            waitForDisplayed: (duration = 1000) => __awaiter(this, void 0, void 0, function* () { return yield this.waitForDisplayed(selector, duration); }),
            jumpTo: () => __awaiter(this, void 0, void 0, function* () { return yield this.jumpTo(selector); })
        };
    }
}
__decorate([
    _util_1.Retry(5)
], Octo.prototype, "click", null);
__decorate([
    _util_1.Retry(3)
], Octo.prototype, "jumpTo", null);
__decorate([
    _util_1.Retry(3)
], Octo.prototype, "getAttr", null);
__decorate([
    _util_1.Retry(3)
], Octo.prototype, "waitForDisplayed", null);
__decorate([
    _util_1.Retry(1)
], Octo.prototype, "waitForVisible", null);
__decorate([
    _util_1.Retry(1)
], Octo.prototype, "waitForLocated", null);
exports.Octo = Octo;
