/**
 * Copyright 2025 Firaol Tulu Firew
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./number-input.js";




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
        margin-bottom: var(--ddd-spacing-6);
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
        margin-top: var(--ddd-spacing-2);
      }
      input {
        width: 90%;
        margin-top: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-2);
      }
      .total {
        font-size: 1.3em;
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-gradient-buttons);
      }
      @media (max-width: 600px) {
        h1 {
          font-size: var(--ddd-font-size-l);
        }
      }
      .total-fixed {
        position: fixed;       
        bottom: 0;             
        left: 0;   
        right: 0;            
        width: 100%;          
        box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
               
      }
      .wrapper:focus-within .total-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        box-shadow: 0 -2px 8px rgba(0,0,0,0.2);
        z-index: 999;
        padding: 16px;
        text-align: center;
      }
      .team-logo {
      width: 200px;       
      height: auto;       
      margin-top: 12px;
      border-radius: 8px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      box-shadow: var(--ddd-boxShadow-sm); 
      
    }
    `];
  }
  updateTotal(e) {
    // update changed value dynamically
    if (e && e.detail) {
      this[e.detail.id] = e.detail.value;
    }
  
    // safely calculate
    const iceCost = (this.iceCostPerHour || 0) * (this.hours || 0);
    const jerseyCost = this.jerseyCost || 0;
    const coachCost = this.coachCost || 0;
    const feePercent = this.feePercent || 0;
    const feeFixed = this.feeFixed || 0;
    const players = this.numPlayers || 1;
  
    const subtotal = iceCost + jerseyCost + coachCost;
    const fees = subtotal * (feePercent / 100) + feeFixed;
    this.totalCost = (subtotal + fees) / players;
  
    this.requestUpdate();
  }


  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div><h1>${this.title}</h1></div>
  
  <div class="section">
    <img src="https://www.publicdomainpictures.net/pictures/160000/nahled/bloemrijk-paars-getal-47.jpg" alt="Team Logo" class="team-logo" />

  </div>
  
  <div class="section">
    <h2>Team Name:</h2>
    <input type="text" class="teamName" placeholder="Enter team name"/>

  </div>

  <div class="section">
    <h2>Ice Time Cost</h2>
    <number-input id="iceCostPerHour" label="Cost Per Hour ($)" @value-changed=${this.updateTotal}></number-input>
    <number-input id="hours" label="Number of Hours" @value-changed=${this.updateTotal}></number-input>
  </div>

  <div class="section">
    <h2>Total Cost for Jerseys</h2>
    <number-input id="jerseyCost" label="Jersey Cost ($)" @value-changed=${this.updateTotal}></number-input>
  </div>

  <div class="section">
    <h2>Cost of Coach</h2>
    <number-input id="coachCost" label="Coach Cost ($)" @value-changed=${this.updateTotal}></number-input>
  </div>

  <div class="section">
    <h2>Transaction Fee</h2>
    <number-input id="feePercent" label="Percent (%)" @value-changed=${this.updateTotal}></number-input>
    <number-input id="feeFixed" label="Fixed Fee ($)" @value-changed=${this.updateTotal}></number-input>
  </div>

  

  <div class="section">
      <h2>Players on Team:</h2>
      <number-input id="numPlayers" label="Number of Players" @value-changed=${this.updateTotal}></number-input>
  </div>

  <div class="section total-fixed">
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