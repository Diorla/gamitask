import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "./Container";
import { useUser } from "../../context/userContext";
import createData from "../../scripts/createData";
import UploadImage from "../../compounds/UploadImage";
import FormInput from "../../molecules/FormInput";
import FormSelect from "../../molecules/FormSelect";
import Form from "../../atoms/Form";
import Line from "../../atoms/Line";
import Button from "../../atoms/Button";

const genderList = [
  { label: "preferNotToSay", value: "Prefer not to say" },
  { label: "male", value: "Male" },
  { label: "female", value: "Female" },
  { label: "nonBinary", value: "Non binary" },
];
export default function EditProfile({
  closeEdit,
}: {
  closeEdit: () => void;
}): JSX.Element {
  const { user } = useUser();

  const [value, setValue] = useState(user);
  const {
    DOB,
    name,
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
      <UploadImage
        imageUrl={profileImage}
        setImage={(val) => updateValue({ profileImage: val })}
      />
      <Form>
        <FormInput
          label="personName"
          placeholder="personNameExample"
          value={name}
          onChange={(e: any) => updateValue({ name: e.target.value })}
        />
        <FormInput
          label="DOB"
          placeholder="dateExample"
          type="date"
          value={dayjs(DOB).format("YYYY-MM-DD")}
          onChange={(e: any) =>
            updateValue({ DOB: new Date(e.target.value).valueOf() })
          }
        />
        <FormSelect
          label="gender"
          value={gender}
          onChange={(e: any) => updateValue({ gender: e.target.value })}
          list={genderList}
        />

        <FormInput
          label="pointsPerHour"
          placeholder="numberExample"
          type="number"
          value={pointsPerHour}
          onChange={(e: any) =>
            updateValue({ pointsPerHour: Number(e.target.value) })
          }
        />
        <FormInput
          label="dailyGoal"
          placeholder="numberExample"
          type="number"
          value={dailyGoal}
          onChange={(e: any) => updateValue({ dailyGoal: e.target.value })}
        />
        <Line style={{ justifyContent: "flex-end" }}>
          <Button
            onClick={closeEdit}
            variant="error"
            style={{ marginRight: "0.4rem" }}
          >
            cancel
          </Button>
          <Button onClick={saveUser} variant="success">
            save
          </Button>
        </Line>
      </Form>
    </Container>
  );
}
