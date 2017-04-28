/// <reference types="node" />
import { EventEmitter } from 'events';
import { WebDriver } from 'selenium-webdriver';
export declare class Octo {
    tabs: any[];
    private _core;
    private signals;
    constructor(...drivers: WebDriver[]);
    go(url: string): Promise<void>;
    el(selector: string): object;
    click(selector: string): Promise<void>;
    quit(): Promise<void>;
    sleep(ms?: number): Promise<void>;
    type(selector: string, input: string, throttle?: number): Promise<void>;
    getText(selector: string): Promise<string>;
    pageTitle(): Promise<string>;
    jumpTo(selector: string): Promise<void>;
    getAttr(selector: string, attribute: string): Promise<string>;
    waitForDisplayed(selector: string): Promise<void>;
    readSignal(signal: string, action: Function): EventEmitter;
    writeSignal(signal: string, ...data: Array<any>): Promise<void>;
    switchTabs(tabIdx: number): Promise<void>;
    openNewTab(): Promise<void>;
    private getElement(selector);
    private waitForVisible(selector, duration?);
    private waitForLocated(selector, duration?);
    private wrapElement(selector);
}
