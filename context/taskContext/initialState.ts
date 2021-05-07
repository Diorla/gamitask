import dayjs from "dayjs";
import TaskProps from "../../props/Task";

const initialState: TaskProps = {
  id: "",
  name: "",
  repeat: false,
  date: dayjs().format("YYYY-MM-DD"),
  time: dayjs().format("hh:mm"),
  reminder: {
    dateInMonth: new Date().getDate(),
    type: "daily",
    days: [new Date().getDay()],
    months: [new Date().getMonth()],
  },
  labels: "",
  priority: 1,
  difficulty: 1,
  project: "Unsorted",
  done: [],
  countdowns: {},
  points: {},
  showModal: false,
  modified: Date.now(),
  archive: 0,
  rewards: [],
  lastCompleted: 0,
  streak: 0,
  timed: false,
  note: "",
};

export default initialState;
