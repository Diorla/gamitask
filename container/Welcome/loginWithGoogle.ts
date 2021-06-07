import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";

export default function loginWithGoogle(callback?: {
  (): void;
  (arg0: firebase.auth.UserCredential): void;
}): void {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((err) => toast.error(err.message));
}
