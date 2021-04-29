import React from "react";
import RewardProps from "../../props/Reward";
import Card from "./Card";

const PointReward = ({
  rewardInfo,
  point: pt,
  onCheck,
  toggleEdit,
}: {
  rewardInfo: RewardProps;
  point: number;
  onCheck: () => void;
  toggleEdit: () => void;
}) => {
  const { name, done = [], point } = rewardInfo;
  const disabled = point >= pt;
  return (
    <Card
      toggleEdit={toggleEdit}
      title={name}
      done={done}
      onCheck={onCheck}
      disabled={disabled}
      id={rewardInfo.id}
    >
      Point: {point}
    </Card>
  );
};

export default PointReward;
