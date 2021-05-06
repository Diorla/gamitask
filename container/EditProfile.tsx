import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "../components/Container";
import Input from "../components/Form/Input";
import UploadImage from "../components/UploadImage";
import { useUser } from "../context/userContext";
import createData from "../scripts/createData";

export default function EditProfile({ closeEdit }: { closeEdit: () => void }) {
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
      <UploadImage
        imageUrl={profileImage}
        alt="Profile image"
        setImage={(val) => updateValue({ profileImage: val })}
      />
      <Input
        label="First name"
        value={firstName}
        onChange={(e: any) => updateValue({ firstName: e.target.value })}
      />
      <Input
        label="Last name"
        value={lastName}
        onChange={(e: any) => updateValue({ lastName: e.target.value })}
      />
      <Input
        label="Date of birth"
        type="date"
        value={dayjs(DOB).format("YYYY-MM-DD")}
        onChange={(e: any) =>
          updateValue({ DOB: new Date(e.target.value).valueOf() })
        }
      />
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        placeholder="Select your gender"
        value={gender}
        onChange={(e: any) => updateValue({ gender: e.target.value })}
      >
        <option value="Prefer not to say" label="Prefer not to say" />
        <option value="Non binary" label="Non binary" />
        <option value="Female" label="Female" />
        <option value="Male" label="Male" />
      </select>
      <Input
        label="Points per hour"
        value={pointsPerHour}
        onChange={(e: any) =>
          updateValue({ pointsPerHour: Number(e.target.value) })
        }
      />
      <Input
        label="Daily goal"
        value={dailyGoal}
        onChange={(e: any) => updateValue({ dailyGoal: e.target.value })}
      />
      <div>
        <button onClick={closeEdit}>Cancel</button>
        <button onClick={saveUser}>Save</button>
      </div>
    </Container>
  );
}
