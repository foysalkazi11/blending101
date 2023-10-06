import React, { useEffect, useState } from "react";
import { useSession, useUser } from "../context/AuthProvider";
import useExtSession from "@/app/hooks/utils/useExtension";

const EXTENSION_DOMAIN = `chrome-extension://${process.env.NEXT_PUBLIC_EXTENSION_URL}/src/popup/popup.html`;

const Extension = () => {
  const session = useExtSession();
  const [data, setData] = useState("");

  useEffect(() => {
    window.parent.postMessage(JSON.stringify(session), EXTENSION_DOMAIN);
  });

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (!e.data) return;
      try {
        const session = JSON.parse(e.data);
        session?.forEach((item) => {
          localStorage.setItem(item[0], item[1]);
        });
        setData(e.data);
      } catch (error) {
        return;
      }
    });
  }, []);

  return (
    <div>
      Extension {process.env.NODE_ENV === "development" ? "Localhost" : "Production"} Data: {data}
    </div>
  );
};

export default Extension;
