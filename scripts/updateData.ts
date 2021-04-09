import firebase from "../firebase/clientApp";
/**
 * ?//TODO: Create different "create" function like createProfile, createTask etc by extending "createData". This will enable me to set the type of the param "value", instead of "any"
 * It will also allow me to pre-define collection and document
 */
const updateData = async (collection: string, document: string, value: any) => {
  const db = firebase.firestore();
  const collectionRef = db.collection(collection);
  const docRef = collectionRef.doc(document);
  return await docRef.update(value);
};

export default updateData;
