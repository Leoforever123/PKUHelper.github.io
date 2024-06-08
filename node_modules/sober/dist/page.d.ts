import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-page";
declare const props: {
    theme: "auto" | "light" | "dark";
};
declare const Page_base: {
    new (): {
        theme: "auto" | "light" | "dark";
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Page extends Page_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Page;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
