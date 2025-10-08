/**
 * Copyright 2025 Firaol Tulu Firew
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ice-palnner`
 * 
 * @demo index.html
 * @element ice-palnner
 */
export class IcePalnner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-palnner";
  }

  constructor() {
    super();
    this.title = "Ice Planner";
    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-palnner.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--ice-palnner-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div><h1>${this.title}</h1></div>
  <div><h2>Team Name</h2></div>
  <div><h2>Cost Per Hour</h2></div>
  <div><h2>Total Cost for Jerseys</h2></div>
  <div><h2>Cost of Coach</h2></div>
  <div><h2>Logo</h2></div>
  <div><h2>Total Cost</h2></div>







  
  
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IcePalnner.tag, IcePalnner);