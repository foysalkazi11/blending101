import React, { useEffect } from "react";
import { useSession } from "../auth/auth.component";
import { useAppSelector } from "../redux/hooks";

const Extension = () => {
  const session = useSession();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const displayName = useAppSelector(
    (state) => state.user?.dbUser?.displayName || "",
  );

  useEffect(() => {
    console.log("message passing");
    window.postMessage("Hello from Frontend", "*");
  }, []);

  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     if (
  //       e.origin !==
  //       "chrome-extension://ebbpnaajpojkhndmjmdjabgjmngjgmhm/src/popup/popup.html"
  //     )
  //       return;
  //     console.log(e);
  //     // const data = JSON.parse(e.data);
  //     // if (typeof data.name !== "undefined") {
  //     //   localStorage.setItem("name", data);
  //     //   console.log("Name is set: ", data.name);
  //     // }
  //   });
  // }, []);
  // useEffect(() => {
  //   const id = "ebbpnaajpojkhndmjmdjabgjmngjgmhm";
  //   const token = session?.signInUserSession?.accessToken;
  //   //@ts-ignore
  //   chrome.runtime?.sendMessage(
  //     id,
  //     {
  //       action: "AUTH_LOGIN",
  //       payload: {
  //         token: token?.jwtToken,
  //         expiration_time: token?.exp,
  //         email: session?.attributes?.email,
  //         userId,
  //         name: displayName,
  //       },
  //     },
  //     () => {},
  //   );
  // }, [displayName, session, userId]);

  return <div>Extension Update</div>;
};

export default Extension;
