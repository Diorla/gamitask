import React from "react";
import { toast } from "react-toastify";
import Task from "../props/Task";
import ToastControl from "../compounds/ToastControl";
import markAsDone from "./markAsDone";
import undoCheck from "./undoCheck";
import UserInfo from "../props/UserInfo";

export default function checkDone(data: Task, user: UserInfo): void {
  const { name } = data;
  markAsDone(data, user).then((e) => {
    // BUG: task === data
    /**
     * This means I might not need to return task
     * Since the value is already available
     */
    const { rewardRefList, task, user } = e;
    toast.info(
      <ToastControl
        message={`${name} completed`}
        undo={() => undoCheck(rewardRefList, user, task)}
      />
    );
  });
}
