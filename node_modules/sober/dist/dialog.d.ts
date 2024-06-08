import type { JSXAttributes } from './core/types/HTMLAttributes.js';
import './scroll-view.js';
declare const name = "s-dialog";
declare const props: {
    size: "basic" | "full";
};
declare const Dialog_base: {
    new (): {
        size: "basic" | "full";
    } & {
        show: () => void;
        dismiss: () => void;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
declare class Dialog extends Dialog_base {
    static readonly show: (options: string | {
        root?: Element | undefined;
        headline?: string | undefined;
        text: string;
        actions?: {
            text: string;
            click?: ((event: MouseEvent) => unknown) | undefined;
        }[] | undefined;
    }) => void;
}
export { Dialog };
interface EventMap extends HTMLElementEventMap {
    show: Event;
    showed: Event;
    dismiss: Event;
    dismissed: Event;
}
interface Dialog {
    addEventListener<K extends keyof EventMap>(type: K, listener: (this: Dialog, ev: EventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof EventMap>(type: K, listener: (this: Dialog, ev: EventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Dialog;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
    }
}
