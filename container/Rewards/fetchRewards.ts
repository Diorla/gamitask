import React from "react";
import { toast } from "react-toastify";
import RewardProps from "../../props/Reward";
import getRewards from "../../services/getRewards";
import UserInfo from "../../props/UserInfo";

export default function fetchRewards(
  user: UserInfo,
  setRewards: React.Dispatch<React.SetStateAction<RewardProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): void {
  user.uid &&
    getRewards(user.uid, (rewards) => setRewards(rewards))
      .then(() => setLoading(false))
      .catch((err) => toast.error(err.message));
}
