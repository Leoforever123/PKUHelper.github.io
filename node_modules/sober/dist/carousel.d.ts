import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-carousel";
declare const props: {
    duration: number;
};
declare const Carousel_base: {
    new (): {
        duration: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Carousel extends Carousel_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Carousel;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
