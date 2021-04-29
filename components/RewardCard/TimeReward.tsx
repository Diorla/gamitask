import React from "react";
import RewardProps from "../../props/Reward";
import formatMsToCountDown from "../../scripts/formatMSToCountDown";
import toMS from "../../scripts/toMS";
import Card from "./Card";
import { Time } from "./Styled";

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
}) => {
  const { name, time, done = [] } = rewardInfo;
  const { hh, mm, ss } = formatMsToCountDown(time);
  const timeToPoints = (time * perHour) / toMS(1, "hour");
  const disabled = timeToPoints >= point;
  return (
    <Card
      toggleEdit={toggleEdit}
      title={name}
      done={done}
      onCheck={onCheck}
      disabled={disabled}
    >
      <Time>
        <span>{("0" + hh).slice(-2)}</span>
        <span>hh</span>
      </Time>
      <Time>
        <span>{("0" + mm).slice(-2)}</span>
        <span>mm</span>
      </Time>
      <Time>
        <span>{("0" + ss).slice(-2)}</span>
        <span>ss</span>
      </Time>
    </Card>
  );
};

export default TimeReward;
