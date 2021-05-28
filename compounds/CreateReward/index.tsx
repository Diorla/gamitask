import React from "react";
import Stack from "../../atoms/Stack";
import FormInput from "../../molecules/FormInput";
import FormSelect from "../../molecules/FormSelect";
import FormTextArea from "../../molecules/FormTextArea";
import TaskSelect from "./TaskSelect";
import TimerSelect from "./TimeSelect";

const rewardTypeList = [
  {
    label: "pointBased",
    value: "timed",
  },
  {
    label: "taskBased",
    value: "task",
  },
];
export interface CreateRewardProps {
  onChangeName: (e: any) => void;
  onChangeType: (e: any) => void;
  onChangeTime: (e: any) => void;
  onChangeTask: (e: any[]) => void;
  onChangeNote: (e: any) => void;
  name: string;
  time: number;
  type: "timed" | "task";
  task: any[];
  note: string;
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
}: CreateRewardProps): JSX.Element {
  return (
    <Stack style={{ marginTop: "0.4rem" }}>
      <FormInput
        label="name"
        onChange={onChangeName}
        value={name}
        placeholder="name"
      />
      <FormSelect
        label="rewardType"
        onChange={onChangeType}
        value={type}
        list={rewardTypeList}
      />
      {type === "timed" && (
        <TimerSelect onChangeTime={onChangeTime} value={time} />
      )}
      {type === "task" && (
        <TaskSelect value={task} onChangeTask={onChangeTask} />
      )}
      <FormTextArea
        rows={4}
        onChange={onChangeNote}
        value={note}
        label="note"
        placeholder="note"
      />
    </Stack>
  );
}
