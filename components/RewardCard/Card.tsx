import React, { useState } from "react";
import { MdCheck, MdDeleteSweep, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import deleteData from "../../scripts/deleteData";
import Modal from "../Modal";
import { ModalChild } from "../TaskCard/Styled";
import { Wrapper, Left, Title, Centre, Bottom, Right, Button } from "./Styled";

export default function Card({
  disabled,
  title,
  done,
  onCheck,
  children,
  toggleEdit,
  id,
}: {
  disabled: boolean;
  title: string;
  done: number[];
  onCheck: () => void;
  children: React.ReactNode;
  toggleEdit: () => void;
  id?: string;
}) {
  const [collapse, setCollapse] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();
  const deleteTask = () => {
    deleteData("user", `${user.uid}/rewards/${id}`)
      .then(() => setShowDeleteModal(false))
      .then(() => toast.warn(title + " deleted"))
      .catch((err) => toast.error(err.message));
  };
  return (
    <Wrapper disabled={disabled}>
      <Left>
        <Title onClick={() => setCollapse(!collapse)}>{title}</Title>
        {collapse ? null : (
          <>
            <Centre>{children}</Centre>
            <Bottom>
              <Button onClick={toggleEdit} variant="info">
                <MdEdit /> Edit
              </Button>
              <Button onClick={() => setShowDeleteModal(true)} variant="info">
                <MdDeleteSweep /> Delete
              </Button>
              <span>
                Last done:{" "}
                {done.length ? new Date(done[-1]).toDateString() : "Never"}
              </span>
            </Bottom>
          </>
        )}
      </Left>
      {disabled ? (
        <Right>
          <MdCheck />
        </Right>
      ) : (
        <Right onClick={onCheck}>
          <MdCheck />
        </Right>
      )}
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
    </Wrapper>
  );
}
