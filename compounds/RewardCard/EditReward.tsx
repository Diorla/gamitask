import React, { useState } from "react";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import Line from "../../atoms/Line";
import Stack from "../../atoms/Stack";
import { createReward } from "../../services/createReward";
import { useUser } from "../../context/userContext";
import Reward from "../../props/Reward";
import CreateReward from "../CreateReward";

export default function EditReward({
  initValue,
  toggleEdit,
}: {
  initValue: Reward;
  toggleEdit: () => void;
}): JSX.Element {
  const [value, setValue] = useState(initValue);
  const { user } = useUser();
  return (
    <Card
      elevation={1}
      style={{
        padding: "0.4rem",
        alignItems: "center",
        marginBottom: "1.2rem",
      }}
    >
      <Stack>
        <CreateReward
          name={value.name}
          onChangeName={(e) => setValue({ ...value, name: e.target.value })}
          type={value.type}
          onChangeType={(e) => setValue({ ...value, type: e.target.value })}
          time={value.time}
          onChangeTime={(ev) => setValue({ ...value, time: ev })}
          task={value.task}
          onChangeTask={(e) => setValue({ ...value, task: e })}
          note={value.note}
          onChangeNote={(e) => setValue({ ...value, note: e.target.value })}
        />
        <Line style={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => createReward(value, user, setValue, toggleEdit)}
            variant="info"
            style={{ marginRight: "0.4rem" }}
          >
            updateReward
          </Button>
          <Button onClick={toggleEdit} variant="warning">
            close
          </Button>
        </Line>
      </Stack>
    </Card>
  );
}
