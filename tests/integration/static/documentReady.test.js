/**
 * @vitest-environment jsdom
 */
import { intlTelInput } from "../helpers/helpers";

describe("documentReady static", () => {
  test("returns true when document.readyState is 'complete'", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("complete");
    expect(intlTelInput.documentReady()).toBe(true);
  });

  test("returns false when document.readyState is 'loading'", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("loading");
    expect(intlTelInput.documentReady()).toBe(false);
  });

  test("returns false when document.readyState is 'interactive'", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("interactive");
    expect(intlTelInput.documentReady()).toBe(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
