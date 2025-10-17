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
    this.iceCost = 0;
    this.jerseyCost = 0;
    this.coachCost = 0;
    this.feeFixed = 0;
    this.feePercent = 0; 
    this.source = "https://www.publicdomainpictures.net/pictures/160000/nahled/bloemrijk-paars-getal-47.jpg";
    this.hours = 0;
    this.iceCostPerHour = 0;
    this.numPlayers = 0;
    this.costPerPlayer = 0;
    this.teamName = "";
    this.fees = 0;
    
    
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-palnner.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
    this.loadFromURL();
  }

  

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      totalCost: { type: Number },
      iceCost: { type: Number },
      jerseyCost: { type: Number },
      coachCost: { type: Number },
      feeFixed: { type: Number },
      feePercent: { type: Number },
      source: { type: String },
      costPerPlayer: { type: Number },
      hours: { type: Number },
      iceCostPerHour: { type: Number },
      numPlayers: { type: Number },
      teamName: { type: String },
      fees: { type: Number },

    };
  }


  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
  
    const fields = [
      "iceCostPerHour",
      "teamName",
      "hours",
      "jerseyCost",
      "coachCost",
      "feePercent",
      "feeFixed",
      "numPlayers",
    ];
  
    let hasParams = false;
  
    fields.forEach((key) => {
      if (params.has(key)) {
        const value = Number(params.get(key));
        this[key] = isNaN(value) ? params.get(key) : value;
        hasParams = true;
      }
    });
  
    // Only calculate total if URL actually had data
    if (hasParams) {
      this.updateTotal();
    }
    
  }
  
  updateURL() {
    const params = new URLSearchParams();
    params.set("teamName", this.teamName);
    params.set("iceCostPerHour", this.iceCostPerHour);
    params.set("hours", this.hours);
    params.set("jerseyCost", this.jerseyCost);
    params.set("coachCost", this.coachCost);
    params.set("feePercent", this.feePercent);
    params.set("feeFixed", this.feeFixed);
    params.set("numPlayers", this.numPlayers);
  
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }
  

  
  static get styles() {
    return [super.styles,
    css`
      :host {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ddd-theme-accent);
      color: var(--ddd-theme-primary);
      font-family: var(--ddd-font-navigation);
      min-height: 100vh;
      padding: var(--ddd-spacing-3);
      
    }

    .wrapper {
      display: grid;
      grid-template-columns: repeat(2, minmax(260px, 1fr));
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto; 
      
    }
    .static {
      flex: 0 0 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ddd-spacing-3, 16px);
    }

    .dynamic {
      flex: 0 0 70%; 
      display: flex;
      flex-direction: column;
      gap: var(--ddd-spacing-3, 16px);
    }
   

    h1 {
      
      text-align: center;
      font-size: var(--ddd-font-size-l);
      margin-bottom: var(--ddd-spacing-2);
    }

    .section {
      background-color: light-dark (var(--ddd-theme-default-alertImmediate, --ddd-theme-default-gradient-newsFeature));
      color: light-dark (var(--ddd-theme-default-alertImmediate, --ddd-theme-default-gradient-newsFeature));
      flex-wrap: wrap;
      padding: var(--ddd-spacing-3);
      text-align: inline;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .section h2 {
      font-size: var(--ddd-font-size-s);
      margin-bottom: var(--ddd-spacing-1);
      flex: 1;
    }

    number-input, input {
      width: 100%;
      width: 70vw;
      max-width: 280px;
      margin: auto;
      display: block;
    }
    .copy-btn {
      display: block;
      margin: 12px auto 0 auto;
      padding: 10px 20px;
      font-size: var(--ddd-font-size-s);
      font-weight: var(--ddd-font-weight-bold);
      background-color: var(--ddd-theme-primary);
      color: white;
      border: none;
      border-radius: var(--ddd-radius-sm);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .copy-btn:hover {
      background-color: var(--ddd-theme-default-warning);
    }

    .team-logo {
      width: 150px;
      border-radius: var(--ddd-radius-md);
      display: block;
      margin: 0 auto var(--ddd-spacing-2);
      box-shadow: var(--ddd-boxShadow-sm);
    }

    .total-fixed {
      grid-column: 1 / -1;
      background-color: var(--ddd-theme-default-info);
      color: white;
      font-weight: var(--ddd-font-weight-bold);
      text-align: center;
      padding: var(--ddd-spacing-3);
      border-radius: var(--ddd-radius-md);
      box-shadow: var(--ddd-boxShadow-sm);
      display: flex;
      flex-direction: column; /* stack items vertically */
      gap: 8px;
    }
    label {
      display: inline-block;
      width: 30%; /* adjust space for label */
      text-align: right;
      margin-right: 10px;
      vertical-align: middle;
    }

    input {
      display: inline-block;
      width: 60%; /* adjust space for input */
      vertical-align: middle;
    }

    p {
      margin: var(--ddd-spacing-1) 0;
      font-size: var(--ddd-font-size-s);
    }

    @media (max-height: 700px) {
      :host {
        transform: scale(0.9);
      }
    }
    
  `];
}
  updateTotal(e) {
    // update changed value dynamically
    if (e && e.detail) {
      this[e.detail.id] = e.detail.value;
    }
    
  
    // safely calculate
    const iceCost = (this.iceCostPerHour ) * (this.hours);
    const jerseyCost = (this.jerseyCost) * (this.numPlayers);
    const coachCost = this.coachCost;
    const feePercent = this.feePercent;
    const feeFixed = this.feeFixed;
    // So it wont get divide by 0 error
    const players = this.numPlayers > 0 ? this.numPlayers : 1;
    
    

    const subtotal = iceCost + jerseyCost + coachCost;
    const fees = subtotal * (feePercent / 100) + feeFixed;
    this.totalCost = (subtotal + fees);
    this.fees = fees;
    this.costPerPlayer = this.totalCost / players;
    this.requestUpdate();
    this.updateURL();
  }
  copyShareLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("✅ Link copied to clipboard!");
      })
      .catch(() => {
        alert("❌ Failed to copy link.");
      });
  }


  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="static">
  <div><h1>${this.title}</h1></div>
  
  <div class="section">
    <img src=${this.source} alt="Team Logo" class="team-logo" />
  </div>

   <div class="section">
    
   <h2>Team Name:</h2>
    <input
      type="text"
      class="teamName"
      placeholder="Enter team name"
      .value=${this.teamName || ""}
      @input=${(e) => {
        this.teamName = e.target.value;
        this.updateURL();
      }}
    />
  </div>

  <div class="section total-fixed">
    
   
    <p>Total $ ${this.totalCost.toFixed(2)} </p>
    <p>Fees: $ ${this.fees.toFixed(2)} </p>
    <p>Per Player: $ ${this.costPerPlayer.toFixed(2)} </p>
  </div>
  <button class="copy-btn" @click=${this.copyShareLink}>Copy Share Link</button>

  </div>
 
  <div class="dynamic">
  <div class="section">
    
    <number-input
      id="iceCostPerHour"
      label="Ice Cost Per Hour ($)"
      .value=${this.iceCostPerHour}
      @value-changed=${this.updateTotal}
    ></number-input>
    <number-input
      id="hours"
      label="Number of Hours"
      .value=${this.hours}
      @value-changed=${this.updateTotal}
    ></number-input>
  </div>

  <div class="section">
    
    <number-input
      id="jerseyCost"
      label="Cost Per Jersey ($)"
      .value=${this.jerseyCost}
      @value-changed=${this.updateTotal}
    ></number-input>
  </div>

  <div class="section">
    
    <number-input
      id="coachCost"
      label="Coach of Cost ($)"
      .value=${this.coachCost}
      @value-changed=${this.updateTotal}
    ></number-input>
  </div>

  <div class="section">
    
    <number-input
      id="feePercent"
      label="Fee Percentage (%)"
      .value=${this.feePercent}
      @value-changed=${this.updateTotal}
    ></number-input>
    <number-input
      id="feeFixed"
      label="Fixed Fee ($)"
      .value=${this.feeFixed}
      @value-changed=${this.updateTotal}
    ></number-input>
  </div>

  <div class="section">
    
    <number-input
      id="numPlayers"
      label="Number of Players"
      .value=${this.numPlayers}
      @value-changed=${this.updateTotal}
    ></number-input>
  </div>
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