import { useCallback } from "react";
import { useSession, useUser } from "../../../../context/AuthProvider";
import { useAppSelector } from "../../../../redux/hooks";
import { useRouter } from "next/router";

const useExtSession = () => {
  const session = useSession();
  const user = useUser();

  const token = session?.signInUserSession?.accessToken;

  return {
    token: token?.jwtToken || "",
    expiration_time: token?.exp || "",
    email: session?.attributes?.email || "",
    userId: user.id,
    name: user.name || "Unknown",
    picture: user.image,
  };
};

export default useExtSession;

export const useRecipeSource = () => {
  const router = useRouter();
  const session = useExtSession();

  const onNavigateSource = useCallback(
    (payload: { id: string; name: string; image: string; origin: string }) => {
      router.reload();
      const extensionId = process.env.NEXT_PUBLIC_EXTENSION_URL;
      //@ts-ignore
      chrome.runtime.sendMessage(
        extensionId,
        {
          action: "BRAND_NAVIGATE",
          payload: payload,
          session,
        },
        () => {},
      );
      window.location.href = "";
    },
    [router, session],
  );

  return onNavigateSource;
};
