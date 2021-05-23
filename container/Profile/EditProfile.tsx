import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "./Container";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import { Form } from "react-bootstrap";
import UploadImage from "../../components/UploadImage";
// import ProfileImage from "./ProfileImage";

export default function EditProfile({
  closeEdit,
}: {
  closeEdit: () => void;
}): JSX.Element {
  const { user } = useUser();

  const [value, setValue] = useState(user);
  const {
    DOB,
    firstName,
    lastName,
    gender = "Prefer not to say",
    profileImage = "./profile.png",
    pointsPerHour = 500,
    dailyGoal = 5000,
  } = value;

  const updateValue = (obj: { [key: string]: any }) => {
    setValue({
      ...value,
      ...obj,
    });
  };

  const saveUser = () => {
    createData("user", `${user.uid}`, {
      ...value,
    })
      .then(() => {
        toast.success("User data updated");
        closeEdit();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <Container>
      <div>Click image to change profile</div>
      {/* <ProfileImage src={profileImage} alt="User profile" /> */}
      <UploadImage
        imageUrl={profileImage}
        setImage={(val) => updateValue({ profileImage: val })}
      />
      <Form>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>First name:</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e: any) => updateValue({ firstName: e.target.value })}
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e: any) => updateValue({ lastName: e.target.value })}
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Date of birth:</Form.Label>
          <Form.Control
            type="date"
            value={dayjs(DOB).format("YYYY-MM-DD")}
            onChange={(e: any) =>
              updateValue({ DOB: new Date(e.target.value).valueOf() })
            }
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            as="select"
            placeholder="Select your gender"
            value={gender}
            onChange={(e: any) => updateValue({ gender: e.target.value })}
            style={{ fontSize: "1.6rem" }}
          >
            <option value="Prefer not to say" label="Prefer not to say" />
            <option value="Non binary" label="Non binary" />
            <option value="Female" label="Female" />
            <option value="Male" label="Male" />
          </Form.Control>
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Points per hour:</Form.Label>
          <Form.Control
            type="number"
            value={pointsPerHour}
            onChange={(e: any) =>
              updateValue({ pointsPerHour: Number(e.target.value) })
            }
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
      </Form>
      <Form>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Daily goal:</Form.Label>
          <Form.Control
            type="number"
            value={dailyGoal}
            onChange={(e: any) => updateValue({ dailyGoal: e.target.value })}
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
      </Form>
      <div
        style={{
          display: "flex",
          width: "32rem",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={closeEdit}
          className="btn btn-default"
          style={{ fontSize: "1.6rem" }}
        >
          Cancel
        </button>
        <button
          onClick={saveUser}
          className="btn btn-primary"
          style={{ fontSize: "1.6rem" }}
        >
          Save
        </button>
      </div>
    </Container>
  );
}
