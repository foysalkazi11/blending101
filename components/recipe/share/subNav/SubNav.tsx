import React from "react";
import styles from "./SubNav.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonComponent from "../../../../theme/button/button.component";
import Link from "next/link";

type SubNavProps = {
  showButton?: boolean;
  buttonText?: string;
  buttonClick?: () => void;
  backIconText?: string;
  backAddress?: string;
  compareAmout?: number;
  closeCompare?: () => void;
};

const SubNav = (props: SubNavProps) => {
  const {
    showButton = false,
    buttonText = "Button",
    buttonClick = () => {},
    backIconText = "Back",
    backAddress = "#",
    compareAmout = 0,
    closeCompare = () => {},
  } = props;
  return (
    <div className={styles.subNav}>
      <div className={styles.subNav__discover}>
        <Link href={backAddress} passHref>
          <ArrowBackIcon className={styles.subNav__discover__icon} />
        </Link>
        <p>{backIconText}</p>
      </div>

      {showButton ? (
        <ButtonComponent
          type="buttonWithIcon"
          value={buttonText}
          icon="/images/formulate.svg"
          style={{ height: "50px", width: "234px", borderRadius: "14px" }}
          onClick={buttonClick}
        />
      ) : null}

      <div className={styles.subNav__compare}>
        <p>{compareAmout} compare</p>
        <HighlightOffIcon
          className={styles.subNav__compare__icon}
          onClick={closeCompare}
        />
      </div>
    </div>
  );
};

export default SubNav;
