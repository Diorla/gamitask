import firebase from "../firebase/clientApp";

const deleteData = async (collection: string, document: string) => {
  const db = firebase.firestore();
  const collectionRef = db.collection(collection);
  const docRef = collectionRef.doc(document);
  return await docRef.delete();
};

export default deleteData;
