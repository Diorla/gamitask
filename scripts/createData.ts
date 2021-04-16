import firebase from "../firebase/clientApp";

const createData = async (collection: string, document: string, value: any) => {
  const db = firebase.firestore();
  const collectionRef = db.collection(collection);
  const docRef = collectionRef.doc(document);
  return await docRef.set(value, { merge: true });
};

export default createData;
