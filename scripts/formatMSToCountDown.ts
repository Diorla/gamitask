export type numberType = {
  hh: number;
  mm: number;
  ss: number;
};

export type stringType = {
  hh: string;
  mm: string;
  ss: string;
};
function formatMsToCountDown(ms: number): numberType;
function formatMsToCountDown(ms: number, isString: true): stringType;
/**
 * turns milliseconds to an hour - minute - seconds time format
 * @param ms time in milliseconds
 * @returns object
 * @example formatMsToCountDown(10000000) // {hh: 2, mm: 46, ss: 40}
 */
function formatMsToCountDown(ms: number, isString?: true): any {
  let remainderMS = ms;
  const hh = Math.floor(remainderMS / 3600000);
  remainderMS = remainderMS - hh * 3600000;
  const mm = Math.floor(remainderMS / 60000);
  remainderMS = remainderMS - mm * 60000;
  const ss = Math.floor(remainderMS / 1000);
  if (isString)
    return {
      hh: ("0" + hh).slice(-2),
      mm: ("0" + mm).slice(-2),
      ss: ("0" + ss).slice(-2),
    };
  return { hh, mm, ss };
}

export default formatMsToCountDown;
