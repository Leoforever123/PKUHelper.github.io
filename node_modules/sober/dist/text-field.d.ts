import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-text-field";
declare const props: {
    label: string;
};
declare const TextField_base: {
    new (): {
        label: string;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class TextField extends TextField_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: TextField;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
