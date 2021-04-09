/**
 * The purpose is to ensure that my dates are padded, so 7 becomes "07" while 57 becomes "57"
 * @param value single or double digit number or string
 * @returns string of length 2
 */
export const padWithZero = (value: string | number) => ("0" + value).slice(-2);

/**
 * While Date.toISOString() will return the same format, the problem is that it always returns
 * UTC. I need something that will consider the locale of the user for ui purposes
 * @param date the date to format
 * @returns "yyyy-mm-ddThh:mm"
 * @example getDateTimeString(new Date()); // "21-03-09T07:29"
 */
export default function getDateTimeString(date: Date) {
  const yyyy = date.getFullYear()
  const mth = padWithZero(date.getMonth()+1);
  const dd = padWithZero(date.getDate());
  const hh = padWithZero(date.getHours());
  const mm = padWithZero(date.getMinutes());
  return `${yyyy}-${mth}-${dd}T${hh}:${mm}`;
}
