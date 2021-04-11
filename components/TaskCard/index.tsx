import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

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
  const time = dueDate && dayjs(dueDate).format("HH:mm");
  const dateTime = dueDate && dayjs(dueDate).format("llll");
  const countdown = dueDate && dayjs().from(dayjs(dueDate), true);

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
