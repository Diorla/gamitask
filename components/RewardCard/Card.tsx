import dayjs from "dayjs";
import firebase from "firebase";
import React, { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import { taskInfo } from "../../props/Reward";
import batchWrite from "../../scripts/batchWrite";
import deleteData from "../../scripts/deleteData";
import removeItemFromArray from "../../scripts/removeItemFromArray";
import transation from "../../scripts/transation";
import Modal from "../Modal";
import { ModalChild } from "../TaskCard/Styled";
import {
  Wrapper,
  Left,
  Title,
  Centre,
  Bottom,
  Right,
  Button,
} from "./Styled";
import StyledNote from "../StyledNote";
dayjs.extend(relativeTime);

export default function Card({
  disabled,
  title,
  done,
  onCheck,
  children,
  toggleEdit,
  id,
  taskList,
  note,
}: {
  disabled: boolean;
  title: string;
  done: number[];
  onCheck: () => void;
  children: React.ReactNode;
  toggleEdit: () => void;
  id?: string;
  taskList?: taskInfo[];
  note: string;
}) {
  const [collapse, setCollapse] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();
  const deleteTask = () => {
    if (taskList && taskList.length) {
      const taskRefList: {
        taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
        rewardList: any;
      }[] = [];
      transation((db, t) => {
        taskList.forEach(async (element) => {
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
              .doc(`${user.uid}/rewards/${id}`);
            batch.delete(rewardRef);

            taskRefList.forEach((element) => {
              const { taskRef, rewardList } = element;
              batch.set(
                taskRef,
                { rewards: removeItemFromArray(id, rewardList) },
                { merge: true }
              );
            });
          });
        })
        .then(() => setShowDeleteModal(false))
        .then(() => toast.warn(title + " deleted"))
        .catch((err) => toast.error(err.message));
    } else {
      deleteData("user", `${user.uid}/rewards/${id}`)
        .then(() => setShowDeleteModal(false))
        .then(() => toast.warn(title + " deleted"))
        .catch((err) => toast.error(err.message));
    }
  };
  return (
    <>
      <Wrapper disabled={disabled}>
        <Left>
          <Title onClick={() => setCollapse(!collapse)}>{title}</Title>
          {collapse ? null : (
            <>
              <Centre>{children}</Centre>
              <Bottom>
                <div>
                  <Button onClick={toggleEdit} variant="info">
                    <MdEdit /> Edit
                  </Button>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    variant="error"
                  >
                    <MdDelete /> Delete
                  </Button>
                </div>
                <span>
                  Last done:{" "}
                  {done.length
                    ? dayjs(done[done.length - 1]).from(new Date())
                    : "Never"}
                </span>
              </Bottom>
              <StyledNote>{note}</StyledNote>
            </>
          )}
        </Left>
        {disabled ? (
          <Right className="disabled">
            <MdCheck />
          </Right>
        ) : (
          <Right onClick={onCheck} className="enabled">
            <MdCheck />
          </Right>
        )}
      </Wrapper>
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width={32}
      >
        <ModalChild>
          <h2 style={{ textAlign: "center" }}>
            Delete <span>{title}</span>
          </h2>
          <div>Are you sure?</div>
          <div>This action cannot be undone!</div>
          <div className="control">
            <button onClick={deleteTask}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </ModalChild>
      </Modal>
    </>
  );
}
