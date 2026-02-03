export const getIsAndroid = (): boolean =>
  typeof navigator !== "undefined" ? /Android/i.test(navigator.userAgent) : false;
