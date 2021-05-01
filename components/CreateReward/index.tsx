import React from "react";
import Input from "../Form/Input";
import RewardProps from "../../props/Reward";
import TaskSelect from "./TaskSelect";
import TimerSelect from "./TimeSelect";

export interface CreateRewardProps extends RewardProps {
  onChangeName: (e: any) => void;
  onChangeType: (e: any) => void;
  onChangePoint: (e: any) => void;
  onChangeTime: (e: any) => void;
  onChangeTask: (e: any[]) => void;
  onChangeNotes: (e: any) => void;
}

export default function CreateReward({
  name,
  type,
  point,
  time,
  task,
  notes,
  onChangeName,
  onChangeType,
  onChangePoint,
  onChangeTime,
  onChangeTask,
  onChangeNotes,
}: CreateRewardProps) {
  return (
    <div>
      <Input label="Name" value={name} onChange={onChangeName} />
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
      <textarea onChange={onChangeNotes} value={notes} />
    </div>
  );
}
