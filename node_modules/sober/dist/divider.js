import { builder, html } from './core/element.js';
const style = /*css*/ `
:host{
  display: block;
  height: 1px;
  background: var(--s-color-outline-variant, #c7c5d0);
  margin: 0 16px;
}
`;
const name = 's-divider';
const props = {};
export class Divider extends builder({
    name, style, props,
    setup() {
        return {
            render: () => html `
        <slot></slot>
      `
        };
    }
}) {
}
Divider.define();
