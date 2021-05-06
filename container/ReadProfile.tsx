import Container from "../components/Container";
import ProfileImage from "../components/ProfileImage";
import { useUser } from "../context/userContext";

export default function ReadProfile({ openEdit }: { openEdit: () => void }) {
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
      <div>First name: {firstName}</div>
      <div>Last name: {lastName}</div>
      <div>Email: {email}</div>
      <div>Date of birth: {DOB && new Date(DOB).toDateString()}</div>
      <div>Joined: {new Date(created).toDateString()}</div>
      <div>Gender: {gender}</div>
      <div>Points per hour: {pointsPerHour}</div>
      <div>Daily goal: {dailyGoal}</div>
      <div>
        <button onClick={openEdit}>Edit</button>
      </div>
    </Container>
  );
}
