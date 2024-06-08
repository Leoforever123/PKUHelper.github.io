import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-switch";
declare const props: {
    disabled: boolean;
    checked: boolean;
};
declare const Switch_base: {
    new (): {
        disabled: boolean;
        checked: boolean;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Switch extends Switch_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Switch;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
