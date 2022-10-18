import { faSquareCaretUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Collapsible from "../../../../../theme/collapsible";
import s from "../index.module.scss";

interface Props {
  label?: string | React.ReactNode;
  positionLabel?: "top" | "bottom";
}

export const DefaultLabel = ({ open }: { open: boolean }) => {
  return (
    <div className={s.readMoreBox}>
      <FontAwesomeIcon
        icon={faSquareCaretUp}
        className={`${s.icon} ${open && s.rotatedIcon180Deg} ${
          open && s.activeIcon
        }`}
      />
      <span className={s.showMoreText}>{`Read ${open ? "less" : "More"}`}</span>
    </div>
  );
};

const CollapseBlock: React.FC<Props> = ({
  children,
  label,
  positionLabel = "bottom",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      label={label || <DefaultLabel open={open} />}
      open={open}
      setOpen={setOpen}
      positionLabel={positionLabel}
    >
      {children}
    </Collapsible>
  );
};

export default CollapseBlock;
