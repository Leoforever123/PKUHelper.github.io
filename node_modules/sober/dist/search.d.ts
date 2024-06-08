import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-search";
declare const props: {
    size: "small" | "medium" | "large";
};
declare const Search_base: {
    new (): {
        size: "small" | "medium" | "large";
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Search extends Search_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Search;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
