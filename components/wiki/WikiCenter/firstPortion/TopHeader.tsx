import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import PanelHeader from "../../../recipe/share/panelHeader/PanelHeader";

interface Props {
  type: string;
}

const TopHeader = ({ type }: Props) => {
  const router = useRouter();
  return (
    <PanelHeader
      icon={
        "/icons/information.svg"
        // <FontAwesomeIcon icon={faChartColumn} fontSize="24" />
      }
      title={`About ${type}`}
      rightSide={
        <IconWarper
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
          handleClick={() => router.push("/wiki")}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
      }
    />
  );
};

export default TopHeader;
