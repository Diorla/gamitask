import React, { useState } from "react";
import RewardProps from "../../props/Reward";
import EditableReward from "./EditableReward";
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
  const [editable, setEditable] = useState(false);
  if (editable)
    return (
      <EditableReward init={rewardInfo} toggleEdit={() => setEditable(false)} />
    );

  if (rewardInfo.type === "task")
    return (
      <TaskReward
        rewardInfo={rewardInfo}
        onCheck={onCheck}
        toggleEdit={() => setEditable(true)}
      />
    );
  if (rewardInfo.type === "point")
    return (
      <PointReward
        rewardInfo={rewardInfo}
        point={point}
        onCheck={onCheck}
        toggleEdit={() => setEditable(true)}
      />
    );
  return (
    <TimeReward
      rewardInfo={rewardInfo}
      point={point}
      perHour={perHour}
      onCheck={onCheck}
      toggleEdit={() => setEditable(true)}
    />
  );
}
