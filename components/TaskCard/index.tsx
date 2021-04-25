import dayjs from "dayjs";
import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
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
// import { IoMdStats } from "react-icons/io";
// import Link from "next/link";

const TaskCard = ({ data, type }: { data: Task; type: string }) => {
  const { user } = useUser();
  const { runningTask, points: pt } = user;
  const time = formatDateTime(data);
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
  } = data;
  const taskDispatch = useTaskDispatch();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeTask = () => {
    const {
      name,
      id,
      startTime,
      priority,
      difficulty,
      countdowns,
    } = runningTask;
    const timeDiff = Date.now() - startTime;
    let points = timeDiff * priority * difficulty;
    points /= 18482.52;
    points += pt;
    points = Math.floor(points);
    const now = "t" + Date.now();

    createData("user", user.uid, {
      points,
      runningTask: {},
    })
      .then(() => {
        createData("user", `${user.uid}/tasks/${id}`, {
          countdowns: {
            ...countdowns,
            [now]: timeDiff,
          },
        });
      })
      .then(() => toast.info(`${name} ended`))
      .catch((err) => toast.error(err));
  };

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
      .then(() => toast.warn(`${name} deleted`))
      .catch((err) => toast.error(err.message));
  };

  const beginTask = () => {
    if (runningTask.id) closeTask();
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

  const checkDone = () => {
    const dateId = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
    createData("user", `${user.uid}/tasks/${id}`, {
      done: addRemoveItemFromArray(dateId, done),
    }).catch((err) => toast.error(err));
  };

  const archiveTask = () => {
    createData("user", `${user.uid}/tasks/${id}`, {
      archive: !archive,
    })
      .then(() => {
        if (archive) toast.info(`${name} is removed from archive`);
        else toast.warn(`${name} is archived`);
      })
      .catch((err) => toast.error(err));
  };

  const isCurrent = type === "today" || type === "overdue";
  const isCompleted = type === "completed";
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
          } catch (error) {}
        }}
      >
        <Controls className="exclude">
          {!archive && <PlayStop running={false} toggleRunning={beginTask} />}
          {isCurrent && <Checkbox onChange={checkDone} checked={false} />}
          {isCompleted && <Checkbox onChange={checkDone} checked />}
          <div>{name}</div>
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
          <Row>
            <div>{time}</div>
          </Row>
        </Expanded>
      )}
    </Wrapper>
  );
};

export default TaskCard;
