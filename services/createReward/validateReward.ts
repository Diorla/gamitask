import { toast } from "react-toastify";
import Reward from "../../props/Reward";
import createTaskReward from "./createTaskReward";
import createTimedReward from "./createTimedReward";

const validateReward = (
  reward: Reward,
  userId: string,
  callback: () => void
): void => {
  if (!reward.name) {
    toast.warn("Please provide a name");
    return;
  }
  if (reward.type === "task") {
    if (reward.task.length) createTaskReward(reward, userId, callback);
    else toast.warn("Please add task to the list");
  } else {
    if (reward.type === "timed" && reward.time === 0) {
      toast.warn("Please set a time");
      return;
    }
    createTimedReward(reward, userId, callback);
  }
};

export default validateReward;
