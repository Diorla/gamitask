import firebase from "../../firebase/clientApp";

/**
 * Used to fetch and monitor if there are any changes
 * @param userId the user id
 * @param callback it will contain array of all tasks
 */
export default async function getTaskList(
  userId: string,
  callback: (e: any[]) => void
): Promise<void> {
  const db = firebase.firestore();

  const collectionRef = db.collection(`user/${userId}/tasks`);

  collectionRef.onSnapshot((querySnapshot) => {
    const tempArray: any[] = [];
    querySnapshot.forEach((doc: any) => {
      tempArray.push(doc.data());
    });
    callback(tempArray);
  });
}
