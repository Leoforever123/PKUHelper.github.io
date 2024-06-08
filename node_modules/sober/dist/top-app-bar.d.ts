import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-top-app-bar";
declare const props: {};
declare const TopAppBar_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class TopAppBar extends TopAppBar_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: TopAppBar;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
