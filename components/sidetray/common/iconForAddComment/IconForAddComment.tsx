import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import styles from "./IconForAddComment.module.scss";

interface Props {
  handleIconClick: () => void;
  tooltipText?: string;
}

const IconForAddComment = ({
  handleIconClick,
  tooltipText = "Add Comments",
}: Props) => {
  return (
    <div className={styles.addCommentsIcon}>
      <Tooltip direction="left" content={tooltipText}>
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
