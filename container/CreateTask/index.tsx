import React, { useState } from "react";
import styled from "styled-components";
import { TaskProvider } from "./context/Task";
import {
  ReminderIcon,
  DueDateIcon,
  LabelIcon,
  PriorityIcon,
  DifficultyIcon,
  ProjectIcon,
} from "./Icon";
import Routing from "./Routing";
import TaskButton from "./TaskButton";
import TaskName from "./TaskName";

const Styled = styled.div`
  color: black;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  align-items: center;
`;

export default function CreateTask() {
  const [currentSection, setCurrentSection] = useState("");

  return (
    <TaskProvider>
      <Styled>
        <TaskName />
        <Controls>
          <div>
            <ReminderIcon
              colour="red"
              active={currentSection === "Reminder"}
              onClick={() => setCurrentSection("Reminder")}
            />
            <DueDateIcon
              colour="#87bc43"
              active={currentSection === "DueDate"}
              onClick={() => setCurrentSection("DueDate")}
            />
            <LabelIcon
              colour="#ffac03"
              active={currentSection === "Label"}
              onClick={() => setCurrentSection("Label")}
            />
            <PriorityIcon
              colour="#329b52"
              active={currentSection === "Priority"}
              onClick={() => setCurrentSection("Priority")}
            />
            <DifficultyIcon
              colour="rgb(244, 67, 54)"
              active={currentSection === "Difficulty"}
              onClick={() => setCurrentSection("Difficulty")}
            />
            <ProjectIcon
              colour="#7843bc"
              active={currentSection === "Project"}
              onClick={() => setCurrentSection("Project")}
            />
          </div>
          <TaskButton />
        </Controls>
        <div>{currentSection && <Routing route={currentSection} />}</div>
      </Styled>
    </TaskProvider>
  );
}
