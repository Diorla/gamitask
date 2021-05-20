import React from "react";
import { Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import TaskSelect from "./TaskSelect";
import TimerSelect from "./TimeSelect";

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
    <div>
      <Form.Group controlId="name">
        <Form.Label>
          <FormattedMessage id="labelName" defaultMessage="Name" />
        </Form.Label>
        <Form.Control
          onChange={onChangeName}
          value={name}
          className="mb-2"
          style={{ fontSize: "1.4rem" }}
        />
      </Form.Group>
      <Form.Group controlId="reward-select">
        <Form.Label>Reward type</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={onChangeType}
          className="mb-2"
          style={{ fontSize: "1.4rem" }}
        >
          <option value="timed">Timed</option>
          <option value="task">Task</option>
        </Form.Control>
      </Form.Group>
      {type === "timed" && (
        <TimerSelect onChangeTime={onChangeTime} value={time} />
      )}
      {type === "task" && (
        <TaskSelect value={task} onChangeTask={onChangeTask} />
      )}
      <Form.Group controlId="note">
        <Form.Label>Note</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={onChangeNote}
          value={note}
          className="mb-2"
        />
      </Form.Group>
    </div>
  );
}
