"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = (ms = 500) => __awaiter(this, void 0, void 0, function* () { return new Promise(resolve => setTimeout(resolve, ms)); });
exports.handleErr = (err) => {
    throw err;
};
exports.Retry = (amount = 3, errHandler = exports.handleErr) => {
    return function (key, target, descriptor) {
        const originalFunc = descriptor.value;
        descriptor.value = function () {
            return __awaiter(this, arguments, void 0, function* () {
                let args = [...arguments];
                try {
                    yield originalFunc.apply(this, args);
                }
                catch (err) {
                    if (amount === 0)
                        return errHandler(err);
                    amount -= 1;
                    yield exports.wait();
                    console.log(`retrying`);
                    return descriptor.value();
                }
            });
        };
        return descriptor;
    };
};
