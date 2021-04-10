import firebase from "../firebase/clientApp";

const watchData = async (collection: string, callback: (e: any[]) => void) => {
  const db = firebase.firestore();

  const collectionRef = db.collection(collection);

  collectionRef.onSnapshot((querySnapshot) => {
    const tempArray = [];
    querySnapshot.forEach((doc: any) => {
      tempArray.push(doc.data());
    });
    callback(tempArray);
  });
};

export default watchData;
