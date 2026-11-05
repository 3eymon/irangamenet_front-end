export function convertToPersianNumbers(str: string) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, function (w) {
    return persianNumbers[+w];
  });
}
export const convertToEnglishNumbers = (str: string): string =>
  str.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (d) => {
    const code = d.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });