export default function addRemoveItemFromArray<type>(item: type, arr: type[]) {
  if (arr.includes(item)) {
    const idx = arr.indexOf(item);
    return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
  }
  return [...arr, item];
}
