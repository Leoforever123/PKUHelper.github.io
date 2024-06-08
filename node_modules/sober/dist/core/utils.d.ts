export declare const device: {
    touched: boolean;
    addEventListener: (callback: (touched: boolean) => unknown) => void;
};
export declare const getStackingContext: (el: Node) => {
    left: number;
    top: number;
    width: number;
    height: number;
};
