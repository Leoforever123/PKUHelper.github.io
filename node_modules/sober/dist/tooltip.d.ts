import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-tooltip";
declare const props: {};
declare const Tooltip_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Tooltip extends Tooltip_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Tooltip;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
