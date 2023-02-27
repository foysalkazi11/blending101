import { gql, useMutation } from "@apollo/client";
import TURN_ON_OR_OFF_VERSION from "../gqlLib/versions/mutation/turnOnOrOffVersion";

const useTurnedOnOrOffVersion = () => {
  const [turnedOnOrOffVersion, { ...rest }] = useMutation(
    TURN_ON_OR_OFF_VERSION,
    { fetchPolicy: "network-only" },
  );
};

export default useTurnedOnOrOffVersion;
