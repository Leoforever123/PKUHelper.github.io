import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-button";
declare const props: {
    disabled: boolean;
    type: "text" | "filled" | "elevated" | "filled-tonal" | "outlined";
};
declare const Button_base: {
    new (): {
        disabled: boolean;
        type: "text" | "filled" | "elevated" | "filled-tonal" | "outlined";
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Button extends Button_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Button;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
