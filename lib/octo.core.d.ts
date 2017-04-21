import { WebDriver } from 'selenium-webdriver';
export declare class Octo {
    private greeting;
    private _core;
    constructor(...drivers: WebDriver[]);
    go(url: string): Promise<void>;
    el(selector: string): {
        _selector: string;
        click: () => Promise<any>;
        type: (input: string, throttle?: number) => Promise<void>;
        getText: () => Promise<string>;
    };
    click(selector: string): Promise<void>;
    quit(): Promise<void>;
    sleep(ms?: number): Promise<void>;
    type(selector: string, input: string, throttle?: number): Promise<void>;
    getText(selector: string): Promise<string>;
    private getElement(selector);
    private wrapElement(selector);
}
