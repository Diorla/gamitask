import React from "react";
import Input from "../Form/Input";
import RewardProps from "../../props/Reward";
import TaskSelect from "./TaskSelect";
import TimerSelect from "./TimeSelect";

export interface CreateRewardProps extends RewardProps {
  onChangeName: (e: any) => void;
  onChangeType: (e: any) => void;
  onChangeTime: (e: any) => void;
  onChangeTask: (e: any[]) => void;
  onChangeNote: (e: any) => void;
}

export default function CreateReward({
  name,
  type,
  time,
  task,
  note,
  onChangeName,
  onChangeType,
  onChangeTime,
  onChangeTask,
  onChangeNote,
}: CreateRewardProps) {
  return (
    <div>
      <Input label="labelName" value={name} onChange={onChangeName} />
      <select value={type} onChange={onChangeType}>
        <option value="timed">Timed</option>
        <option value="task">Task</option>
      </select>
      {type === "timed" && (
        <TimerSelect onChangeTime={onChangeTime} value={time} />
      )}
      {type === "task" && (
        <TaskSelect value={task} onChangeTask={onChangeTask} />
      )}
      <textarea onChange={onChangeNote} value={note} />
    </div>
  );
}
