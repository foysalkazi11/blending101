/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "./Post.module.scss";

interface PostProps {
  picture: string;
  name: string;
  timestamp: string;
  message?: string;
  attachment?: string;
}

const Post: React.FC<PostProps> = (props) => {
  const { timestamp, name, message, attachment, picture } = props;
  return (
    <div className={styles.post}>
      <img className={styles.post__profile} src={picture} alt="Profile Picture" />
      <div className={styles.post__content}>
        <div className={styles.post__info}>
          <h4>{name}</h4>
          <span>{timestamp}</span>
        </div>
        <p className={styles.post__message}>{message}</p>
        {attachment && <img className={styles.post__image} src={attachment} alt="Profile Picture" />}
      </div>
    </div>
  );
};

Post.defaultProps = {
  name: "Gabriel Braun",
  picture: "https://blending-spaces.netlify.app/img/Gabriel.png",
  timestamp: "12:45 PM",
  message: '#wholefood. This was very tasty. Cinnamon and ginger together gave it a flavor similar "red hots" candy.',
};

export default Post;
