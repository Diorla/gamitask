import React from "react";
import Difficulty from "./Difficulty";
import DueDate from "./DueDate";
import Label from "./Label";
import Priority from "./Priority";
import Project from "./Project";

export default function Routing({ route }) {
  if (route === "DueDate") return <DueDate />;
  if (route === "Label") return <Label />;
  if (route === "Priority") return <Priority />;
  if (route === "Project") return <Project />;
  if (route === "Difficulty") return <Difficulty />;
  return null;
}
