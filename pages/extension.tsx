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
    const id = "ebbpnaajpojkhndmjmdjabgjmngjgmhm";
    const token = session?.signInUserSession?.accessToken;
    //@ts-ignore
    chrome.runtime?.sendMessage(
      id,
      {
        action: "AUTH_LOGIN",
        payload: {
          token: token?.jwtToken,
          expiration_time: token?.exp,
          email: session?.attributes?.email,
          userId,
          name: displayName,
        },
      },
      () => {},
    );
  }, [displayName, session, userId]);

  return <div>Extension</div>;
};

export default Extension;
