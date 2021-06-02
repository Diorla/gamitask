import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { MdClose, MdSave } from "react-icons/md";
import { toast } from "react-toastify";
import CreateReward from "../CreateReward";
import { useUser } from "../../context/userContext";
import RewardProps from "../../props/Reward";
import batchWrite from "../../scripts/batchWrite";
import createData from "../../scripts/createData";
import removeItemFromArray from "../../scripts/removeItemFromArray";
import toMS from "../../scripts/toMS";
import transaction from "../../scripts/transaction";
import Button from "../../atoms/Button";

const initialState: RewardProps = {
  name: "",
  time: toMS(0, "second"),
  type: "timed",
  task: [],
  point: 0,
  done: [],
  note: "",
};

export default function EditableReward({
  init,
  toggleEdit,
}: {
  init: RewardProps;
  toggleEdit: () => void;
}): JSX.Element {
  const [value, setValue] = useState(initialState);
  const [initialValues, setInitialValues] = useState(initialState);
  const { user } = useUser();
  useEffect(() => {
    setValue(init);
    setInitialValues(init);
  }, []);

  const updateTask = () => {
    if (!value.name) {
      toast.warn("Please provide a name");
      return 0;
    }
    if (value.type === "timed" && value.time < 1) {
      toast.warn("Please provide time");
      return 0;
    }
    if (value.type === "task" && value.task.length < 1) {
      toast.warn("Please provide task");
      return 0;
    }
    // The reward type was task
    if (initialValues.type === "task") {
      // No change in type of reward
      if (value.type === "task") {
        // No change in tasks, just change in name
        if (JSON.stringify(initialValues.task) === JSON.stringify(value.task)) {
          createData("user", `${user.uid}/rewards/${value.id}`, value)
            .then(() => toggleEdit())
            .then(() => toast.info("Reward updated"))
            .catch(() => toast.error("Error updating reward"));
        } else {
          // update rewards.tasks and tasks.rewards
          createTaskRewardFromTask();
        }
      } else {
        // now, the type of reward is changed(no longer task)
        createOtherRewardFromTask();
      }
    }
    // Previous reward type is not a task
    else {
      // newer reward is a task
      if (value.type === "task") {
        // it will be like creating a new tasked reward
        createTaskRewardFromOther();
      } else {
        // basically the same
        createOtherRewardFromOther();
      }
    }
  };

  const createTaskRewardFromTask = () => {
    // task that have rewards removed
    const taskToRemove: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      taskList: any;
    }[] = [];
    // task that will have rewards added
    const taskToAdd: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      taskList: any;
    }[] = [];
    transaction((db, t) => {
      // all initial tasks
      initialValues.task.forEach(async (task) => {
        // task is not in the current reward
        if (!value.task.includes(task)) {
          const taskRef = db
            .collection("user")
            .doc(`${user.uid}/tasks/${task.value}`);
          const taskDoc = await t.get(taskRef);
          const data = taskDoc?.data();
          const taskList = data?.task || [];
          taskToRemove.push({ taskRef, taskList });
        }
      });
      value.task.forEach(async (task) => {
        // task not in previous reward
        if (!initialValues.task.includes(task)) {
          const taskRef = db
            .collection("user")
            .doc(`${user.uid}/tasks/${task.value}`);
          const taskDoc = await t.get(taskRef);
          const data = taskDoc?.data();
          const taskList = data?.task || [];
          taskToAdd.push({ taskRef, taskList });
        }
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          // remove reward from task
          taskToRemove.forEach((element) => {
            batch.update(element.taskRef, {
              rewards: removeItemFromArray(value.id, element.taskList),
            });
          });

          // add reward to task
          taskToAdd.forEach((element) => {
            batch.update(element.taskRef, {
              rewards: [...element.taskList, value.id],
            });
          });

          // update reward itself
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${value.id}`);
          batch.update(rewardRef, value);
        });
      })
      .then(() => toggleEdit())
      .then(() => toast.info("Reward updated"))
      .catch(() => toast.error("Error updating reward"));
  };

  const createOtherRewardFromTask = () => {
    const oldTaskList: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      rewardList: any;
    }[] = [];

    // get list of tasks
    transaction((db, t) => {
      initialValues.task.forEach(async (task) => {
        const taskRef = db
          .collection("user")
          .doc(`${user.uid}/tasks/${task.value}`);
        const taskDoc = await t.get(taskRef);
        const data = taskDoc?.data();
        const rewardList = data?.rewards || [];
        oldTaskList.push({ taskRef, rewardList });
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          // remove reward from all the tasks
          oldTaskList.forEach((element) => {
            batch.update(element.taskRef, {
              rewards: removeItemFromArray(value.id, element.rewardList),
            });
          });
          // Now save it to reward
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${value.id}`);
          batch.update(rewardRef, {
            ...value,
            task: [],
          });
        });
      })
      .then(() => toggleEdit())
      .then(() => toast.info("Reward updated"))
      .catch(() => toast.error("Error updating reward"));
  };

  const createOtherRewardFromOther = () => {
    // just update the task
    createData("user", `${user.uid}/rewards/${value.id}`, {
      ...value,
      task: [],
    })
      .then(() => {
        setValue(initialState);
        toggleEdit();
        toast.success("Reward updated");
      })
      .catch((err) => toast.error(err.message));
  };

  const createTaskRewardFromOther = () => {
    const taskRefList: {
      taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
      rewardList: any[];
    }[] = [];

    // get list of task to update
    transaction((db, t) => {
      value.task.forEach(async (element) => {
        const taskRef = db
          .collection("user")
          .doc(`${user.uid}/tasks/${element.value}`);
        const taskDoc = await t.get(taskRef);
        const data = taskDoc?.data();
        const rewardList = data?.rewards || [];
        taskRefList.push({ taskRef, rewardList });
      });
    })
      .then(() => {
        batchWrite((db, batch) => {
          const rewardRef = db
            .collection("user")
            .doc(`${user.uid}/rewards/${value.id}`);
          // update all the task
          taskRefList.forEach((element) => {
            const { taskRef, rewardList } = element;
            batch.set(
              taskRef,
              { rewards: [...rewardList, value.id] },
              { merge: true }
            );
          });
          // update the reward
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
        time={value.time}
        onChangeTime={(ev) => setValue({ ...value, time: ev })}
        task={value.task}
        onChangeTask={(e) => setValue({ ...value, task: e })}
        note={value.note}
        onChangeNote={(e) => setValue({ ...value, note: e.target.value })}
      />
      <Button onClick={() => updateTask()} variant="info" iconLeft={<MdSave />}>
        save
      </Button>
      <Button
        onClick={() => toggleEdit()}
        variant="info"
        iconLeft={<MdClose />}
      >
        Close
      </Button>
    </div>
  );
}
