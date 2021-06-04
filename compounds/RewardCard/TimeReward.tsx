import React from "react";
import RewardProps from "../../props/Reward";
import formatMsToCountDown from "../../scripts/formatMSToCountDown";
import toMS from "../../scripts/toMS";
import Card from "./Card";
import Status from "./Status";

const TimeReward = ({
  rewardInfo,
  point,
  perHour,
  onCheck,
  toggleEdit,
}: {
  rewardInfo: RewardProps;
  point: number;
  perHour: number;
  onCheck: () => void;
  toggleEdit: () => void;
}): JSX.Element => {
  const { time } = rewardInfo;
  const data = formatMsToCountDown(time);
  const timeToPoints = (time * perHour) / toMS(1, "hour");
  const disabled = timeToPoints >= point;
  return (
    <Card
      toggleEdit={toggleEdit}
      onCheck={onCheck}
      disabled={disabled}
      reward={rewardInfo}
    >
      <Status data={data} />
    </Card>
  );
};

export default TimeReward;
