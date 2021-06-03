import RewardProps from "../../props/Reward";
import toMS from "../../scripts/toMS";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "timed",
  task: [],
  point: 0,
  done: [],
  note: "",
};
export default initialState;
