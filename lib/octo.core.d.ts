import { WebDriver } from 'selenium-webdriver';
export declare class Octo {
    private greeting;
    private _core;
    constructor(...drivers: WebDriver[]);
    go(url: string): Promise<void>;
    el(selector: string): {
        _selector: string;
        click: () => Promise<void>;
        type: (input: string, throttle?: number) => Promise<void>;
        getText: () => Promise<string>;
        waitForDisplayed: () => Promise<void>;
    };
    click(selector: string): Promise<void>;
    quit(): Promise<void>;
    sleep(ms?: number): Promise<void>;
    type(selector: string, input: string, throttle?: number): Promise<void>;
    getText(selector: string): Promise<string>;
    pageTitle(): Promise<string>;
    waitForDisplayed(selector: string): Promise<void>;
    private getElement(selector);
    private waitForVisible(selector, duration?);
    private waitForLocated(selector, duration?);
    private wrapElement(selector);
}
