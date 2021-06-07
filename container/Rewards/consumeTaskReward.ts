import { toast } from "react-toastify";
import createData from "../../scripts/createData";
import RewardProps from "../../props/Reward";
import UserInfo from "../../props/UserInfo";

export default function consumeTaskReward(
  taskInfo: RewardProps,
  user: UserInfo
): void {
  const { name, id, doneList = [] } = taskInfo;
  createData("user", `${user.uid}/rewards/${id}`, {
    checkedTaskIdList: [],
    doneList: [...doneList, Date.now()],
  })
    .then(() => toast.info(`${name} done`))
    .catch((err) => toast.error(err.message));
}
