import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-fab";
declare const props: {
    size: "small" | "medium" | "large";
    extended: boolean;
};
declare const FAB_base: {
    new (): {
        size: "small" | "medium" | "large";
        extended: boolean;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class FAB extends FAB_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: FAB;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
