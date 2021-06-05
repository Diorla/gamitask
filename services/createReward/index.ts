import RewardProps from "../../props/Reward";
import validateReward from "./validateReward";
import initialState from "../../container/Rewards/initialState";
import UserInfo from "../../props/UserInfo";
import Task from "../../props/Task";

export function createReward(
  value: RewardProps,
  user: UserInfo,
  allTask: Task[],
  setValue: (arg0: RewardProps) => void,
  setIsAddVisible: (arg0: boolean) => void
): void {
  validateReward(value, user.uid, allTask, () => {
    setValue(initialState);
    setIsAddVisible(false);
  });
}
