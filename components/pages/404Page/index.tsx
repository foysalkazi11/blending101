import { faArrowLeft, faHouse } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./index.module.scss";

interface Props {
  errorMessage?: string;
}

const ErrorPage = ({ errorMessage = "An error occurred" }: Props) => {
  const router = useRouter();
  return (
    <div className={styles.errorPageContainer}>
      <Image
        src={"/icons/page_not_found.svg"}
        alt="error"
        width={400}
        height={400}
        objectFit="contain"
      />
      <div className={styles.info}>
        <p className={styles.text}>{errorMessage} </p>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.icon}
          onClick={() => router.back()}
        />
        <FontAwesomeIcon
          icon={faHouse}
          className={styles.icon}
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
