import getDateTimeString from "../../scripts/getDateTimeString";

export default {
  name: "",
  reminder: {
    type: "daily",
    nth: false,
    count: 1,
    startDate: getDateTimeString(new Date()),
    time: "",
    weekdays: [],
    date: "",
    months: [],
  },
  dueDate: "",
  label: "",
  priority: 1,
  difficulty: 1,
  project: "Unsorted",
  showModal: false,
};
