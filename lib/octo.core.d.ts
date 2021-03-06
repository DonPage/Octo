/// <reference types="node" />
import { EventEmitter } from 'events';
import { WebDriver, WebElement } from 'selenium-webdriver';
export declare class Octo {
    tabs: any[];
    selenium: WebDriver;
    private _core;
    private signals;
    constructor(...drivers: WebDriver[]);
    go(url: string): Promise<void>;
    el(selector: string): {
        _selector: string;
        driverEl: () => Promise<WebElement>;
        click: () => Promise<void>;
        type: (input: string, throttle?: number) => Promise<void>;
        getText: () => Promise<string>;
        getAttribute: (attribute: string) => Promise<string>;
        waitForDisplayed: (duration?: number) => Promise<void>;
        jumpTo: () => Promise<void>;
    };
    click(selector: string): Promise<void>;
    quit(): Promise<void>;
    sleep(ms?: number): Promise<void>;
    type(selector: string, input: string, throttle?: number): Promise<void>;
    getText(selector: string): Promise<string>;
    pageTitle(): Promise<string>;
    jumpTo(selector: string): Promise<void>;
    getAttr(selector: string, attribute: string): Promise<string>;
    waitForDisplayed(selector: string, duration?: number): Promise<void>;
    readSignal(signal: string, action: Function): EventEmitter;
    writeSignal(signal: string, ...data: Array<any>): Promise<void>;
    switchTabs(tabIdx: number): Promise<void>;
    openNewTab(): Promise<void>;
    ss(title: string): Promise<void>;
    private getElement(selector);
    private waitForVisible(selector, duration?);
    private waitForLocated(selector, duration?);
    private wrapElement(selector);
}
