import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-circular-progress";
declare const props: {
    indeterminate: boolean;
    max: number;
    value: number;
};
declare const CircularProgress_base: {
    new (): {
        indeterminate: boolean;
        max: number;
        value: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class CircularProgress extends CircularProgress_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: CircularProgress;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
