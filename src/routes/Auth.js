import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const history = useHistory();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
      }
    });
  }, []);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="authContainer">
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
