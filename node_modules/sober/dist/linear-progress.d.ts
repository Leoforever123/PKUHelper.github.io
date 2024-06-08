import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-linear-progress";
declare const props: {
    indeterminate: boolean;
    max: number;
    value: number;
};
declare const LinearProgress_base: {
    new (): {
        indeterminate: boolean;
        max: number;
        value: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class LinearProgress extends LinearProgress_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: LinearProgress;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
