import firebase from "../firebase/clientApp";

export function loginWithGoogle(callback?: (arg0: void) => void) {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then((res) => {
      if (callback) callback(res);
    })
    .catch((googleErr) => console.log({ googleErr }));
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
//     .catch((fbErr) => console.log({ fbErr }));
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
    .catch((loginErr) => console.log({ loginErr }));
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
    .catch((signUpErr) => console.log({ signUpErr }));
}
