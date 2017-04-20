import { WebDriver } from 'selenium-webdriver';
export declare class Octo {
    private driver;
    private greeting;
    constructor(driver: WebDriver);
    go(url: string): Promise<void>;
    quit(): Promise<void>;
}
