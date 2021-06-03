import { useUser } from "../../context/userContext";
import React from "react";
import FormInput from "../../molecules/FormInput";
import Form from "../../atoms/Form";
import Line from "../../atoms/Line";
import Button from "../../atoms/Button";
import Avatar from "../../atoms/Avatar";

export default function ReadProfile({
  openEdit,
}: {
  openEdit: () => void;
}): JSX.Element {
  const {
    user: {
      email,
      DOB,
      name,
      gender,
      profileImage,
      pointsPerHour,
      created,
      dailyGoal,
    },
  } = useUser();
  const imageUrl = profileImage || "./profile.png";
  return (
    <>
      <Avatar size="10rem" src={imageUrl} alt="User profile" />
      <Form>
        <FormInput
          label="personName"
          placeholder="personNameExample"
          value={name}
          disabled
        />
        <FormInput
          label="email"
          placeholder="emailExample"
          type="email"
          value={email}
          disabled
        />
        <FormInput
          label="DOB"
          placeholder="dateExample"
          value={DOB && new Date(DOB).toDateString()}
          disabled
        />
        <FormInput
          label="created"
          placeholder="dateExample"
          value={new Date(created).toDateString()}
          disabled
        />
        <FormInput
          label="gender"
          placeholder="genderExample"
          value={gender}
          disabled
        />
        <FormInput
          label="pointsPerHour"
          placeholder="numberExample"
          type="number"
          value={pointsPerHour}
          disabled
        />
        <FormInput
          label="dailyGoal"
          placeholder="numberExample"
          type="number"
          value={dailyGoal}
          disabled
        />
        <Line style={{ justifyContent: "flex-end" }}>
          <Button onClick={openEdit} variant="primary">
            edit
          </Button>
        </Line>
      </Form>
    </>
  );
}
