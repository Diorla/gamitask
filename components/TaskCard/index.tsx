import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
// import notifyUser from "../../scripts/notifyUser";
import PlayStop from "./PlayStop";
// import schedule from "node-schedule";
import { toast } from "react-toastify";
import formatDateTime from "./formatDateTime";
import Checkbox from "./Checkbox";
import { MdArchive, MdDelete, MdEdit } from "react-icons/md";
import { useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import deleteData from "../../scripts/deleteData";
import Modal from "../Modal";
import Task from "../../props/Task";
import {
  Button,
  Controls,
  Difficulty,
  Expanded,
  Flag,
  Label,
  ModalChild,
  PriorityDifficulty,
  ProjectName,
  Row,
  Wrapper,
} from "./Styled";
import StyledNote from "../StyledNote";
import { getDayBegin } from "../../scripts/datetime-utils";
import formatMSToCountDown from "../../scripts/formatMSToCountDown";
import closeTask from "../../services/closeTask";
import createTask from "../../services/createTask";
import ToastControl from "../ToastControl";
import markAsDone from "../../services/markAsDone";
import undoCheck from "../../services/markAsDone/undoCheck";
// import { IoMdStats } from "react-icons/io";
// import Link from "next/link";

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
    done,
    labels,
    project,
    archive,
    repeat,
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

  const deleteTask = () => {
    deleteData("user", `${user.uid}/tasks/${id}`)
      .then(() =>
        toast.error(
          <ToastControl
            message={`${name} deleted`}
            undo={() => createTask(user.uid, id, data)}
          />
        )
      )
      .catch((err) => toast.error(err.message));
  };

  const beginTask = () => {
    if (runningTask.id) closeTask(user, startRunningTask);
    else startRunningTask();
  };

  const startRunningTask = () => {
    const startTime = Date.now();
    createData("user", user.uid, {
      runningTask: {
        id,
        name,
        priority,
        difficulty,
        startTime,
        countdowns,
      },
    }).catch((err) => toast.error(err));
  };

  const archiveTask = () => {
    const isUpdateDone = archive && !repeat;
    createData("user", `${user.uid}/tasks/${id}`, {
      archive: archive ? 0 : Date.now(),
      done: isUpdateDone ? [] : done,
    })
      .then(() => {
        if (archive) toast.info(`${name} is removed from archive`);
        else toast.warn(`${name} is archived`);
      })
      .catch((err) => toast.error(err));
  };

  const checkDone = () => {
    markAsDone(data, user).then((e) => {
      const { rewardRefList, task, user } = e;
      toast.info(
        <ToastControl
          message={`${name} completed`}
          undo={() => undoCheck(rewardRefList, user, task)}
        />,
        {
          autoClose: false,
        }
      );
    });
  };

  const isCurrent = type === "today" || type === "overdue";
  const isArchive = type === "archive";
  return (
    <Wrapper>
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width={32}
      >
        <ModalChild>
          <h2 style={{ textAlign: "center" }}>
            Delete <span>{name}</span>
          </h2>
          <div>Are you sure?</div>
          <div>This action cannot be undone!</div>
          <div className="control">
            <button onClick={deleteTask}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </ModalChild>
      </Modal>
      <Row
        onClick={(e) => {
          const { className = "" } = e.target as HTMLDivElement;
          try {
            if (!className.includes("exclude"))
              setShowFullDetails(!showFullDetails);
          } catch (error) {
            return error;
          }
        }}
      >
        <Controls className="exclude">
          {!isArchive && timed && isCurrent && (
            <PlayStop running={false} toggleRunning={beginTask} />
          )}
          {isCurrent && <Checkbox onChange={checkDone} checked={false} />}
          <h4>{name}</h4>
        </Controls>
        <PriorityDifficulty>
          {difficulty && <Difficulty index={difficulty} />}
          {priority && <Flag index={priority} />}
        </PriorityDifficulty>
      </Row>
      {showFullDetails && (
        <Expanded>
          <Row>
            <div>
              {archive ? (
                <Button
                  onClick={archiveTask}
                  variant="warning"
                  className="exclude"
                >
                  <MdArchive /> Unarchive
                </Button>
              ) : (
                <Button onClick={editTask} variant="info" className="exclude">
                  <MdEdit /> Edit
                </Button>
              )}
              {archive ? (
                <Button
                  variant="error"
                  className="exclude"
                  onClick={() => setShowDeleteModal(!showDeleteModal)}
                >
                  <MdDelete /> Delete
                </Button>
              ) : (
                <Button
                  onClick={archiveTask}
                  variant="warning"
                  className="exclude"
                >
                  <MdArchive /> Archive
                </Button>
              )}
              {/* <Link href={`/task/${id}`}>
                <Button
                  onClick={() =>
                    console.log("navigate to /task/:id to show stats")
                  }
                  variant="secondary"
                  className="exclude"
                >
                  <IoMdStats /> Stats
                </Button>
              </Link> */}
            </div>
            <ProjectName>{project}</ProjectName>
          </Row>
          {labels && (
            <Row>
              <Label>{labels}</Label>
            </Row>
          )}
          <StyledNote>{note}</StyledNote>
          <Row>
            <div>{time}</div>
            {!isArchive && timed && isCurrent && (
              <div>
                {("0" + hh).slice(-2)}:{("0" + mm).slice(-2)}:
                {("0" + ss).slice(-2)}
              </div>
            )}
          </Row>
        </Expanded>
      )}
    </Wrapper>
  );
};

export default TaskCard;
// (Math.log(i**50) + 1) * 2
