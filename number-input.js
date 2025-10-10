import { LitElement, html, css } from "lit";

export class NumberInput extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: Number },
  };

  constructor() {
    super();
    this.value = 0;
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

  render() {
    return html`
      <label>${this.label}</label>
      <input type="number" .value="${String(this.value)}" @input="${this._onInput}" />
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
