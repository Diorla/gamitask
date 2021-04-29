import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { MdClose, MdSave } from "react-icons/md";
import { toast } from "react-toastify";
import CreateReward from "../../container/CreateReward";
import { useUser } from "../../context/userContext";
import RewardProps from "../../props/Reward";
import batchWrite from "../../scripts/batchWrite";
import createData from "../../scripts/createData";
import removeItemFromArray from "../../scripts/removeItemFromArray";
import toMS from "../../scripts/toMS";
import transation from "../../scripts/transation";
import Button from "../Button";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "point",
  task: [],
  point: 0,
  done: [],
};

export default function EditableReward({
  init,
  toggleEdit,
}: {
  init: RewardProps;
  toggleEdit: () => void;
}) {
  const [value, setValue] = useState(initialState);
  const [initialValues, setInitialValues] = useState(initialState);
  const { user } = useUser();
  useEffect(() => {
    setValue(init);
    setInitialValues(init);
  }, []);

  const updateTask = () => {
    if (initialValues.type === "task") {
      if (value.type === "task") {
        if (JSON.stringify(initialValues.task) === JSON.stringify(value.task)) {
          createData("user", `${user.uid}/rewards/${value.id}`, value)
            .then(() => toggleEdit())
            .then(() => toast.info("Reward updated"))
            .catch(() => toast.error("Error updating reward"));
        } else {
          createTaskRewardFromTask();
        }
      } else {
        createOtherRewardFromTask();
      }
    } else {
      if (value.type === "task") {
        createTaskRewardFromOther(); // it will be like creating a new tasked reward
      } else {
        createOtherRewardFromOther();
      }
    }
  };

  const createTaskRewardFromTask = () => {
    const taskToRemove: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      taskList: any;
    }[] = [];
    const taskToAdd: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      taskList: any;
    }[] = [];

    initialValues.task.forEach((TaskId) => {
      if (!value.task.includes(TaskId)) {
        transation(async (db, t) => {
          const taskRef = db
            .collection("user")
            .doc(`${user.uid}/tasks/${TaskId}`);
          const taskDoc = await t.get(taskRef);
          const data = taskDoc?.data();
          const taskList = data?.task || [];
          taskToRemove.push({ taskRef, taskList });
        });
      }
    });
    value.task.forEach((TaskId) => {
      if (!initialValues.task.includes(TaskId)) {
        transation(async (db, t) => {
          const taskRef = db
            .collection("user")
            .doc(`${user.uid}/tasks/${TaskId}`);
          const taskDoc = await t.get(taskRef);
          const data = taskDoc?.data();
          const taskList = data?.task || [];
          taskToAdd.push({ taskRef, taskList });
        });
      }
    });
    batchWrite((db, batch) => {
      taskToRemove.forEach((element) => {
        batch.update(element.taskRef, {
          rewards: removeItemFromArray(value.id, element.taskList),
        });
      });
      taskToAdd.forEach((element) => {
        batch.update(element.taskRef, {
          rewards: [...element.taskList, value.id],
        });
      });
      const rewardRef = db
        .collection("user")
        .doc(`${user.uid}/rewards/${value.id}`);
      batch.update(rewardRef, value);
    })
      .then(() => toggleEdit())
      .then(() => toast.info("Reward updated"))
      .catch(() => toast.error("Error updating reward"));
  };

  const createOtherRewardFromTask = () => {
    const listOfTask: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      rewardList: any;
    }[] = [];
    initialValues.task.forEach((TaskId) => {
      transation(async (db, t) => {
        const taskRef = db
          .collection("user")
          .doc(`${user.uid}/tasks/${TaskId}`);
        const taskDoc = await t.get(taskRef);
        const data = taskDoc?.data();
        const rewardList = data?.task || [];
        listOfTask.push({ taskRef, rewardList });
      });

      batchWrite((db, batch) => {
        listOfTask.forEach((element) => {
          batch.update(element.taskRef, {
            rewards: removeItemFromArray(value.id, element.rewardList),
          });
        });
        const rewardRef = db
          .collection("user")
          .doc(`${user.uid}/rewards/${value.id}`);
        batch.update(rewardRef, {
          ...value,
          task: [],
          point: value.type === "point" ? value.point : 0,
          time: value.type === "timed" ? value.time : 0,
        });
      })
        .then(() => toggleEdit())
        .then(() => toast.info("Reward updated"))
        .catch(() => toast.error("Error updating reward"));
    });
  };

  const createOtherRewardFromOther = () => {
    createData("user", `${user.uid}/rewards/${value.id}`, {
      ...value,
      task: [],
      point: value.type === "point" ? value.point : 0,
      time: value.type === "timed" ? value.time : 0,
    })
      .then(() => {
        setValue(initialState);
        toggleEdit();
        toast.success("Reward updated");
      })
      .catch((err) => toast.error(err.message));
  };

  const createTaskRewardFromOther = () => {
    const projectRefList: {
      projectRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      rewardList: any[];
    }[] = [];

    transation((db, t) => {
      value.task.forEach(async (element) => {
        const projectRef = db
          .collection("user")
          .doc(`${user.uid}/tasks/${element.value}`);
        const projectDoc = await t.get(projectRef);
        const data = projectDoc?.data();
        const rewardList = data?.rewards || [];
        projectRefList.push({ projectRef, rewardList });
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${value.id}`);
          projectRefList.forEach((element) => {
            const { projectRef, rewardList } = element;
            batch.set(
              projectRef,
              { rewards: [...rewardList, value.id] },
              { merge: true }
            );
          });
          batch.set(
            rewardRef,
            { ...value, time: 0, point: 0 },
            { merge: true }
          );
        });
      })
      .then(() => {
        setValue(initialState);
        toggleEdit();
        toast.success("Reward updated");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      <CreateReward
        name={value.name}
        onChangeName={(e) => setValue({ ...value, name: e.target.value })}
        type={value.type}
        onChangeType={(e) => setValue({ ...value, type: e.target.value })}
        point={value.point}
        onChangePoint={(e) => setValue({ ...value, point: e.target.value })}
        time={value.time}
        onChangeTime={(ev) => setValue({ ...value, time: ev })}
        task={value.task}
        onChangeTask={(e) => setValue({ ...value, task: e })}
      />
      <Button onClick={() => updateTask()} variant="info">
        <MdSave /> Save
      </Button>
      <Button onClick={() => toggleEdit()} variant="info">
        <MdClose /> Close
      </Button>
    </div>
  );
}
