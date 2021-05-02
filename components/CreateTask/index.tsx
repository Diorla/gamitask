import React, { useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Routing from "./Routing";
import TaskButton from "./TaskButton";
import TaskName from "./TaskName";
import Timed from "./Timed";

const Styled = styled.div`
  color: black;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  align-items: center;
`;

export default function CreateTask() {
  const [currentSection, setCurrentSection] = useState("");

  return (
    <Styled>
      <TaskName />
      <Timed />
      <Controls>
        <Nav
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </Controls>
      <div>{currentSection && <Routing route={currentSection} />}</div>
      <TaskButton />
    </Styled>
  );
}
