import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-dropdown";
declare const props: {
    align: "left" | "center" | "right";
};
type ShowOption = HTMLElement | {
    x: number;
    y: number;
    origin?: string;
};
declare const Dropdown_base: {
    new (): {
        align: "left" | "center" | "right";
    } & {
        show: (elementOrOptions?: ShowOption) => void;
        dismiss: () => void;
        toggle: (elementOrOptions?: ShowOption) => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Dropdown extends Dropdown_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Dropdown;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
