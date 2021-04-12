import getDateTimeString from "../../scripts/getDateTimeString";

export default {
  name: "",
  event: "once",
  reminder: {
    type: "daily",
    nth: false,
    count: 1,
    days: [],
    months: [],
  },
  startTime: getDateTimeString(new Date()),
  label: "",
  priority: 1,
  difficulty: 1,
  project: "Unsorted",
  showModal: false,
};
