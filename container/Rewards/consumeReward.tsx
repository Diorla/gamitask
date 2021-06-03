import RewardProps from "../../props/Reward";
import UserInfo from "../../props/UserInfo";
import consumeTaskReward from "./consumeTaskReward";
import consumeTimeReward from "./consumeTimeReward";

export default function consumeReward(
  taskInfo: RewardProps,
  user: UserInfo
): void {
  if (taskInfo.type === "timed") consumeTimeReward(taskInfo, user);
  if (taskInfo.type === "task") consumeTaskReward(taskInfo, user);
}
