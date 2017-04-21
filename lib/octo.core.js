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
const selenium_webdriver_1 = require("selenium-webdriver");
const _util_1 = require("./_util");
class Octo {
    constructor(...drivers) {
        this._core = drivers[0];
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
    getElement(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._core.findElement(selenium_webdriver_1.By.css(selector));
        });
    }
    wrapElement(selector) {
        return {
            _selector: selector,
            click: () => __awaiter(this, void 0, void 0, function* () {
                yield this.click(selector);
                return this.wrapElement(selector);
            }),
            type: (input, throttle = 50) => __awaiter(this, void 0, void 0, function* () { return yield this.type(selector, input, throttle); }),
            getText: () => __awaiter(this, void 0, void 0, function* () { return yield this.getText(selector); })
        };
    }
}
__decorate([
    _util_1.Retry(5)
], Octo.prototype, "click", null);
exports.Octo = Octo;
