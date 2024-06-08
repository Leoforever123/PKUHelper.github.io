import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-checkbox";
declare const props: {
    disabled: boolean;
    checked: boolean;
    indeterminate: boolean;
};
declare const Checkbox_base: {
    new (): {
        disabled: boolean;
        checked: boolean;
        indeterminate: boolean;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Checkbox extends Checkbox_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Checkbox;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
