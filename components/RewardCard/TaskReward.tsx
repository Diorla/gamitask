import React from "react";
import Card from "./Card";
import Checked from "./Checked";
import RewardProps from "../../props/Reward";

const TaskReward = ({
  rewardInfo,
  onCheck,
  toggleEdit,
}: {
  rewardInfo: RewardProps;
  onCheck: () => void;
  toggleEdit: () => void;
}) => {
  const { name, task, checklist = [], done = [] } = rewardInfo;
  const disabled = checklist?.length < task.length;
  return (
    <Card
      toggleEdit={toggleEdit}
      title={name}
      done={done}
      onCheck={onCheck}
      disabled={disabled}
      id={rewardInfo.id}
      taskList={rewardInfo.task}
      notes={rewardInfo.notes}
    >
      {task.map((item, idx) => (
        <Checked active={Boolean(checklist?.includes(item.value))} key={idx}>
          {item.label}
        </Checked>
      ))}
    </Card>
  );
};

export default TaskReward;
