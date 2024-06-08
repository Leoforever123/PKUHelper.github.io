import type { JSXAttributes } from './core/types/HTMLAttributes.js';
type Slot = 'start' | 'end';
declare const name = "s-drawer";
declare const props: {
    fold: number;
};
declare const Drawer_base: {
    new (): {
        fold: number;
    } & {
        show: (slot?: Slot, folded?: boolean) => void;
        dismiss: (slot?: Slot, folded?: boolean) => void;
        toggle: (slot?: Slot, folded?: boolean) => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Drawer extends Drawer_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Drawer;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
export {};
