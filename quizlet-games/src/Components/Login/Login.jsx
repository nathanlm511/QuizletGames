import React, { useEffect, useState } from "react";
import { fire } from "../../Auth/firebase";

export const Login = ({ setUser, user, setSignUpDisplay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [userName, setUserName] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(error.message);
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
            break;
          default: // Default to nothing
        }
      });
    console.log("Successful Log in");
    setSignUpDisplay(true);
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user.updateProfile({
          displayName: userName,
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weal-password":
            setPasswordError(error.message);
            break;
          default: // Default to nothing
        }
      });
    setSignUpDisplay(true);
  };

  useEffect(() => {
    const authListener = () => {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
        }
      });
    };
    authListener();
  }, []);

  return (
    <section>
      {hasAccount ? (
        <>
          {" "}
          <h5>Sign In</h5>{" "}
        </>
      ) : (
        <h5>Sign Up</h5>
      )}

      <div>
        <label>Email</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{passwordError}</p>
        <div>
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account ?{" "}
                <a onClick={() => setHasAccount(!hasAccount)}>Sign Up</a>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Sign Up</button>
              <p>
                Have an account ?{" "}
                <a onClick={() => setHasAccount(!hasAccount)}>Sign in</a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
