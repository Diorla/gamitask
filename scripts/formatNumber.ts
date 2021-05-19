export default function formatNumber(num: number) {
  if (num > 999999999999) return Math.floor(num / 1000000000000) + "T";
  if (num > 999999999) return Math.floor(num / 1000000000) + "B";
  if (num > 999999) return Math.floor(num / 1000000) + "M";
  if (num > 999) return Math.floor(num / 1000) + "K";
}
