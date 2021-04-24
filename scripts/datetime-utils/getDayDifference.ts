export default function getDayDifference(prev: number, current: number) {
  if (current > prev) return current - prev;
  else {
    return current - prev + 7;
  }
}
