import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useSession, useUser } from "../context/AuthProvider";

const TEST_DOMAIN = "http://localhost:3000";
const EXTENSION_DOMAIN =
  "chrome-extension://ebbpnaajpojkhndmjmdjabgjmngjgmhm/src/popup/popup.html";

const Extension = () => {
  const user = useUser();
  const session = useSession();
  const picture = useAppSelector((state) => state.user?.dbUser?.image || "");

  const [data, setData] = useState("");
  useEffect(() => {
    const token = session?.signInUserSession?.accessToken;
    window.parent.postMessage(
      JSON.stringify({
        token: token?.jwtToken || "",
        expiration_time: token?.exp || "",
        email: session?.attributes?.email || "",
        userId: user.id,
        name: user.name || "Unknown",
        picture,
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
