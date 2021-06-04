import formatMsToCountDown from "../../services/formatMsToCountDown";

export default function CountDown({ time }: { time: number }): JSX.Element {
  return time ? (
    <span>{formatMsToCountDown(time)}</span>
  ) : (
    <span>00:00:00</span>
  );
}
