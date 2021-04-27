import React from "react";
import Card from "./Card";
import Checked from "./Checked";
import RewardProps from "../../props/Reward";

const TaskReward = ({
  rewardInfo,
  onCheck,
}: {
  rewardInfo: RewardProps;
  onCheck: () => void;
}) => {
  const { name, task, checklist = [], done = [] } = rewardInfo;
  const disabled = checklist?.length < task.length;
  return (
    <Card title={name} done={done} onCheck={onCheck} disabled={disabled}>
      {task.map((item, idx) => (
        <Checked active={Boolean(checklist?.includes(item.value))} key={idx}>
          {item.label}
        </Checked>
      ))}
    </Card>
  );
};

export default TaskReward;
