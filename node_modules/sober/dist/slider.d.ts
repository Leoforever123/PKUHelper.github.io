import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-slider";
declare const props: {
    disabled: boolean;
    labeled: boolean;
    max: number;
    min: number;
    step: number;
    value: number;
};
declare const Slider_base: {
    new (): {
        disabled: boolean;
        labeled: boolean;
        max: number;
        min: number;
        step: number;
        value: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Slider extends Slider_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Slider;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
