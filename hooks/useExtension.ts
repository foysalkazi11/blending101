import { useSession, useUser } from "../context/AuthProvider";
import { useAppSelector } from "../redux/hooks";

const useExtension = () => {
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

export default useExtension;
