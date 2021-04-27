import firebase from "../firebase/clientApp";

/**
 * This is a function for multiple writes
 * @example transation((db, t)=> {
 * const cityRef = db.collection('cities').doc('SF');
 * const doc = await t.get(cityRef);
 * const newPopulation = doc.data().population + 1;
 * t.update(cityRef, { population: newPopulation });
 * })
 */
export default async function transation(
  callback: (
    arg0: firebase.firestore.Firestore,
    arg1: firebase.firestore.Transaction
  ) => void
) {
  const db = firebase.firestore();
  return await db.runTransaction(async (t) => {
    callback(db, t);
  });
}
