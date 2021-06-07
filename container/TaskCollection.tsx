import React from "react";
import H2 from "../atoms/H2";
// import styled from "styled-components";
import TaskCard from "../compounds/TaskCard";
import { useUser } from "../context/userContext";
import Task from "../props/Task";

// const Title = styled.h2`
//   margin-left: 0.2rem;
//   text-align: center;
// `;

export default function TaskCollection({
  data,
  type,
  title,
}: {
  data: Task[];
  type: "today" | "others" | "collection";
  title: string;
}): JSX.Element | null {
  const {
    user: { runningTask },
  } = useUser();

  const isCurrent = type === "today";
  /**
   * I only need the "type === collection" to determine whether the title should be
   * translated.
   * For tasks, I only need today(today, completed or overdue) and others (not today)
   */
  const TaskType = isCurrent ? "today" : "others";
  if (data && data.length)
    return (
      <div>
        {type !== "collection" && (
          <H2 style={{ textAlign: "center" }}>{title}</H2>
        )}
        {type === "collection" && (
          <h2 style={{ textAlign: "center" }}>{title}</h2>
        )}
        <div>
          {data.map((item: any) => {
            if (isCurrent && runningTask.id && runningTask.id === item.id)
              return null;
            return <TaskCard data={item} key={item.id} type={TaskType} />;
          })}
        </div>
      </div>
    );
  return null;
}
