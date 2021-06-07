/**
 * Removes trailing and initial spaces. Should be used
 * @param str string
 * @returns string
 * @example [" hello ", "hello ", " hello"].map(trimSpace) //["hello", "hello", "hello"]
 */
const trimSpace = (str: string): string => str.trim();

export default trimSpace;
