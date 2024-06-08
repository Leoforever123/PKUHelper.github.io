import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-icon-button";
declare const props: {
    disabled: boolean;
    type: "filled" | "filled-tonal" | "outlined" | "standard";
};
declare const IconButton_base: {
    new (): {
        disabled: boolean;
        type: "filled" | "filled-tonal" | "outlined" | "standard";
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class IconButton extends IconButton_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: IconButton;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
