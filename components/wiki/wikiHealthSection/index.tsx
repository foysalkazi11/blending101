import React from "react";
import WikiHealthPanel from "../wikiHealthPanel/WikiHealthPanel";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: boolean, extraInfo?: any) => void;
  toggle?: number;
}

const WikiHealthSection = ({ checkActive, handleItemClick, toggle }: Props) => {
  return <>{toggle === 0 && <WikiHealthPanel />}</>;
};

export default WikiHealthSection;
