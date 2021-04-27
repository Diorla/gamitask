/**
 * turns milliseconds to an hour - minute - seconds time format
 * @param ms time in milliseconds
 * @returns object
 * @example formatMsToCountDown(10000000) // {hh: 2, mm: 46, ss: 40}
 */
export default function formatMsToCountDown(ms: number) {
  let remainderMS = ms;
  const hh = Math.floor(remainderMS / 3600000);
  remainderMS = remainderMS - hh * 3600000;
  const mm = Math.floor(remainderMS / 60000);
  remainderMS = remainderMS - mm * 60000;
  const ss = Math.floor(remainderMS / 1000);
  return { hh, mm, ss };
}
