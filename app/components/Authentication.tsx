"use client";

import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

function Authentication({ children }: React.PropsWithChildren<object>) {
  const provider = new GoogleAuthProvider();

  const onSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("token: ", token);
        console.log("user: ", user);
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error?.code;
        const errorMessage = error?.message;
        // The email of the user's account used.
        const email = error?.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("Error message: ", errorMessage);
        console.log("Error code: ", errorCode);
      });
  };

  return <div onClick={onSignIn}>{children}</div>;
}

export default Authentication;
