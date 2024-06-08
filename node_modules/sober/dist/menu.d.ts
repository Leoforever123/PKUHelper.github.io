import type { JSXAttributes } from './core/types/HTMLAttributes.js';
import './ripple.js';
import './scroll-view.js';
declare const name = "s-menu";
declare const props: {
    group: "" | "start" | "end";
};
declare const Menu_base: {
    new (): {
        group: "" | "start" | "end";
    } & {
        show: (elemtnt?: HTMLElement) => void;
        dismiss: () => void;
        toggle: (elemtnt?: HTMLElement) => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Menu extends Menu_base {
}
declare const itemName = "s-menu-item";
declare const itemProps: {};
declare const MenuItem_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class MenuItem extends MenuItem_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
            [itemName]: Partial<typeof itemProps> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Menu;
        [itemName]: MenuItem;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
        [itemName]: typeof itemProps;
    }
}
export {};
