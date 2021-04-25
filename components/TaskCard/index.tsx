import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import addRemoveItemFromArray from "../../scripts/addRemoveItemFromArray";
import createData from "../../scripts/createData";
// import notifyUser from "../../scripts/notifyUser";
import PlayStop from "./PlayStop";
import { TaskWrapper, TaskChild, Corner, RevealOnHover } from "./Styled";
// import schedule from "node-schedule";
import { toast } from "react-toastify";
import formatDateTime from "./formatDateTime";
import Checkbox from "./Checkbox";
import { MdArchive, MdDelete, MdEdit } from "react-icons/md";
import { useTaskDispatch } from "../../context/taskContext";
import { addTask } from "../../context/taskContext/actions";
import deleteData from "../../scripts/deleteData";
import Modal from "../Modal";
import TaskDetails from "./TaskDetails";
import Task from "../../props/Task";
import styled from "styled-components";
import { FaFlag } from "react-icons/fa";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import { IoMdStats } from "react-icons/io";
import Link from "next/link";

const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  border-bottom: 0.1rem solid silver;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectName = styled.div`
  font-size: 1.2rem;
`;

const Button = styled.button<{ variant: string }>`
  border: 0.1rem solid silver;
  cursor: pointer;
  margin: 0.2rem;
  display: inline-flex;
  align-items: center;
  padding: 0.2rem;
  & > svg {
    color: ${({ theme, variant }) => theme.palette[variant].dark};
    margin-right: 0.4rem;
  }
  &:hover {
    border: 0.1rem solid #949090;
    background: silver;
  }
`;

const Expanded = styled.div``;

const Label = styled.div`
  font-style: italic;
`;

const colourScale = ["success", "info", "primary", "warning", "error"];

const Flag = styled(FaFlag)<{ index: number }>`
  color: ${({ theme, index }) => theme.palette[colourScale[index - 1]].main};
`;

const PriorityDifficulty = styled.div`
  & > svg {
    margin: 0.4rem;
  }
`;

const Difficulty = ({ index }: { index: number }) => {
  if (index === 1) return <FcLowPriority />;
  if (index === 2) return <FcMediumPriority />;
  if (index === 3) return <FcHighPriority />;
  return null;
};

const ModalChild = styled.div`
  padding: 0.4rem;
  & span {
    text-decoration: underline;
  }
  & > h2 {
    text-align: center;
  }
  & div {
    font-weight: 500;
  }
  & button {
    cursor: pointer;
    display: inline-block;
    margin: 0.4rem;
    color: white;
    border: none;
    padding: 0.4rem;
  }
  & .control {
    text-align: right;
  }
  & button:first-child {
    background-color: ${({ theme }) => theme.palette.error.dark};
  }
  & button:last-child {
    background-color: ${({ theme }) => theme.palette.success.dark};
  }
  & button:hover {
    opacity: 0.9;
  }
`;
const TaskCard = ({ data, type }: { data: Task; type: string }) => {
  const { user } = useUser();
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
          <PlayStop running={false} toggleRunning={beginTask} />
          {isCurrent && <Checkbox onChange={checkDone} checked={false} />}
          {isCompleted && <Checkbox onChange={checkDone} checked />}
          <div>{name}</div>
        </Controls>
        <ProjectName>{project}</ProjectName>
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
            <PriorityDifficulty>
              {priority && <Flag index={priority} />}
              {difficulty && <Difficulty index={difficulty} />}
            </PriorityDifficulty>
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
