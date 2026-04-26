export class Numerals {
  #userNumeralSet: "ascii" | "arabic-indic" | "persian" | undefined;

  //* Stateless conversion of any Arabic-Indic / Persian digits to ASCII 0-9.
  //* Use this when you need to normalise digits without affecting any instance's tracked numeral set (e.g. for the country-search query).
  public static toAscii(str: string): string {
    if (!str) {
      return "";
    }
    // Note: yes it runs two replaces, but a replace call is really a test + manipulate, so for standard ascii input, it just runs 2x tests. Not worth splitting up and adding test guards.
    return str
      .replace(/[٠-٩]/g, (ch) =>
        String.fromCharCode(0x30 + (ch.charCodeAt(0) - 0x0660)),
      )
      .replace(/[۰-۹]/g, (ch) =>
        String.fromCharCode(0x30 + (ch.charCodeAt(0) - 0x06f0)),
      );
  }

  constructor(initialValue: string) {
    if (initialValue) {
      this.#updateNumeralSet(initialValue);
    }
  }

  // If any Arabic-Indic digits, then label it as that set. Same for Persian. Otherwise assume ASCII.
  #updateNumeralSet(str: string): void {
    if (/[٠-٩]/.test(str)) {
      this.#userNumeralSet = "arabic-indic";
    } else if (/[۰-۹]/.test(str)) {
      this.#userNumeralSet = "persian";
    } else {
      this.#userNumeralSet = "ascii";
    }
  }

  // Denormalise ASCII 0-9 to the user's numeral set. If not yet known, return as-is.
  // NOTE: normalise is always called before this, so it should be impossible for the numeral set to be unknown at this point.
  public denormalise(str: string): string {
    if (!this.#userNumeralSet || this.#userNumeralSet === "ascii") {
      return str;
    }
    const base = this.#userNumeralSet === "arabic-indic" ? 0x0660 : 0x06f0;
    return str.replace(/[0-9]/g, (d) => String.fromCharCode(base + Number(d)));
  }

  // Normalize Eastern Arabic (U+0660-0669) and Persian/Extended Arabic-Indic (U+06F0-06F9) numerals to ASCII 0-9.
  // Tracks the user's numeral set as a side effect so denormalise can mirror it back.
  public normalise(str: string): string {
    if (!str) {
      return "";
    }
    this.#updateNumeralSet(str);
    //* Fast-path ASCII (the common case) so we skip both replaces on every keystroke.
    if (this.#userNumeralSet === "ascii") {
      return str;
    }
    return Numerals.toAscii(str);
  }

  public isAscii(): boolean {
    return !this.#userNumeralSet || this.#userNumeralSet === "ascii";
  }
}
