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

/**
 * ?//TODO: Update schedule
 * 1. I will remove DueDate.tsx(reminder) and Repeat.tsx
 * 2. Create a new file called Reminder(or timing etc)
 * 3. At the top, there will be a date and time selector (I will separate them and merge them using)
 *    `${state.date}T${state.time}`. This will be startDate.
 * 4. And below, I will add event: once, forever, n times
 * 5. If it is once, nothing will happen
 * 6. If it is forever, or n times, there will be another option(Repeat) that will appear below
 * 7. Repeat: daily, weekly, monthly, yearly
 * 8. And the repeat will contain all the information needed
 */
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
