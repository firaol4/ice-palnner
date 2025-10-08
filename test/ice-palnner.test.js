import { html, fixture, expect } from '@open-wc/testing';
import "../ice-palnner.js";

describe("IcePalnner test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ice-palnner
        title="title"
      ></ice-palnner>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
