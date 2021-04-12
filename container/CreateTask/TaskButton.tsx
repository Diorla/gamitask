import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import fetchData from "../../scripts/fetchData";
import uniqueArray from "../../scripts/uniqueArray";
import { useTaskState, useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import initialState from "../../context/taskContext/initialState";

export const Button = styled.button`
  font-size: 16px;
  font-family: monospace;
  border: none;
  background: purple;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
  }
`;

const trim = (str: string) => str.trim();

const removeEmpty = (str: string) => !!str;
/**
 * ?//TODO: Validate data before submit
 * required: name, startTime, event
 * autogenerated: priority, difficulty
 * conditional
 * - If it's once, no need
 * - If it's n-times or forever, then I have to provide one of the following: daily, weekly, monthly or yearly, and fill it accordingly
 * - if it's n-times, the value cannot be 0 or 1 (instead, go for once)
 * @returns
 */
export default function TaskButton() {
  const data = useTaskState();
  const { loadingUser, user } = useUser();
  const [labels, setLabels] = useState([]);
  const { name, label } = data;
  const taskDispatch = useTaskDispatch();

  useEffect(() => {
    fetchData("user", `${user.uid}`)
      .then((data) => {
        if (data) {
          const { labels } = data;
          labels && setLabels(labels);
        }
      })
      .catch((err) => toast.error(err));
  }, []);

  const uploadTask = () => {
    // TODO: id = data.id || v4(), this will be useful in editing tasks
    const id = v4();
    const labelList = label
      .split(",")
      .map(trim)
      .filter(removeEmpty)
      .map((item: any) => item);

    createData("user", user.uid, {
      labels: uniqueArray([...labels, ...labelList]),
    })
      .then(() => {
        createData("user", `${user.uid}/tasks/${id}`, {
          id,
          ...data,
        })
          .then(() => {
            toast.success("Task created");
          })
          .catch((err) => {
            toast.error(`${err}`);
          });
      })
      .then(() => {
        taskDispatch(
          addTask({
            ...initialState,
          })
        );
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };
  if (loadingUser) return null;
  return (
    <>
      <Button disabled={!name} onClick={uploadTask}>
        Save
      </Button>
    </>
  );
}
