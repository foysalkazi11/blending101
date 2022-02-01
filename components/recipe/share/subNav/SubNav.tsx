import React from "react";
import styles from "./SubNav.module.scss";
import ArrowBackIcon from "../../../../public/icons/arrow_back_black_36dp.svg";
import HighlightOffIcon from "../../../../public/icons/highlight_off_black_36dp.svg";
import ButtonComponent from "../../../../theme/button/button.component";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
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

      <div className={styles.subNav__compare} onClick={() => router.push('/recipe/formulate')}>
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
