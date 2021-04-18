import dayjs from "dayjs";

const getTimeMs = (time: string) => {
  const [hh, mm] = time.split(":");
  return dayjs().set("hour", Number(hh)).set("minute", Number(mm)).valueOf();
};

export default getTimeMs;
