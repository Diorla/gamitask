import TaskProps from "../../props/Task";

const initialState: TaskProps = {
  id: "",
  name: "",
  repeat: false,
  date: "",
  time: "",
  reminder: {
    dateInMonth: 1,
    type: "daily",
    days: [],
    months: [],
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
};

export default initialState;
