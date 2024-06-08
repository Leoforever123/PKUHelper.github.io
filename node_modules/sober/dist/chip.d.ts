import './ripple.js';
import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-chip";
declare const props: {
    type: "elevated" | "filled-tonal" | "outlined";
    clickable: boolean;
};
declare const Chip_base: {
    new (): {
        type: "elevated" | "filled-tonal" | "outlined";
        clickable: boolean;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Chip extends Chip_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Chip;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
