import React, { useState } from "react";
import Line from "../../atoms/Line";
import Stack from "../../atoms/Stack";
import Nav from "./Nav";
import Routing from "./Routing";
import TaskButton from "./TaskButton";
import TaskName from "./TaskName";
import Timed from "./Timed";

export default function CreateTask(): JSX.Element {
  const [currentSection, setCurrentSection] = useState("");

  return (
    <Stack>
      <TaskName />
      <Timed />
      <Nav
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <Line style={{ marginBottom: "0.4rem", marginTop: "0.4rem" }}>
        {currentSection && <Routing route={currentSection} />}
      </Line>
      <TaskButton />
    </Stack>
  );
}
