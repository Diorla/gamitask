import { OpUnitType } from "dayjs";

type reminderType = {
  daily: OpUnitType;
  weekly: OpUnitType;
  monthly: OpUnitType;
  yearly: OpUnitType;
};
const reminder: reminderType = {
  daily: "day",
  weekly: "week",
  monthly: "month",
  yearly: "year",
};

export const reminderIndex = {
  daily: 1,
  weekly: 2,
  monthly: 3,
  yearly: 4,
};

export default reminder;
