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
import transaction from "../../scripts/transaction";
import Modal from "../Modal";
import { Wrapper, Left, Title, Centre, Right } from "./Styled";
import StyledNote from "../StyledNote";
import Card from "../../atoms/Card";
import Line from "../../atoms/Line";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import Stack from "../../atoms/Stack";
dayjs.extend(relativeTime);

export default function RewardCard({
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
}): JSX.Element {
  const [collapse, setCollapse] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();
  const deleteTask = () => {
    if (taskList && taskList.length) {
      const taskRefList: {
        taskRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
        rewardList: any;
      }[] = [];
      transaction((db, t) => {
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
    <Card style={{ marginBottom: "1.2rem" }}>
      <Wrapper disabled={disabled}>
        <Left>
          <Title onClick={() => setCollapse(!collapse)}>{title}</Title>
          {collapse ? null : (
            <>
              <Centre>{children}</Centre>
              <Line style={{ justifyContent: "space-between" }}>
                <Line>
                  <Button
                    iconLeft={<MdEdit />}
                    variant="info"
                    onClick={toggleEdit}
                    style={{ marginRight: "0.4rem" }}
                  >
                    edit
                  </Button>
                  <Button
                    iconLeft={<MdDelete />}
                    variant="error"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    delete
                  </Button>
                </Line>
                <span>
                  <Text>lastDone</Text>:{" "}
                  {done.length
                    ? dayjs(done[done.length - 1]).from(new Date())
                    : "Never"}
                </span>
              </Line>
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
        <Stack style={{ padding: "0.4rem" }}>
          <h2 style={{ textAlign: "center" }}>
            <Text>delete</Text> <span>{title}</span>
          </h2>
          <Line>
            <Text>areYouSure</Text>?
          </Line>
          <Line>
            <Text>thisActionCannotBeUndone</Text>!
          </Line>
          <Line style={{ justifyContent: "flex-end" }}>
            <Button
              onClick={deleteTask}
              style={{ marginRight: "0.4rem" }}
              variant="error"
            >
              yes
            </Button>
            <Button onClick={() => setShowDeleteModal(false)} variant="success">
              no
            </Button>
          </Line>
        </Stack>
      </Modal>
    </Card>
  );
}
