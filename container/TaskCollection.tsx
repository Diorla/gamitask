import React from "react";
import styled from "styled-components";
import TaskCard from "../compounds/TaskCard";
import { useUser } from "../context/userContext";
import Task from "../props/Task";

const Title = styled.h2`
  margin-left: 0.2rem;
  text-align: center;
`;

export default function TaskCollection({
  data,
  type,
  title,
}: {
  data: Task[];
  type: string;
  title: string;
}): JSX.Element | null {
  const {
    user: { runningTask },
  } = useUser();

  const isCurrent = type === "today" || type === "overdue";
  if (data && data.length)
    return (
      <div>
        <Title>{title}</Title>
        <div>
          {data.map((item: any) => {
            if (isCurrent && runningTask.id && runningTask.id === item.id)
              return null;
            return <TaskCard data={item} key={item.id} type={type} />;
          })}
        </div>
      </div>
    );
  return null;
}
