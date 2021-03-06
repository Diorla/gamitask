import React from "react";
import Difficulty from "./Difficulty";
import DueDate from "./DueDate";
import Label from "./Label";
import Note from "./Note";
import Priority from "./Priority";
import Project from "./Project";

export default function Routing({ route }: { route: string }) {
  if (route === "DueDate") return <DueDate />;
  if (route === "Label") return <Label />;
  if (route === "Priority") return <Priority />;
  if (route === "Project") return <Project />;
  if (route === "Difficulty") return <Difficulty />;
  if (route === "Note") return <Note />;
  return null;
}
