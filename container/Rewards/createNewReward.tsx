import RewardProps from "../../props/Reward";
import createReward from "../../services/createReward";
import initialState from "./initialState";
import UserInfo from "../../props/UserInfo";

export function createNewReward(
  value: RewardProps,
  user: UserInfo,
  setValue: (arg0: RewardProps) => void,
  setIsAddVisible: (arg0: boolean) => void
): void {
  createReward(value, user.uid, () => {
    setValue(initialState);
    setIsAddVisible(false);
  });
}
