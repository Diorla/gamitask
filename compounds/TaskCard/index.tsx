import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import PlayStop from "./PlayStop";
import { toast } from "react-toastify";
import formatDateTime from "../../services/formatDateTime";
import Checkbox from "../Checkbox";
import { useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import Task from "../../props/Task";
import { Difficulty, Flag } from "./PriorityDifficultyIcon";
import { getDayBegin } from "../../scripts/datetime-utils";
import formatMSToCountDown from "../../scripts/formatMSToCountDown";
import closeTask from "../../services/closeTask";
import EditCard from "../EditCard";
import Line from "../../atoms/Line";
import Card from "../../atoms/Card";
import Expanded from "./Expanded";
import startRunningTask from "../../services/startRunningTask";
import archiveTask from "../../services/archiveTask";
import checkDone from "../../services/checkDone";

const TaskCard = ({
  data,
  type,
}: {
  data: Task;
  type: string;
}): JSX.Element => {
  const { user } = useUser();
  const { runningTask } = user;
  const time = formatDateTime(data, type);
  const {
    id,
    name,
    priority,
    difficulty,
    countdowns,
    labels,
    project,
    archive,
    note,
    timed,
  } = data;
  const taskDispatch = useTaskDispatch();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const todayKey = "t" + getDayBegin(new Date());
  const todayCountdown = Array.isArray(countdowns[todayKey])
    ? countdowns[todayKey]
    : [];
  let totalTime = 0;
  todayCountdown.forEach((item) => {
    totalTime += item.length;
  });

  const { hh, mm, ss } = formatMSToCountDown(totalTime);
  useEffect(() => {
    if (type === "archive") {
      if (!archive)
        createData("user", `${user.uid}/tasks/${id}`, {
          archive: Date.now(),
        }).catch((err) => toast.error(err));
    }
  }, []);

  const editTask = () => {
    taskDispatch(
      addTask({
        ...data,
        showModal: true,
      })
    );
  };

  const beginTask = () => {
    if (runningTask.id) closeTask(user, () => startRunningTask(data, user));
    else startRunningTask(data, user);
  };

  const isCurrent = type === "today" || type === "overdue";
  const isArchive = type === "archive";
  return (
    <Card style={{ marginBottom: "1.6rem", padding: "0.4rem" }}>
      <EditCard
        name={name}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        uid={user.uid}
        id={id}
        data={data}
      />
      <Line
        onClick={(e) => {
          const { className = "" } = e.target as HTMLDivElement;
          try {
            if (!className.includes("exclude"))
              setShowFullDetails(!showFullDetails);
          } catch (error) {
            return error;
          }
        }}
        style={{
          padding: "0.4rem",
        }}
      >
        <Line>
          {!isArchive && timed && isCurrent && (
            <PlayStop running={false} toggleRunning={beginTask} />
          )}
          {isCurrent && (
            <Checkbox onChange={() => checkDone(data, user)} checked={false} />
          )}
          <h4 style={{ margin: 0, padding: 0 }}>{name}</h4>
        </Line>
        <Line style={{ justifyContent: "flex-end", flexGrow: 0 }}>
          <Difficulty index={difficulty} />
          <Flag index={priority} />
        </Line>
      </Line>
      {showFullDetails && (
        <Expanded
          archive={archive}
          archiveTask={() => archiveTask(data, user)}
          editTask={editTask}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
          project={project}
          note={note}
          isArchive={isArchive}
          timed={timed}
          isCurrent={isCurrent}
          hh={hh}
          mm={mm}
          ss={ss}
          time={time}
          labels={labels}
        />
      )}
    </Card>
  );
};

export default TaskCard;
