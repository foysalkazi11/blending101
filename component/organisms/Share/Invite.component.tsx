import React, { useState } from "react";
import { faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./Share.module.scss";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import { useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "../../../redux/hooks";
import { INVITE_CHALLENGE } from "../../../graphql/Challenge";
import InviteUserForm from "./InviteUserForm";

interface ShareProps {
  id?: string;
  title?: string;
  show: boolean;
  setShow: any;
}

const Invite = (props: ShareProps) => {
  const { id, title, show, setShow } = props;
  const [inviteChallenge] = useMutation(INVITE_CHALLENGE);
  const [emails, setEmails] = useState([]);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const handleInvitation = () => {
    if (emails.length === 0) return;
    inviteChallenge({
      variables: {
        shareWithOther: false,
        emails,
        user: userId,
        challengeId: id,
      },
    }).then((response) => {
      setShow(false);
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge/invited/?id=${response.data.inviteToChallenge}`,
      );
    });
  };

  const resetModal = () => {
    setEmails([]);
    setShow(false);
  };

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.share}>
        <div className={styles.share__header}>
          <Icon fontName={faShareNodes} size="2.5rem" />
          <h3>{title}</h3>
        </div>
        <InviteUserForm
          emails={emails}
          setEmails={setEmails}
          handleCancel={resetModal}
          handleInvitation={handleInvitation}
        />
      </div>
    </CustomModal>
  );
};

export default Invite;
