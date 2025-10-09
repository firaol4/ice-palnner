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
    this.totalCost = 0;
    
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
      totalCost: { type: Number },
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
        gap: var(--ddd-spacing-4);
        grid-template-columns: repeat(2, 2fr);
        margin: 0 auto;
      }
      h3 span {
        font-size: var(--ice-palnner-label-font-size, var(--ddd-font-size-s));
      }
      h1 {
        grid-column: 1 / -1;
        text-align: center;
        margin-bottom: 24px;
      }
      .section {
        
        text-align: center;
        grid-column: 2 / span 2; 
        justify-self: center;
        color: var(--ddd-theme-default-info);
        background-color: var(--ddd-theme-default-warningLight);
        padding: var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
        width: 100%;
        max-width: 350px;
        text-align: center;
      }
      label {
        display: block;
        margin-top: 8px;
      }
      input {
        width: 90%;
        margin-top: 4px;
        padding: 6px;
      }
      .total {
        font-size: 1.3em;
        font-weight: bold;
        color: #004b8d;
      }
      @media (max-width: 600px) {
        h1 {
          font-size: var(--ddd-font-size-l);
        }
      }
    `];
  }
  updateTotal() {
    const getVal = (cls) =>
      parseFloat(this.renderRoot.querySelector(`.${cls}`)?.value) || 0;

    const iceCost = getVal("iceCostPerHour") * getVal("hours");
    const jerseyCost = getVal("jerseyCost");
    const coachCost = getVal("coachCost");
    const feePercent = getVal("feePercent");
    const feeFixed = getVal("feeFixed");
    const players = getVal("numPlayers") || 1;

    const subtotal = iceCost + jerseyCost + coachCost;
    const fees = subtotal * (feePercent / 100) + feeFixed;
    this.totalCost = (subtotal + fees) / players;
  }


  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div><h1>${this.title}</h1></div>
  
  <div class="section">
    <h2>Logo</h2>
  </div>
  
  <div class="section">
    <h2>Team Name:</h2>
    <input type="text" class="teamName" placeholder="Enter team name"/>

    
  </div>

  <div class="section">
    <h2>Ice Time Cost</h2>
      <label>Cost Per Hour ($):</label>
    <input type="number" class="iceCostPerHour" placeholder="Enter cost per hour" @input=${this.updateTotal}/>
      <label>Number of Hours :</label>
    <input type="number" class="hours" placeholder="Enter # of hours" @input=${this.updateTotal}/>
  </div>

  <div class="section">
    <h2>Total Cost for Jerseys</h2>
    <input type="number" class="jerseyCost" placeholder="200" @input=${this.updateTotal}/>
  </div>

  <div class="section">
    <h2>Cost of Coach</h2>
    <input type="number" class="coachCist" placeholder="6000" @input=${this.updateTotal}/>
  </div>

  <div class="section">
    <h2>Transaction Fee</h2>
      <label>Percent (%):</label>
      <input type="number" class="feePercent" step="0.01" placeholder="e.g. 2.5" @input=${this.updateTotal} />
      <label>Fixed Fee ($):</label>
      <input type="number" class="feeFixed" step="0.01" value="0.99" @input=${this.updateTotal}/>
  </div>

  

  <div class="section">
      <h2>Players</h2>
      <label>Number of Players:</label>
      <input type="number" class="numPlayers" placeholder="10" @input=${this.updateTotal} />
  </div>

  <div class="section">
    <h2>Total Cost</h2>
    <p>$${this.totalCost.toFixed(2)}</p>
  </div>

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