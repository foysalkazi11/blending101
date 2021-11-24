import React, { useState } from "react";
import styles from "./authScreen.module.scss";
import LoginScreen from "./screens/loginScreen/Login.component";
import SignupScreen from "./screens/signupScreen/SignupScreen.component";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword.component";
import Footer from "./authComponents/socialTray/footer/footer.component";

interface authScreen {
  type: "login" | "signup" | "password_reset" | "";
}

const AuthScreen = ({ type }: authScreen) => {
  type = type || "";

  // login screen
  if (type === "login") {
    return (
      <div className={styles.mainScreen}>
        <div className={styles.mainDiv}>
          <LoginScreen />
        </div>
        <Footer />
      </div>
    );
  }

  // signup screen
  else if (type === "signup") {

    return (
      <div className={styles.mainScreen}>
        <div
          className={styles.mainDiv +" "+styles.mainDivSignup}
          style={{  }}
        >
          <SignupScreen />
        </div>
        <Footer />
      </div>
    );
  }

  // password reset Screen
  else if (type === "password_reset") {
    return (
      <div className={styles.mainScreen}>
        <div className={styles.mainDiv}>
          <ForgotPassword />
        </div>
        <Footer />
      </div>
    );
  } else {
    console.log("Enter Valid Auth Screen");
    return <div>{type}</div>;
  }
};

export default AuthScreen;
