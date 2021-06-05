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
  const { taskList = [], checkedTaskIdList = [] } = rewardInfo;
  const disabled = checkedTaskIdList?.length < taskList.length;
  return (
    <Card
      toggleEdit={toggleEdit}
      onCheck={onCheck}
      disabled={disabled}
      reward={rewardInfo}
    >
      <Status data={taskList} checklist={checkedTaskIdList} />
    </Card>
  );
};

export default TaskReward;
