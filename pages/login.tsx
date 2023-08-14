import React, { useEffect } from "react";
import AuthScreen from "../theme/authScreen/authScreen.component";

export default function Login(props) {
  // // Syncing with Extension
  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     // setData(JSON.stringify(e.data));
  //     localStorage.setItem("extensionssss", e.data);
  //   });
  // }, []);

  return (
    <div>
      {/* {} */}
      <AuthScreen type={"login"} />
    </div>
  );
}
