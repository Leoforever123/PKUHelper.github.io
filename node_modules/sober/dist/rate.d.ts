import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-rate";
declare const props: {
    readonly: boolean;
    max: number;
    min: number;
    value: number;
    step: number;
};
declare const Rate_base: {
    new (): {
        readonly: boolean;
        max: number;
        min: number;
        value: number;
        step: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Rate extends Rate_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Rate;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
