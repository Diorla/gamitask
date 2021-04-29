/**
 * TODO: This will only remove the first occurrence.
 * Pass third args to make it remove all occurrence or after a particular index
 * This will remove an item from a list
 * @param item the item from a list to be removed
 * @param list list that contains the item
 * @returns a new array, excluding the item
 */
export default function removeItemFromArray<type>(item: type, list: type[]) {
  const idx = list.findIndex((listItem) => item === listItem);
  if (idx < 0) return list;
  return [...list.slice(0, idx), ...list.slice(idx + 1)];
}
