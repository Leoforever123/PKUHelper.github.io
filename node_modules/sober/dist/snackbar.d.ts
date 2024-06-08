import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-snackbar";
declare const props: {
    duration: number;
};
declare const Snackbar_base: {
    new (): {
        duration: number;
    } & {
        show: () => void;
        dismiss: () => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
declare class Snackbar extends Snackbar_base {
    static readonly show: (options: string | {
        root?: Element | undefined;
        text: string;
        duration?: number | undefined;
        action?: {
            text: string;
            click: (event: MouseEvent) => unknown;
        } | undefined;
    }) => void;
}
interface EventMap extends HTMLElementEventMap {
    show: Event;
    showed: Event;
    dismiss: Event;
    dismissed: Event;
}
interface Snackbar {
    addEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Snackbar, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}
export { Snackbar };
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Snackbar;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
