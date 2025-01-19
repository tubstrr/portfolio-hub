/**
 * Converts a date string to a localized date string.
 * @param date - The date string to convert.
 * @param options - The options to pass to the toLocaleDateString method.
 *                 See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 *                      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#syntax
 * @param lang - The language to pass to the toLocaleDateString method.
 * @returns A localized date string.
 */
export const dateString = (
  date,
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  lang = "en-US",
) => {
  return new Date(date).toLocaleDateString(lang, options);
};

export const schemaString = (
  date,
  options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
  lang = "en-US",
) => {
  return new Date(date).toLocaleDateString(lang, options);
};
