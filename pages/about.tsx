import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fetchData from "../scripts/fetchData";

export default function About() {
  const [profile, setProfile] = useState({
    username: "",
    message: "",
    isLoading: true,
  });
  useEffect(() => {
    fetchData("profile", "nextjs_user")
      .then((res: { username: string; message: string }) =>
        setProfile({ ...res, isLoading: false })
      )
      .catch((err) => toast.error(err));
  }, []);
  if (profile.isLoading) return <div>Loading</div>;
  return (
    <div>
      <div>username: {profile.username}</div>
      <div>message: {profile.message}</div>
    </div>
  );
}
