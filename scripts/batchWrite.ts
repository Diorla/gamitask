import firebase from "../firebase/clientApp";

/**
 * This is a function for multiple writes
 * @example batchWrite((db, batch)=> {
 * const nycRef = db.collection('cities').doc('NYC');
 * batch.set(nycRef, {name: 'New York City'});
 * })
 */
export default async function batchWrite(
  callback: (
    arg0: firebase.firestore.Firestore,
    arg1: firebase.firestore.WriteBatch
  ) => void
) {
  const db = firebase.firestore();
  const batch = db.batch();
  callback(db, batch);
  await batch.commit();
}
