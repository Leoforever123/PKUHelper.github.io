import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-scroll-view";
declare const props: {};
declare const ScrollView_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class ScrollView extends ScrollView_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: ScrollView;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
