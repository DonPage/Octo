import { WebDriver, WebElement } from 'selenium-webdriver';
export declare class Octo {
    private greeting;
    private _core;
    constructor(...drivers: WebDriver[]);
    go(url: string): Promise<void>;
    el(selector: string): {
        _selector: string;
        driverEl: () => Promise<WebElement>;
        click: () => Promise<void>;
        type: (input: string, throttle?: number) => Promise<void>;
        getText: () => Promise<string>;
        waitForDisplayed: () => Promise<void>;
        jumpTo: () => Promise<void>;
    };
    click(selector: string): Promise<void>;
    quit(): Promise<void>;
    sleep(ms?: number): Promise<void>;
    type(selector: string, input: string, throttle?: number): Promise<void>;
    getText(selector: string): Promise<string>;
    pageTitle(): Promise<string>;
    jumpTo(selector: string): Promise<void>;
    waitForDisplayed(selector: string): Promise<void>;
    private getElement(selector);
    private waitForVisible(selector, duration?);
    private waitForLocated(selector, duration?);
    private wrapElement(selector);
}
