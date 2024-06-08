import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-badge";
declare const props: {};
declare const Badge_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Badge extends Badge_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Badge;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
