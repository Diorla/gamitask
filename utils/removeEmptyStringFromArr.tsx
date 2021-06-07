/**
 * Used used in array.filter to indicate that the value is empty and should be removed from the array
 * @param str string
 * @returns boolean
 * @example ["", "hello"].filter(removeEmptyStringFromArr) // ["hello"]
 */
const removeEmptyStringFromArr = (str: string): boolean => !!str;
export default removeEmptyStringFromArr;
