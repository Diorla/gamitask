import React, { useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
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
    <Styled>
      <TaskName />
      <Controls>
        <Nav
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <TaskButton />
      </Controls>
      <div>{currentSection && <Routing route={currentSection} />}</div>
    </Styled>
  );
}
