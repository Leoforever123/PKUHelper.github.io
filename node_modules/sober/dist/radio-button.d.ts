import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-radio-button";
declare const props: {
    disabled: boolean;
    checked: boolean;
    name: string;
};
declare const RadioButton_base: {
    new (): {
        disabled: boolean;
        checked: boolean;
        name: string;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class RadioButton extends RadioButton_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: RadioButton;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
