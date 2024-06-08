import type { JSXAttributes } from './core/types/HTMLAttributes.js';
declare const name = "s-table";
declare const props: {};
declare const Table_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Table extends Table_base {
}
declare const theadName = "s-thead";
declare const theadProps: {};
declare const Thead_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Thead extends Thead_base {
}
declare const tbodyName = "s-tbody";
declare const tbodyProps: {};
declare const Tbody_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Tbody extends Tbody_base {
}
declare const trName = "s-tr";
declare const trProps: {};
declare const Tr_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Tr extends Tr_base {
}
declare const thName = "s-th";
declare const thProps: {};
declare const Th_base: {
    new (): HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Th extends Th_base {
}
declare const tdName = "s-td";
declare const tdProps: {
    colspan: number;
    rowspan: number;
};
declare const Td_base: {
    new (): {
        colspan: number;
        rowspan: number;
    } & HTMLElement;
    readonly define: () => void;
    prototype: HTMLElement;
};
export declare class Td extends Td_base {
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [name]: Partial<typeof props> & JSXAttributes;
            [theadName]: Partial<typeof theadProps> & JSXAttributes;
            [tbodyName]: Partial<typeof tbodyProps> & JSXAttributes;
            [trName]: Partial<typeof trProps> & JSXAttributes;
            [thName]: Partial<typeof thProps> & JSXAttributes;
            [tdName]: Partial<typeof tdProps> & JSXAttributes;
        }
    }
    interface HTMLElementTagNameMap {
        [name]: Table;
        [theadName]: Thead;
        [tbodyName]: Tbody;
        [trName]: Tr;
        [thName]: Th;
        [tdName]: Td;
    }
}
declare module 'vue' {
    interface GlobalComponents {
        [name]: typeof props;
        [theadName]: typeof theadProps;
        [tbodyName]: typeof tbodyProps;
        [trName]: typeof trProps;
        [thName]: typeof thProps;
        [tdName]: typeof tdProps;
    }
}
export {};
