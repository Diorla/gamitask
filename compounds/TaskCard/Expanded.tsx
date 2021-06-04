import React from "react";
import { MdArchive, MdEdit, MdDelete } from "react-icons/md";
import Button from "../../atoms/Button";
import Line from "../../atoms/Line";
import Stack from "../../atoms/Stack";
import StyledNote from "../../atoms/StyledNote";

export default function Expanded({
  archive,
  archiveTask,
  editTask,
  setShowDeleteModal,
  showDeleteModal,
  project,
  note,
  isArchive,
  timed,
  isCurrent,
  hh,
  mm,
  ss,
  labels,
  time,
}: {
  archive: number;
  archiveTask: () => void;
  editTask: () => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  project: string;
  note: string;
  isArchive: boolean;
  timed: boolean;
  isCurrent: boolean;
  hh: number;
  mm: number;
  ss: number;
  labels: string;
  time: string;
}): JSX.Element {
  return (
    <Stack>
      <Line
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0.2rem",
        }}
      >
        <Line>
          {archive ? (
            <Button
              onClick={archiveTask}
              variant="warning"
              className="exclude"
              iconLeft={<MdArchive />}
            >
              unarchive
            </Button>
          ) : (
            <Button
              onClick={editTask}
              variant="info"
              className="exclude"
              iconLeft={<MdEdit />}
            >
              edit
            </Button>
          )}
          {archive ? (
            <Button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              variant="error"
              className="exclude"
              iconLeft={<MdDelete />}
              style={{ marginLeft: "0.4rem" }}
            >
              delete
            </Button>
          ) : (
            <Button
              onClick={archiveTask}
              variant="warning"
              className="exclude"
              iconLeft={<MdArchive />}
              style={{ marginLeft: "0.4rem" }}
            >
              archive
            </Button>
          )}
        </Line>
        <h4>{project}</h4>
      </Line>
      {labels && <Line style={{ fontStyle: "italic" }}>{labels}</Line>}
      <StyledNote>{note}</StyledNote>
      <Line style={{ justifyContent: "space-between" }}>
        <span>{time}</span>
        {!isArchive && timed && isCurrent && (
          <span>
            {("0" + hh).slice(-2)}:{("0" + mm).slice(-2)}:{("0" + ss).slice(-2)}
          </span>
        )}
      </Line>
    </Stack>
  );
}
