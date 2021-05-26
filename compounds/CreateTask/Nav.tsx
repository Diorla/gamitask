import React from "react";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import styled from "styled-components";
import { useTaskState } from "../../context/taskContext";
import {
  ReminderIcon,
  LabelIcon,
  PriorityIcon,
  ProjectIcon,
  NoteIcon,
} from "./Icon";
const difficultyColours = [
  <FcLowPriority style={{ fontSize: "2.1rem" }} />,
  <FcMediumPriority style={{ fontSize: "2.1rem" }} />,
  <FcHighPriority style={{ fontSize: "2.1rem" }} />,
];
const priorityColours = ["#00796b", "#689f38", "#ffeb3b", "#ff9800", "#e83c3d"];

const DifficultyIcon = ({
  difficulty,
  onClick,
}: {
  difficulty: number;
  onClick: () => void;
}) => (
  <span onClick={onClick} style={{ cursor: "pointer" }}>
    {difficultyColours[difficulty - 1]}
  </span>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-evenly;
  & > *:hover {
    opacity: 0.8;
  }
`;

export default function Nav({
  currentSection,
  setCurrentSection,
}: {
  currentSection: string;
  setCurrentSection: (e: string) => void;
}) {
  const { difficulty, labels, priority, project, time, note } = useTaskState();

  return (
    <Wrapper>
      <ReminderIcon
        colour="#87bc43"
        active={!!time}
        onClick={() => {
          currentSection === "DueDate"
            ? setCurrentSection("")
            : setCurrentSection("DueDate");
        }}
      />
      <LabelIcon
        colour="#ffac03"
        active={!!labels}
        onClick={() => {
          currentSection === "Label"
            ? setCurrentSection("")
            : setCurrentSection("Label");
        }}
      />
      <DifficultyIcon
        difficulty={difficulty}
        onClick={() => {
          currentSection === "Difficulty"
            ? setCurrentSection("")
            : setCurrentSection("Difficulty");
        }}
      />
      <PriorityIcon
        colour={priorityColours[priority - 1]}
        active={!!priority}
        onClick={() => {
          currentSection === "Priority"
            ? setCurrentSection("")
            : setCurrentSection("Priority");
        }}
      />
      <ProjectIcon
        colour="#7843bc"
        active={project !== "Unsorted"}
        onClick={() => {
          currentSection === "Project"
            ? setCurrentSection("")
            : setCurrentSection("Project");
        }}
      />
      <NoteIcon
        colour="#7B3F00"
        active={!!note}
        onClick={() => {
          currentSection === "Note"
            ? setCurrentSection("")
            : setCurrentSection("Note");
        }}
      />
    </Wrapper>
  );
}
