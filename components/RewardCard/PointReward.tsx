import React from "react";
import RewardProps from "../../props/Reward";
import Card from "./Card";

const PointReward = ({
  rewardInfo,
  point: pt,
  onCheck,
}: {
  rewardInfo: RewardProps;
  point: number;
  onCheck: () => void;
}) => {
  const { name, done = [], point } = rewardInfo;
  const disabled = point >= pt;
  return (
    <Card title={name} done={done} onCheck={onCheck} disabled={disabled}>
      Point: {point}
    </Card>
  );
};

export default PointReward;
