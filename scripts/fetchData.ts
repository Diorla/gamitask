import firebase from "../firebase/clientApp";

const fetchData = async (collection: string, document: string) => {
  const db = firebase.firestore();
  const collectionRef = db.collection(collection);
  const docRef = await collectionRef.doc(document).get();

  if (!docRef.exists) {
    return null;
  }

  return docRef.data();
};

export default fetchData;
