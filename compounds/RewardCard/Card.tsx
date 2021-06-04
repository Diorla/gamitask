import dayjs from "dayjs";
import React, { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { useUser } from "../../context/userContext";
import Reward from "../../props/Reward";
import Modal from "../Modal";
import StyledNote from "../../atoms/StyledNote";
import Card from "../../atoms/Card";
import Line from "../../atoms/Line";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import Stack from "../../atoms/Stack";
import MarkAsDone from "./MarkAsDone";
import confirmDeleteReward from "./confirmDeleteReward";
dayjs.extend(relativeTime);

export default function RewardCard({
  disabled,
  onCheck,
  toggleEdit,
  reward,
  children,
}: {
  disabled: boolean;
  onCheck: () => void;
  children: React.ReactNode;
  toggleEdit: () => void;
  reward: Reward;
}): JSX.Element {
  const [collapse, setCollapse] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();
  const { name, done, note } = reward;

  return (
    <Card style={{ marginBottom: "1.2rem" }}>
      <Line>
        <Stack style={{ padding: "0.8rem" }}>
          <h4
            style={{ margin: 0, cursor: "pointer" }}
            onClick={() => setCollapse(!collapse)}
          >
            {name}
          </h4>
          {collapse ? null : (
            <>
              {children}
              <StyledNote>{note}</StyledNote>
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
            </>
          )}
        </Stack>
        <MarkAsDone disabled={disabled} onClick={onCheck}>
          <MdCheck />
        </MarkAsDone>
      </Line>
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width={32}
      >
        <Stack style={{ padding: "0.4rem" }}>
          <h2 style={{ textAlign: "center" }}>
            <Text>delete</Text> <span>{name}</span>
          </h2>
          <Line>
            <Text>areYouSure</Text>?
          </Line>
          <Line>
            <Text>thisActionCannotBeUndone</Text>!
          </Line>
          <Line style={{ justifyContent: "flex-end" }}>
            <Button
              onClick={() =>
                confirmDeleteReward(reward, user, setShowDeleteModal)
              }
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
