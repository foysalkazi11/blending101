import React from "react";
import AuthScreen from "../theme/authScreen/authScreen.component";

export default function forgetpassword() {
  return (
    <div>
      <AuthScreen type={"password_reset"} />
    </div>
  );
}
