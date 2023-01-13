import React, { Dispatch, SetStateAction, useEffect } from "react";
import { faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./Share.module.scss";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import InviteUserForm from "./InviteUserForm";

interface ShareProps {
  id?: string;
  title?: string;
  show: boolean;
  setShow: any;
  handleInvitation?: () => void;
  handleCancel?: () => void;
  emails?: string[];
  setEmails?: Dispatch<SetStateAction<string[]>>;
  submitBtnText?: string;
  loading?: boolean;
}

const Invite = (props: ShareProps) => {
  const { id, title, show, setShow, ...rest } = props;

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.share}>
        <div className={styles.share__header}>
          <Icon fontName={faShareNodes} size="2.5rem" />
          <h3>{title}</h3>
        </div>
        <InviteUserForm {...rest} />
      </div>
    </CustomModal>
  );
};

export default Invite;
