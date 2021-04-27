import React from "react";
import Input from "../../components/Form/Input";
import RewardProps from "../../props/Reward";
import TaskSelect from "./TaskSelect";
import TimerSelect from "./TimeSelect";

export interface CreateRewardProps extends RewardProps {
  onChangeName: (e: any) => void;
  onChangeType: (e: any) => void;
  onChangePoint: (e: any) => void;
  onChangeTime: (e: any) => void;
  onChangeTask: (e: any[]) => void;
}

export default function CreateReward({
  name,
  type,
  point,
  time,
  task,
  onChangeName,
  onChangeType,
  onChangePoint,
  onChangeTime,
  onChangeTask,
}: CreateRewardProps) {
  return (
    <div>
      <Input label="Name" value={name} onChange={onChangeName} />
      <select value={type} onChange={onChangeType}>
        <option value="point">Point</option>
        <option value="timed">Timed</option>
        <option value="task">Task</option>
      </select>
      {type === "point" && (
        <Input
          label="Point"
          value={point}
          onChange={onChangePoint}
          type="number"
          min="1"
        />
      )}
      {type === "timed" && (
        <TimerSelect onChangeTime={onChangeTime} value={time} />
      )}
      {type === "task" && (
        // <Input label="Value" value={task} onChange={onChangeTask} />
        <TaskSelect value={task} onChangeTask={onChangeTask} />
      )}
    </div>
  );
}
