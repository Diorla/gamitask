import { toast } from "react-toastify";
import firebase from "../firebase/clientApp";

export function loginWithGoogle(callback?: {
  (): void;
  (arg0: firebase.auth.UserCredential): void;
}) {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((err) => {
      console.log({ err });
      toast.error(err.message);
    });
}

// export function loginWithFacebook(callback?: (arg0: void) => void) {
//   const provider = new firebase.auth.FacebookAuthProvider();
//   provider.addScope("profile");
//   provider.addScope("email");
//   firebase
//     .auth()
//     .signInWithRedirect(provider)
//     .then((res) => {
//       if (callback) callback(res);
//     })
//     .catch((err) => toast.error(err.message));
// }

export interface loginWithEmailProps {
  email: string;
  password: string;
}

export function loginWithEmail(
  { email, password }: loginWithEmailProps,
  callback?: ((arg0: firebase.auth.UserCredential) => void) | undefined
) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((err) => toast.error(err.message));
}

export function signUpWithEmail(
  { email, password }: loginWithEmailProps,
  callback?: (arg0: firebase.auth.UserCredential) => void
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((err) => toast.error(err.message));
}
