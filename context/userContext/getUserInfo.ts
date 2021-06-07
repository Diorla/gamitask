import formatData from "./formatData";
import firebase from "../../firebase/clientApp";
import UserInfo from "../../props/UserInfo";

export default async function getUserInfo(
  userId: string,
  callback: (arg0: UserInfo) => void
): Promise<void> {
  const db = firebase.firestore();

  const doc = db.collection("user").doc(userId);

  doc.onSnapshot((doc) => {
    const formattedData = formatData(doc.data() || {});
    callback(formattedData);
  });
}
