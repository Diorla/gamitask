export type caseType = "title" | "upper" | "lower" | "inverted";

/**
 * new text format
 * @param str text to be formatted
 * @param strCase Title, UPPER, lower, iNVERTED
 * @returns string
 */
const formatText = (str: string, strCase?: caseType) => {
  if (strCase === "title")
    return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
  if (strCase === "lower") str.toLocaleLowerCase();
  if (strCase === "upper") str.toLocaleUpperCase();
  if (strCase === "inverted")
    str.charAt(0).toLocaleLowerCase() + str.slice(1).toLocaleUpperCase();
  return str;
};

export default formatText;
