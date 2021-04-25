import React from "react";
import styled from "styled-components";
import TaskCard from "../components/TaskCard";
import { useUser } from "../context/userContext";
import Task from "../props/Task";

const Title = styled.h3`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 0.2rem;
`;

export default function TaskCollection({
  data,
  type,
  title,
}: {
  data: Task[];
  type: string;
  title: string;
}) {
  const {
    user: { runningTask },
  } = useUser();
  if (data && data.length)
    return (
      <div>
        <Title>{title}</Title>
        <div>
          {data.map((item: any) => {
            if (runningTask.id && runningTask.id === item.id) return null;
            return <TaskCard data={item} key={item.id} type={type} />;
          })}
        </div>
      </div>
    );
  return null;
}
