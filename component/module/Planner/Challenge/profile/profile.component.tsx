import Image from "next/image";
import styles from "./profile.module.scss";

interface ProfileInterface {
    profileImage?: string;
}
function Profile({ profileImage }: ProfileInterface) {
    profileImage = profileImage || "/images/5.jpeg";
  return (
    <div className={styles.challenge_circle_profile}>
      <Image
        src={profileImage}
        alt={""}
        layout={"fill"}
        objectFit={"fill"}
      />
    </div>
  );
}

export default Profile;
