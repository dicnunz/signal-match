import { describe, expect, test } from "vitest";
import {
  getAgentBrowserOperatorOsHref,
  getBuyHref,
  getSupportReceiptHref,
  hasBuyLink,
} from "./site";

describe("site commerce routes", () => {
  test("keeps the role pack checkout unfinished until a real buy link exists", () => {
    expect(hasBuyLink()).toBe(false);
    expect(getBuyHref()).toBe("#role-pack");
  });

  test("keeps support and operator OS routes separate", () => {
    expect(getSupportReceiptHref()).toBe("https://nicdunz.gumroad.com/l/smrimu");
    expect(getAgentBrowserOperatorOsHref()).toBe(
      "https://nicdunz.gumroad.com/l/agent-browser-operator-os",
    );
  });
});
