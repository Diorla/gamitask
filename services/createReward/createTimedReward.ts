import { toast } from "react-toastify";
import { v4 } from "uuid";
import Reward from "../../props/Reward";
import createData from "../../scripts/createData";

const createTimedReward = (
  reward: Reward,
  userId: string,
  callback: () => void
) => {
  const id = v4();
  createData("user", `${userId}/rewards/${id}`, {
    id,
    ...reward,
    task: [],
  })
    .then(callback)
    .then(() => toast.success("New reward created"))
    .catch((err) => toast.error(err.message));
};

export default createTimedReward;
