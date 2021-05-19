import dayjs from "dayjs";
import formatMsToCountDown from "../../scripts/formatMSToCountDown";
import formatNumber from "../../scripts/formatNumber";
import formatText from "../../scripts/formatText";
import reminder from "./reminder";

export const formatDate = (row: number): string =>
  new Date(row || 0).toDateString();

export const formatBoolean = (row: boolean): JSX.Element =>
  row ? <span>Yes</span> : <span>No</span>;

/**
 * Streak only exists on untimed tasks
 */
export const formatStreak = (row: number, timed: number): JSX.Element => {
  if (timed) return <span>-</span>;
  return <span>{row}</span>;
};

export const formatPoints = (
  row: { [x: string]: number[] },
  timed: number
): JSX.Element | string => {
  if (timed) return <span>-</span>;
  const keys = Object.keys(row || {});
  let tots = 0;
  keys.forEach((i) => {
    row[i].forEach((j: number) => (tots += j));
  });
  return <span>{formatNumber(tots)}</span>;
};

export const formatCountdown = (
  row: { [x: string]: { length: number }[] },
  timed: number
): JSX.Element | string => {
  if (!timed) return <span>-</span>;
  const keys = Object.keys(row || {});
  let tots = 0;
  keys.forEach((i) => {
    row[i].forEach((j: { length: number }) => (tots += j.length || 0));
  });
  const { hh, mm, ss } = formatMsToCountDown(tots, true);
  return (
    <span>
      {hh}:{mm}:{ss}
    </span>
  );
};

export const formatReminder = (
  type: string,
  repeat: boolean
): JSX.Element | string =>
  !repeat ? <span>Once</span> : <span>{formatText(type, "title")}</span>;

export const formatDone = (
  row: number[],
  countdowns: Record<string, unknown>,
  created: number,
  type: "daily" | "weekly" | "monthly" | "yearly"
): JSX.Element | string => {
  const countdownsList = Object.keys(countdowns);
  const totalDays = dayjs(new Date()).diff(created, reminder[type]);
  // sometimes a user doesn't check a task as done.
  const length =
    row.length > countdownsList.length ? row.length : countdownsList.length;
  return (
    <span>
      {length}/{totalDays}
    </span>
  );
};
