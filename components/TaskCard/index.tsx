import { format, formatDistance } from "date-fns/fp";
import styled from "styled-components";

const TaskWrapper = styled.div`
  box-shadow: 0 0 2px silver;
  margin: 4px;
`;

const TaskChild = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Corner = styled.div`
  padding: 2px;
`;

const formatDateTime = (dueDate: string | number | Date, type: string) => {
  const time = dueDate && format("HH:mm", new Date(dueDate));
  const dateTime = dueDate && format("HH:mm, dd-mm-yyyy", new Date(dueDate));
  const countdown = dueDate && formatDistance(new Date(), new Date(dueDate));
  if (type === "today") {
    return time;
  } else if (type === "overdue") {
    return `${countdown} ago`;
  }
  return dateTime;
};

const TaskCard = ({ data, type }) => {
  const time = formatDateTime(data.dueDate, type);
  return (
    <TaskWrapper>
      <TaskChild>
        <Corner>Pl C {data.name}</Corner>
        <Corner>D Pr {data.project !== "Unsorted" && data.project}</Corner>
      </TaskChild>
      <TaskChild>
        <Corner>{data.label}</Corner>
        <Corner>A {time}</Corner>
      </TaskChild>
    </TaskWrapper>
  );
};

export default TaskCard;
