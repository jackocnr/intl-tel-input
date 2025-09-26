//* Iterate through the formattedValue until hit the right number of relevant chars.
export const translateCursorPosition = (
  relevantChars: number,
  formattedValue: string,
  prevCaretPos: number,
  isDeleteForwards: boolean,
): number => {
  //* If the first char is a formatting char, and they backspace delete it:
  //* Cursor should stay at the start (pos 0), rather than stick to the first digit (pos 1).
  if (prevCaretPos === 0 && !isDeleteForwards) {
    return 0;
  }
  let relevantCharCount = 0;
  for (let i = 0; i < formattedValue.length; i++) {
    //* Count this as a relevant char if it's a + or a digit.
    if (/[+0-9]/.test(formattedValue[i])) {
      relevantCharCount++;
    }

    //* Normal case: stop when you hit the right number of relevant chars
    //* (cursor will be just after the final relevant char).
    if (relevantCharCount === relevantChars && !isDeleteForwards) {
      return i + 1;
    }
    //* Spacial case: delete forwards (fn + delete on a mac):
    //* Wait until hit one extra relevant char, and put the cursor just before it (after any formatting chars).
    if (isDeleteForwards && relevantCharCount === relevantChars + 1) {
      return i;
    }
  }
  return formattedValue.length;
};