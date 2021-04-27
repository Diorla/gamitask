import React from "react";
import RewardProps from "../../props/Reward";
import PointReward from "./PointReward";
import TaskReward from "./TaskReward";
import TimeReward from "./TimeReward";

export default function RewardCard({
  rewardInfo,
  point,
  perHour,
  onCheck,
}: {
  rewardInfo: RewardProps;
  point: number;
  perHour: number;
  onCheck: () => void;
}) {
  if (rewardInfo.type === "task")
    return <TaskReward rewardInfo={rewardInfo} onCheck={onCheck} />;
  else if (rewardInfo.type === "point")
    return (
      <PointReward rewardInfo={rewardInfo} point={point} onCheck={onCheck} />
    );
  return (
    <TimeReward
      rewardInfo={rewardInfo}
      point={point}
      perHour={perHour}
      onCheck={onCheck}
    />
  );
}
