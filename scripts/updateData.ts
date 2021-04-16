import firebase from "../firebase/clientApp";

const updateData = async (collection: string, document: string, value: any) => {
  const db = firebase.firestore();
  const collectionRef = db.collection(collection);
  const docRef = collectionRef.doc(document);
  return await docRef.update(value);
};

export default updateData;
