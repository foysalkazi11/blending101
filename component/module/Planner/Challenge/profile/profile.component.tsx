import Image from "next/image";
import { useAppSelector } from "../../../../../redux/hooks";
import styles from "./profile.module.scss";

function Profile() {
  const profileImage = useAppSelector((state) => state.user.dbUser.image);
  return (
    <div className={styles.challenge_circle_profile}>
      <Image
        src={profileImage || "/images/5.jpeg"}
        alt={""}
        layout={"fill"}
        objectFit={"fill"}
      />
    </div>
  );
}

export default Profile;
