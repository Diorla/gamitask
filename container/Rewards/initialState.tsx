import RewardProps from "../../props/Reward";
import toMS from "../../scripts/toMS";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "timed",
  taskList: [],
  point: 0,
  doneList: [],
  note: "",
};
export default initialState;
