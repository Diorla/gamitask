import firebase from "../firebase/clientApp";

export default function logout() {
  firebase.auth().signOut();
}
