import React from "react";
import styled from "styled-components";
import { useTaskDispatch, useTaskState } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import { useUser } from "../../context/userContext";
import FormInput from "../../molecules/FormInput";
import Line from "../../atoms/Line";
import { contrastColor } from "../../scripts/color-functions";
import Stack from "../../atoms/Stack";
import variantProps from "../../props/variantProps";

const trim = (str: string) => str.trim();

const removeEmpty = (str: string) => !!str;
const Badge = styled.span<{ variant?: variantProps }>`
  display: inline-block;
  margin: 0.2rem;
  background: ${({ theme, variant = "primary" }) =>
    theme.palette[variant].main};
  color: ${({ theme, variant = "primary" }) =>
    contrastColor(theme.palette[variant].main)};
  padding: 0.2rem 0.4rem;
  font-size: 1.4rem;
  border-radius: 0.4rem;
`;

export default function Label(): JSX.Element {
  const taskDispatch = useTaskDispatch();
  const task = useTaskState();
  const {
    user: { labels },
  } = useUser();

  const setLabel = (n: string) =>
    taskDispatch(
      addTask({
        ...task,
        labels: n,
      })
    );

  const addToLabel = (label: string) => {
    if (task.labels.includes(label)) return 0;
    const full = `${label}, ${task.labels}`;
    setLabel(full);
  };
  return (
    <Stack>
      <Line style={{ flexWrap: "wrap" }}>
        {labels &&
          labels
            .map(trim)
            .filter(removeEmpty)
            .map((item: any, idx: any) => (
              <Badge
                variant="secondary"
                key={idx}
                onClick={() => addToLabel(item)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </Badge>
            ))}
      </Line>
      <FormInput
        label="label"
        value={task.labels}
        onChange={(e: { target: { value: any } }) =>
          setLabel(e.target.value.toLowerCase())
        }
        placeholder="labels"
      />
      <Line style={{ flexWrap: "wrap" }}>
        {task.labels &&
          task.labels
            .split(",")
            .map(trim)
            .filter(removeEmpty)
            .map((item: any, idx: any) => <Badge key={idx}>{item}</Badge>)}
      </Line>
    </Stack>
  );
}
