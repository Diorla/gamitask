import firebase from "../firebase/clientApp";

const watchData = async (collection: string, callback: (e: any[]) => void) => {
  const db = firebase.firestore();

  const collectionRef = db.collection(collection);

  collectionRef.onSnapshot((querySnapshot) => {
    const tempArray: any[] = [];
    querySnapshot.forEach((doc: any) => {
      tempArray.push(doc.data());
    });
    callback(tempArray);
  });
};

export const watchDoc = async (
  collection: string,
  document: string,
  callback: {
    (data: any): void;
    (arg0: firebase.firestore.DocumentData | undefined): void;
  }
) => {
  const db = firebase.firestore();

  const doc = db.collection(collection).doc(document);

  doc.onSnapshot((doc) => callback(doc.data()));
};

export default watchData;
