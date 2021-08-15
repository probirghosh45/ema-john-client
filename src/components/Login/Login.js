import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import "./Login.css";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

const firebaseInitializer = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};
firebaseInitializer();

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedUserData, setLoggedUserData] = useContext(UserContext);

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    photoUrl: "",
    password: "",
    password1: "",
    password2: "",
    error: "",
    emailError: "",
    passError: "",
    success: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault(); //page reload bodhu korar jonno "preventDefault" korlam
    if (newUser && user.password1 === user.password2) {
      const newUserInfo = { ...user };
      newUserInfo.error = "";
      newUserInfo.password = user.password1;
      setUser(newUserInfo);
    } else if (newUser && user.password1 !== user.password2) {
      const newUserInfo = { ...user };
      newUserInfo.password = "";
      newUserInfo.error = "Password don't match";
      newUserInfo.success = false;
      setUser(newUserInfo);
    } else if (!newUser) {
      const newUserInfo = { ...user };
      newUserInfo.error = "";
      newUserInfo.password = user.password1;
      newUserInfo.success = false;
      setUser(newUserInfo);
    }
    if (!user.email) {
      const newUserInfo = { ...user };
      newUserInfo.error = "Please Enter a valid Email";
      setUser(newUserInfo);
    } else if (!user.password1) {
      const newUserInfo = { ...user };
      newUserInfo.error =
        "Please Enter a valid Password (minimum 5 characters)";
      setUser(newUserInfo);
    }

    if (
      newUser &&
      user.name &&
      user.email &&
      user.password === user.password2
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          updateUserName(user.name);
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          newUserInfo.name = user.name;
          setUser(newUserInfo);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = errorMessage;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password1) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password1)
        .then((res) => {
          console.log(res);
          const { email, displayName } = res.user;
          const newUserInfo = { ...user };
          newUserInfo.isLoggedIn = true;
          newUserInfo.name = displayName;
          newUserInfo.error = "";
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedUserData({
            email: email,
            name: displayName,
            isLoggedIn: true,
          });
          history.replace(from);
        })
        .catch((error) => {
          console.log(error.message);
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    console.log(user);
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then((res) => {
        // Update successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleBlur = (e) => {
    const newUserInfo = { ...user };
    newUserInfo.error = "";
    setUser(newUserInfo);
    console.log(e.target.value);
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      if (isFormValid) {
        const newUserInfo = { ...user };
        newUserInfo.error = "";
        setUser(newUserInfo);
      }
    }
    if (e.target.name === "password1") {
      isFormValid = e.target.value.length > 4;
    }
    if (e.target.name === "password2") {
      isFormValid = e.target.value.length > 4;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    } else {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = "";
      setUser(newUserInfo);
    }
  };

  const handleGooglSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
        const { displayName, email } = res.user;
        const newUserInfo = { ...user };
        newUserInfo.name = displayName;
        newUserInfo.email = email;
        newUserInfo.isLoggedIn = true;
        setUser(newUserInfo);
        setLoggedUserData({
          email: email,
          name: displayName,
          isLoggedIn: true,
        });
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = { ...user };
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
      });
  };

  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        console.log(res);
        setUser({
          isLoggedIn: true,
          name: displayName,
          email,
        });
        setLoggedUserData({
          email: email,
          name: displayName,
          isLoggedIn: true,
        });
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = { ...user };
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row  d-flex justify-content-center">
        <div className="col-md-5">
          <div className="my-form">
            <h3>{newUser ? "Create an account" : "Login"}</h3>
            <form onSubmit={handleSubmit}>
              {newUser && (
                <div className="input-my-group my-3">
                  <input
                    onBlur={handleBlur}
                    className="inp-style"
                    type="text"
                    name="name"
                    id=""
                    placeholder="Name"
                  />
                </div>
              )}
              <div className="input-my-group my-3">
                <input
                  onBlur={handleBlur}
                  className="inp-style"
                  type="email"
                  name="email"
                  id=""
                  placeholder="Username or Email"
                />
              </div>
              <div className="input-my-group my-3">
                <input
                  onBlur={handleBlur}
                  className="inp-style"
                  type="password"
                  name="password1"
                  id=""
                  placeholder="Password"
                />
              </div>
              {newUser && (
                <div className="input-my-group my-3">
                  <input
                    onBlur={handleBlur}
                    className="inp-style"
                    type="password"
                    name="password2"
                    id=""
                    placeholder="Confirm Password"
                  />
                </div>
              )}

              {user.error && (
                <p className="d-block text-center error">{user.error}</p>
              )}

              {newUser && user.success && (
                <p className="d-block text-center success">
                  Account created Successfully
                </p>
              )}

              <input
                type="submit"
                className="inp-style my-btn-submit mt-3"
                value={newUser ? "Create an Account" : "Login"}
              />
            </form>
            {newUser ? (
              <p className="d-block text-center">
                <small>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setNewUser(!newUser);
                      const newUserInfo = { ...user };
                      newUserInfo.error = "";
                      setUser(newUserInfo);
                    }}
                    className="mini-btn"
                  >
                    Login
                  </button>
                </small>
              </p>
            ) : (
              <p className="d-block text-center">
                <small>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setNewUser(!newUser);
                      const newUserInfo = { ...user };
                      newUserInfo.error = "";
                      setUser(newUserInfo);
                    }}
                    className="mini-btn"
                  >
                    Create an account
                  </button>
                </small>
              </p>
            )}

            <p className="d-block text-center">or</p>
            <button
              onClick={handleGooglSignIn}
              className="inp-style my-btn-google d-flex align-items-center justify-content-center"
            >
              <FontAwesomeIcon
                className="icon"
                icon={faGoogle}
              ></FontAwesomeIcon>{" "}
              <span className="ms-3">Continue with Google</span>
            </button>
            <button
              onClick={handleFbSignIn}
              className="inp-style my-btn-facebook d-flex align-items-center justify-content-center"
            >
              <FontAwesomeIcon
                className="icon ms-3"
                icon={faFacebook}
              ></FontAwesomeIcon>{" "}
              <span className="ms-3"> Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
