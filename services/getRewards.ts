import firebase from "../firebase/clientApp";

/**
 * Used to fetch and monitor if there are any changes in rewards
 * @param userId the user id
 * @param callback it will contain array of all rewards
 */
export default async function getRewards(
  userId: string,
  callback: (e: any[]) => void
) {
  const db = firebase.firestore();

  const collectionRef = db.collection(`user/${userId}/rewards`);

  collectionRef.onSnapshot((querySnapshot) => {
    const tempArray: any[] = [];
    querySnapshot.forEach((doc: any) => {
      tempArray.push(doc.data());
    });
    callback(tempArray);
  });
}
