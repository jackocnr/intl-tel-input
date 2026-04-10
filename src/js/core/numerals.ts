export class Numerals {
  #userNumeralSet: "ascii" | "arabic-indic" | "persian" | undefined;

  constructor(initialValue: string) {
    if (initialValue) {
      this.#updateNumeralSet(initialValue);
    }
  }

  // If any Arabic-Indic digits, then label it as that set. Same for Persian. Otherwise assume ASCII.
  #updateNumeralSet(str: string): void {
    if (/[\u0660-\u0669]/.test(str)) {
      this.#userNumeralSet = "arabic-indic";
    } else if (/[\u06F0-\u06F9]/.test(str)) {
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

  // Normalize Eastern Arabic (U+0660-0669) and Persian/Extended Arabic-Indic (U+06F0-06F9) numerals to ASCII 0-9
  public normalise(str: string): string {
    if (!str) {
      return "";
    }
    this.#updateNumeralSet(str);
    if (this.#userNumeralSet === "ascii") {
      return str;
    }
    const base = this.#userNumeralSet === "arabic-indic" ? 0x0660 : 0x06f0;
    const regex =
      this.#userNumeralSet === "arabic-indic"
        ? /[\u0660-\u0669]/g
        : /[\u06F0-\u06F9]/g;
    return str.replace(regex, (ch) =>
      String.fromCharCode(0x30 + (ch.charCodeAt(0) - base)),
    );
  }

  public isAscii(): boolean {
    return !this.#userNumeralSet || this.#userNumeralSet === "ascii";
  }
}
