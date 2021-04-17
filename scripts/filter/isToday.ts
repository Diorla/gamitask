import dayjs from "dayjs";
import Today from "dayjs/plugin/isToday";
dayjs.extend(Today);

const isToday = (startTime: dayjs.ConfigType) => dayjs(startTime).isToday();

export default isToday;
