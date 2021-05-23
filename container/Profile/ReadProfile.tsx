import Container from "./Container";
import ProfileImage from "./ProfileImage";
import { useUser } from "../../context/userContext";
import React from "react";
import { Form } from "react-bootstrap";

export default function ReadProfile({
  openEdit,
}: {
  openEdit: () => void;
}): JSX.Element {
  const {
    user: {
      email,
      DOB,
      firstName,
      gender,
      lastName,
      profileImage,
      pointsPerHour,
      created,
      dailyGoal,
    },
  } = useUser();
  const imageUrl = profileImage || "./profile.png";
  return (
    <Container>
      <ProfileImage src={imageUrl} alt="User profile" />
      <Form>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>First name:</Form.Label>
          <Form.Control
            value={firstName}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            value={lastName}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Email:</Form.Label>
          <Form.Control value={email} disabled style={{ fontSize: "1.6rem" }} />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Date of birth:</Form.Label>
          <Form.Control
            value={DOB && new Date(DOB).toDateString()}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Joined:</Form.Label>
          <Form.Control
            value={new Date(created).toDateString()}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            value={gender}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Points per hour:</Form.Label>
          <Form.Control
            value={pointsPerHour}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
      </Form>
      <Form>
        <Form.Group style={{ minWidth: "32rem", marginBottom: "0.2rem" }}>
          <Form.Label>Daily goal:</Form.Label>
          <Form.Control
            value={dailyGoal}
            disabled
            style={{ fontSize: "1.6rem" }}
          />
        </Form.Group>
      </Form>
      <div style={{ marginTop: 2, textAlign: "left" }}>
        <button
          onClick={openEdit}
          className="btn btn-primary"
          style={{ fontSize: "1.6rem" }}
        >
          Edit
        </button>
      </div>
    </Container>
  );
}
