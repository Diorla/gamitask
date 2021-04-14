import dayjs from "dayjs";

const isBeforeNow = (startTime: dayjs.ConfigType) =>
  dayjs(startTime).isBefore(new Date());

export default isBeforeNow;
