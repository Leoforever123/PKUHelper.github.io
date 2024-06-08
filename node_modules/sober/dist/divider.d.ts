import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-divider";
declare const props: {};
declare const Divider_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Divider extends Divider_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Divider;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
