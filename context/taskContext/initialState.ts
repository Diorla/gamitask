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
};

export default initialState;
