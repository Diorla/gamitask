import RewardProps from "../../props/Reward";
import validateReward from "./validateReward";
import initialState from "../../container/Rewards/initialState";
import UserInfo from "../../props/UserInfo";

export function createReward(
  value: RewardProps,
  user: UserInfo,
  setValue: (arg0: RewardProps) => void,
  setIsAddVisible: (arg0: boolean) => void
): void {
  validateReward(value, user.uid, () => {
    setValue(initialState);
    setIsAddVisible(false);
  });
}
