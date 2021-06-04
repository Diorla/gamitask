import React from "react";
import { toast } from "react-toastify";
import Stack from "../atoms/Stack";
import Task from "../props/Task";
import deleteData from "../scripts/deleteData";
import createTask from "../services/createTask";
import Modal from "./Modal";
import ToastControl from "./ToastControl";

export default function EditCard({
  name,
  setShowDeleteModal,
  showDeleteModal,
  uid,
  id,
  data,
}: {
  name: string;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
  showDeleteModal: boolean;
  uid: string;
  id: string;
  data: Task;
}): JSX.Element {
  const deleteTask = () => {
    deleteData("user", `${uid}/tasks/${id}`)
      .then(() =>
        toast.error(
          <ToastControl
            message={`${name} deleted`}
            undo={() => createTask(uid, id, data)}
          />
        )
      )
      .catch((err) => toast.error(err.message));
  };
  return (
    <Modal
      visible={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      width={32}
    >
      <Stack>
        <h2 style={{ textAlign: "center" }}>
          Delete <span>{name}</span>
        </h2>
        <div>Are you sure?</div>
        <div>This action cannot be undone!</div>
        <div className="control">
          <button onClick={deleteTask}>Yes</button>
          <button onClick={() => setShowDeleteModal(false)}>No</button>
        </div>
      </Stack>
    </Modal>
  );
}
