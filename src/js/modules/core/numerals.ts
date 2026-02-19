export class Numerals {
  private userNumeralSet?: "ascii" | "arabic-indic" | "persian";

  constructor() {
    // intentionally left uninitialised until we see some input
  }

  // If any Arabic-Indic digits, then label it as that set. Same for Persian. Otherwise assume ASCII.
  private updateNumeralSet(str: string): void {
    if (/[\u0660-\u0669]/.test(str)) {
      this.userNumeralSet = "arabic-indic";
    } else if (/[\u06F0-\u06F9]/.test(str)) {
      this.userNumeralSet = "persian";
    } else {
      this.userNumeralSet = "ascii";
    }
  }

  // Denormalise ASCII 0-9 to the user's numeral set, if known. If not known, return the string as-is.
  public denormalise(str: string, currentInputValue: string): string {
    if (!this.userNumeralSet) {
      this.updateNumeralSet(currentInputValue);
    }
    if (this.userNumeralSet === "ascii") {
      return str;
    }
    const base = this.userNumeralSet === "arabic-indic" ? 0x0660 : 0x06f0;
    return str.replace(/[0-9]/g, (d) => String.fromCharCode(base + Number(d)));
  }

  // Normalize Eastern Arabic (U+0660-0669) and Persian/Extended Arabic-Indic (U+06F0-06F9) numerals to ASCII 0-9
  public normalise(str: string): string {
    if (!str) {
      return "";
    }
    this.updateNumeralSet(str);
    if (this.userNumeralSet === "ascii") {
      return str;
    }
    const base = this.userNumeralSet === "arabic-indic" ? 0x0660 : 0x06f0;
    const regex = this.userNumeralSet === "arabic-indic" ? /[\u0660-\u0669]/g : /[\u06F0-\u06F9]/g;
    return str.replace(regex, (ch) => String.fromCharCode(0x30 + (ch.charCodeAt(0) - base)));
  }

  public isAscii(): boolean {
    return this.userNumeralSet === "ascii";
  }
}
