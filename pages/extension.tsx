import React, { useEffect, useState } from "react";
import { useSession } from "../auth/auth.component";
import { useAppSelector } from "../redux/hooks";

const TEST_DOMAIN = "http://localhost:3000";
const EXTENSION_DOMAIN =
  "chrome-extension://ebbpnaajpojkhndmjmdjabgjmngjgmhm/src/popup/popup.html";

const Extension = () => {
  const session = useSession();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const displayName = useAppSelector(
    (state) => state.user?.dbUser?.displayName || "",
  );

  const [data, setData] = useState("");
  useEffect(() => {
    const token = session?.signInUserSession?.accessToken;
    window.parent.postMessage(
      JSON.stringify({
        token: token?.jwtToken || "",
        expiration_time: token?.exp || "",
        email: session?.attributes?.email || "",
        userId,
        name: displayName || "Unknown",
      }),
      EXTENSION_DOMAIN,
    );
  });

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (!e.data) return;
      const session = JSON.parse(e.data);
      session?.forEach((item) => {
        localStorage.setItem(item[0], item[1]);
      });
      setData(JSON.stringify(e.data));
      localStorage.setItem("extension", e.data);
    });
  }, []);

  return <div>Extension Data: {data}</div>;
};

export default Extension;
