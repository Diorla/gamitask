import { toast } from "react-toastify";
import firebase from "../../firebase/clientApp";

export interface loginWithEmailProps {
  email: string;
  password: string;
}

export default function signUpWithEmail(
  { email, password }: loginWithEmailProps,
  callback?: (arg0: firebase.auth.UserCredential) => void
): void {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((err) => toast.error(err.message));
}
