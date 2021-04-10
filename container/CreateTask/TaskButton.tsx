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
      .catch((err) => console.log({ err }));
  }, []);

  const uploadTask = () => {
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
