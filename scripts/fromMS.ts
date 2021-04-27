export default function fromMS(
  value: number,
  type: "millisecond" | "second" | "minute" | "hour" | "day"
) {
  let totalTime = value;
  switch (type) {
    case "millisecond":
      return totalTime;
    case "second":
      return totalTime / 1000;
    case "minute":
      return totalTime / (1000 * 60);
    case "hour":
      return totalTime / (1000 * 60 * 60);
    case "day":
      return totalTime / (1000 * 60 * 60 * 24);
  }
}
