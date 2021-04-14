import dayjs from "dayjs";

const isToday = (startTime: dayjs.ConfigType) => dayjs(startTime).isToday();

export default isToday;
