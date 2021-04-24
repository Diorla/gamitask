export default function getMonthDifference(prev: number, current: number) {
  if (current > prev) return current - prev;
  else {
    return current - prev + 12;
  }
}
