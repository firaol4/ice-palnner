import { LitElement, html, css } from "lit";

export class NumberInput extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: Number },
    step: { type: Number },
  };

  constructor() {
    super();
    this.value = 0;
    this.step = 1;
  }

  _onInput(e) {
    const newValue = parseFloat(e.target.value) || 0;
    this.value = newValue;
    this.dispatchEvent(new CustomEvent("value-changed", {
      detail: { id: this.id, value: newValue },
      bubbles: true,
      composed: true
    }));
  }
  _increment() {
    this.value += this.step;
    this._notifyChange();
  }

  _decrement() {
    if (this.value - this.step >= 0) {
      this.value -= this.step;
      this._notifyChange();
    }
  }
  _notifyChange() {
    this.dispatchEvent(new CustomEvent("value-changed", {
      detail: { id: this.id, value: this.value },
      bubbles: true,
      composed: true,
    }));
    this.requestUpdate(); 
  }

  render() {
    return html`
      <label>${this.label}</label>
      <button @click="${this._decrement}">-</button>
      <input type="number" .value="${String(this.value)}" @input="${this._onInput}" />
      <button @click="${this._increment}">+</button>
    `;
  }

  static styles = css`
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 4px;
    }
    input {
      padding: 6px;
      border-radius: 4px;
      border: 1px solid gray;
      width: 100px;
    }
  `;
}

customElements.define("number-input", NumberInput);
