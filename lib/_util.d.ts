export declare const wait: (ms?: number) => Promise<{}>;
export declare const handleErr: (err: any) => never;
export declare const Retry: (amount?: number, errHandler?: Function) => (key: any, target: any, descriptor: any) => any;
