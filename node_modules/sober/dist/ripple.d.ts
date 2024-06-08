import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-ripple";
declare const props: {
    centered: boolean;
    attached: boolean;
};
declare const Ripple_base: {
    new (): {
        centered: boolean;
        attached: boolean;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Ripple extends Ripple_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Ripple;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
