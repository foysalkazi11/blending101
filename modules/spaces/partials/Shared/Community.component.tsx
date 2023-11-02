import Image from "next/image";
import React from "react";
import styles from "./Community.module.scss";
import IconButton from "component/atoms/Button/IconButton.component";
import { faShare, faShareNodes } from "@fortawesome/pro-thin-svg-icons";
import { useMutation } from "@apollo/client";
import { JOIN_SPACE } from "@/spaces/spaces.graphql";
import { useUser } from "context/AuthProvider";
import Publish from "helpers/Publish";
import Link from "next/link";

interface CommunityProps {
  id: string;
  name?: string;
  members?: number;
  isJoined?: boolean;
}
const CommunityCard: React.FC<CommunityProps> = (props) => {
  const { id: userId } = useUser();
  const { id, name, members, isJoined } = props;

  const [joinSpace, joinState] = useMutation(JOIN_SPACE);

  const onJoin = async () => {
    // Should update the member number after joining
    await Publish({
      mutate: joinSpace,
      state: joinState,
      variables: {
        userId,
        spaceId: id,
      },
      success: `Joined ${name} successfully`,
    });
  };

  return (
    <Link href={`/spaces/${id}/meetups`}>
      <div className={styles.community}>
        <div className={styles.community__hero}>
          <img src="/background/smoothies.jpg" alt="Card" />
          {!isJoined && (
            <button className={styles.action__join} onClick={onJoin}>
              Join
            </button>
          )}
          <IconButton className={styles.action__share} fontName={faShareNodes} variant="white" size="small" />
        </div>
        <div className={styles.community__content}>
          <span>{members} Members</span>
          <h5>{name}</h5>
        </div>
      </div>
    </Link>
  );
};
CommunityCard.defaultProps = {
  name: "30 Days Blending Challenge",
  members: 0,
  isJoined: false,
};

export default CommunityCard;
