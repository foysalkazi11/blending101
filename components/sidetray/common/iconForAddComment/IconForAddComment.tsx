import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import styles from "./IconForAddComment.module.scss";

type IconForAddCommentProps = React.ComponentPropsWithRef<"div"> & {
  handleIconClick: () => void;
  label?: string;
};

const IconForAddComment = ({ handleIconClick, label = "Add Comments", ...props }: IconForAddCommentProps) => {
  return (
    <div className={styles.addCommentsIcon} {...props}>
      {/* <p className={styles.text}>{label}</p> */}
      <Tooltip content={label} direction="left">
        <IconWarper
          iconColor="iconColorWhite"
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
          handleClick={handleIconClick}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IconWarper>
      </Tooltip>
    </div>
  );
};

export default IconForAddComment;
