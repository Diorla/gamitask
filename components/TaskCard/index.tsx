import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
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
import transation from "../../scripts/transation";
import batchWrite from "../../scripts/batchWrite";
import firebase from "firebase";
import uniqueArray from "../../scripts/uniqueArray";
import StyledNote from "../StyledNote";
import getStreak from "../../scripts/getStreak";
import { getDayBegin } from "../../scripts/datetime-utils";
import formatMSToCountDown from "../../scripts/formatMSToCountDown";
import fromMS from "../../scripts/fromMS";
// import { IoMdStats } from "react-icons/io";
// import Link from "next/link";

const TaskCard = ({ data, type }: { data: Task; type: string }) => {
  const { user } = useUser();
  const {
    runningTask,
    totalPoints,
    dailyPoints,
    lifetimeHours,
    lifetimePoints,
  } = user;
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
    rewards,
    repeat,
    note,
    timed,
    streak,
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
    let todayPoints = timeDiff * priority * difficulty;
    todayPoints /= 18482.52;
    let cumulativePoints = todayPoints + totalPoints;
    cumulativePoints = Math.floor(cumulativePoints);
    todayPoints = Math.floor(todayPoints);
    const todayValue = Array.isArray(dailyPoints[todayKey])
      ? dailyPoints[todayKey]
      : [];
    createData("user", user.uid, {
      totalPoints: cumulativePoints,
      runningTask: {},
      dailyPoints: {
        ...dailyPoints,
        [todayKey]: [...todayValue, todayPoints],
      },
      lifetimeHours: lifetimeHours + fromMS(timeDiff, "hour"),
      lifetimePoints: lifetimePoints + todayPoints,
    })
      .then(() => {
        const todayKey = "t" + getDayBegin(new Date());
        const todayValue = Array.isArray(countdowns[todayKey])
          ? countdowns[todayKey]
          : [];
        todayValue.push({
          startTime,
          length: timeDiff,
        });
        createData("user", `${user.uid}/tasks/${id}`, {
          countdowns: {
            ...countdowns,
            [todayKey]: todayValue,
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
    const currentStreak = getStreak(data);
    if (rewards && rewards.length) {
      const rewardRefList: {
        rewardRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
        checklist: string[];
      }[] = [];

      transation((db, t) => {
        rewards.forEach(async (rewardId) => {
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${rewardId}`);

          const rewardDoc = await t.get(rewardRef);
          const data = rewardDoc?.data();
          const checklist = data?.checklist || [];
          rewardRefList.push({ rewardRef, checklist });
        });
      })
        .then(() => {
          batchWrite((db, batch) => {
            rewardRefList.forEach((item) => {
              const rewardRef = item.rewardRef;
              batch.update(rewardRef, {
                checklist: uniqueArray([...item.checklist, id]),
              });
            });
            const taskRef = db
              .collection("user")
              .doc(`${user.uid}/tasks/${id}`);
            if (!timed) updatePoint(db, batch, currentStreak);
            batch.update(taskRef, {
              done: addRemoveItemFromArray(dateId, done),
              lastCompleted: Date.now(),
              streak: currentStreak,
            });
          });
        })
        .catch((err) => toast.error(err.message));
    } else {
      batchWrite((db, batch) => {
        const taskRef = db.collection("user").doc(`${user.uid}/tasks/${id}`);
        if (!timed) updatePoint(db, batch, currentStreak);
        batch.update(taskRef, {
          done: addRemoveItemFromArray(dateId, done),
          lastCompleted: Date.now(),
          streak: currentStreak,
        });
      }).catch((err) => toast.error(err.message));
    }
  };

  const updatePoint = (
    db: firebase.firestore.Firestore,
    updater: firebase.firestore.WriteBatch,
    currentStreak: number
  ) => {
    let points = currentStreak * priority * difficulty;
    /**
     * 60 years = 21915 days
     * Maximum priority and difficulty = 3 * 5 = 15
     * Assuming someone does it daily for 60 years
     * Math.floor(Math.log((21915 * 15)**56) + 1) = Infinity
     * Math.floor(Math.log((21915 * 15)**55) + 1) = 699
     * Hence, 71 is the safe number, as far as I'm concerned
     */
    points = (Math.log(points ** 50) + 1) * 2;
    points += totalPoints;
    points = Math.floor(points);
    // I don't expect this to happen, but who knows
    points = points === Infinity ? 1398 + streak : points;

    const todayKey = "t" + getDayBegin(new Date());
    const todayValue = Array.isArray(dailyPoints[todayKey])
      ? dailyPoints[todayKey]
      : [];
    const taskRef = db.collection("user").doc(user.uid);
    updater.update(taskRef, {
      totalPoints: points,
      dailyPoints: {
        ...dailyPoints,
        [todayKey]: [...todayValue, points],
      },
    });
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
          } catch (error) {}
        }}
      >
        <Controls className="exclude">
          {!isArchive && timed && isCurrent && (
            <PlayStop running={false} toggleRunning={beginTask} />
          )}
          {isCurrent && <Checkbox onChange={checkDone} checked={false} />}
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
