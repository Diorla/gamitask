import React from "react";
import Line from "../../../atoms/Line";
import { useTaskState } from "../../../context/taskContext";
import elevation from "../../../theme/elevation";
import { DifficultyIcon } from "./DifficultyIcon";
import {
  ReminderIcon,
  LabelIcon,
  PriorityIcon,
  ProjectIcon,
  NoteIcon,
} from "./NavIcons";

const prioritycolors = ["#00796b", "#689f38", "#ffeb3b", "#ff9800", "#e83c3d"];

export default function Nav({
  currentSection,
  setCurrentSection,
}: {
  currentSection: string;
  setCurrentSection: (e: string) => void;
}): JSX.Element {
  const { difficulty, labels, priority, project, time, note } = useTaskState();

  const focus = (isBold: boolean) => (isBold ? elevation[1] : elevation[0]);
  return (
    <Line style={{ alignItems: "center", justifyContent: "space-evenly" }}>
      <ReminderIcon
        color={time ? "#87bc43" : undefined}
        onClick={() => {
          currentSection === "DueDate"
            ? setCurrentSection("")
            : setCurrentSection("DueDate");
        }}
        style={{ boxShadow: focus(currentSection === "DueDate") }}
      />
      <LabelIcon
        color={labels ? "#ffac03" : undefined}
        onClick={() => {
          currentSection === "Label"
            ? setCurrentSection("")
            : setCurrentSection("Label");
        }}
        style={{ boxShadow: focus(currentSection === "Label") }}
      />
      <DifficultyIcon
        difficulty={difficulty}
        onClick={() => {
          currentSection === "Difficulty"
            ? setCurrentSection("")
            : setCurrentSection("Difficulty");
        }}
        style={{ boxShadow: focus(currentSection === "Difficulty") }}
      />
      <PriorityIcon
        color={prioritycolors[priority - 1]}
        onClick={() => {
          currentSection === "Priority"
            ? setCurrentSection("")
            : setCurrentSection("Priority");
        }}
        style={{ boxShadow: focus(currentSection === "Priority") }}
      />
      <ProjectIcon
        color={project !== "noProject" ? "#7843bc" : undefined}
        onClick={() => {
          currentSection === "Project"
            ? setCurrentSection("")
            : setCurrentSection("Project");
        }}
        style={{ boxShadow: focus(currentSection === "Project") }}
      />
      <NoteIcon
        color={note ? "#7B3F00" : undefined}
        onClick={() => {
          currentSection === "Note"
            ? setCurrentSection("")
            : setCurrentSection("Note");
        }}
        style={{ boxShadow: focus(currentSection === "Note") }}
      />
    </Line>
  );
}
