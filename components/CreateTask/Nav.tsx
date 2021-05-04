import React from "react";
import styled from "styled-components";
import { useTaskState } from "../../context/taskContext";
import {
  ReminderIcon,
  LabelIcon,
  PriorityIcon,
  DifficultyIcon,
  ProjectIcon,
  NoteIcon,
} from "./Icon";

const priorityColours = ["#00796b", "#689f38", "#ffeb3b", "#ff9800", "#e83c3d"];

const difficultyColours = ["rgb(76, 175, 80)", "#ffac03", "#e83c3d"];
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProjectWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.6rem;
`;

// ?TODO: update Reminder.active
/**
 * Use some validation to see if the reminder is valid
 * And then return boolean
 */
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
      <PriorityIcon
        colour={priorityColours[priority - 1]}
        active={!!priority}
        onClick={() => {
          currentSection === "Priority"
            ? setCurrentSection("")
            : setCurrentSection("Priority");
        }}
      />
      <DifficultyIcon
        colour={difficultyColours[difficulty - 1]}
        active={!!difficulty}
        onClick={() => {
          currentSection === "Difficulty"
            ? setCurrentSection("")
            : setCurrentSection("Difficulty");
        }}
      />
      <ProjectWrapper
        onClick={() => {
          currentSection === "Project"
            ? setCurrentSection("")
            : setCurrentSection("Project");
        }}
      >
        <ProjectIcon colour="#7843bc" active={project !== "Unsorted"} />
        {project !== "Unsorted" && project}
      </ProjectWrapper>
      <NoteIcon colour="black" active={!!note} onClick={() => {
          currentSection === "Note"
            ? setCurrentSection("")
            : setCurrentSection("Note");
        }}/>
    </Wrapper>
  );
}
