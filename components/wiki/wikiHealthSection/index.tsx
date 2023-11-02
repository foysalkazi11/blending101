import React from "react";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: boolean, extraInfo?: any) => void;
}

const WikiHealthSection = ({ checkActive, handleItemClick }: Props) => {
  return <WikiHealthPanel />;
};

export default WikiHealthSection;
