import React, { useState } from "react";
import Collapsible from "../../../../../theme/collapsible";
import s from "../index.module.scss";

interface Props {
  label?: string | React.ReactNode;
}

const CollapseBlock: React.FC<Props> = ({ children, label }) => {
  const [open, setOpen] = useState(false);
  const collapseLabel = (
    <span className={s.showMoreText}>{`Read ${open ? "less" : "More"}`}</span>
  );
  return (
    <Collapsible label={label || collapseLabel} open={open} setOpen={setOpen}>
      {children}
    </Collapsible>
  );
};

export default CollapseBlock;
