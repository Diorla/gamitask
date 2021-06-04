import React from "react";
import Card from "./Card";
import RewardProps from "../../props/Reward";
import Status from "./Status";

const TaskReward = ({
  rewardInfo,
  onCheck,
  toggleEdit,
}: {
  rewardInfo: RewardProps;
  onCheck: () => void;
  toggleEdit: () => void;
}): JSX.Element => {
  const { task, checklist = [] } = rewardInfo;
  const disabled = checklist?.length < task.length;
  return (
    <Card
      toggleEdit={toggleEdit}
      onCheck={onCheck}
      disabled={disabled}
      reward={rewardInfo}
    >
      <Status data={task} checklist={checklist} />
    </Card>
  );
};

export default TaskReward;
