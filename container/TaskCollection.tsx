import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import styled from "styled-components";
import TaskCard from "../components/TaskCard";

const Title = styled.h3`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default function TaskCollection({ data, type, title }) {
  const [expanded, setExpanded] = useState(true);
  if (data && data.length)
    return (
      <div>
        <Title onClick={() => setExpanded(!expanded)}>
          {expanded ? <MdExpandLess /> : <MdExpandMore />}
          {title}
        </Title>
        {expanded && (
          <div>
            {data.map((item: any) => (
              <TaskCard data={item} key={item.id} type={type} />
            ))}
          </div>
        )}
      </div>
    );
  return null;
}
