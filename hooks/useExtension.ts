import React, { useMemo } from "react";
import { useSession } from "../auth/auth.component";
import { useAppSelector } from "../redux/hooks";

const useExtension = () => {
  const session = useSession();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const displayName = useAppSelector(
    (state) => state.user?.dbUser?.displayName || "",
  );
  const picture = useAppSelector((state) => state.user?.dbUser?.image || "");

  const token = session?.signInUserSession?.accessToken;

  return {
    token: token?.jwtToken || "",
    expiration_time: token?.exp || "",
    email: session?.attributes?.email || "",
    userId,
    name: displayName || "Unknown",
    picture,
  };
};

export default useExtension;
