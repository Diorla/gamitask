/**
 * Used to filter and return array of unique items
 * @param arr a list of items
 * @returns array containing unique items
 */
export default function uniqueArray(arr: Iterable<any>) {
  return Array.from(new Set(arr));
}
