import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";

export interface loginWithEmailProps {
  email: string;
  password: string;
}

export default function loginWithEmail(
  { email, password }: loginWithEmailProps,
  callback?: ((arg0: firebase.auth.UserCredential) => void) | undefined
): void {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((err) => toast.error(err.message));
}
