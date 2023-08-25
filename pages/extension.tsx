import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useSession, useUser } from "../context/AuthProvider";

const TEST_DOMAIN = "http://localhost:3000";
const EXTENSION_DOMAIN =
  "chrome-extension://lijpknkegggepjnhoiklomgfbldbmnef/src/popup/popup.html";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const Extension = () => {
  const user = useUser();
  const session = useSession();

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
        picture: user.image,
      }),
      EXTENSION_DOMAIN,
    );
  });

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (!e.data) return;
      try {
        const session = JSON.parse(e.data);
        session?.forEach((item) => {
          localStorage.setItem(item[0], item[1]);
          setCookie(item[0], item[1], 30);
        });
        setData(e.data);
      } catch (error) {
        return;
      }
    });
  }, []);

  return <div>Extension Data: {data}</div>;
};

export default Extension;
