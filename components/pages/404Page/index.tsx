import { faArrowLeft, faHouse } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";
import styles from "./index.module.scss";

interface Props {
  errorMessage?: string;
  image?: string;
  style?: React.CSSProperties;
  showBackIcon?: boolean;
  showHomeIcon?: boolean;
  imageWidth?: number;
  imageHight?: number;
}

const ErrorPage = ({
  errorMessage = "An error occurred",
  image = "/icons/page_not_found.svg",
  imageHight = 400,
  imageWidth = 400,
  showBackIcon = true,
  showHomeIcon = true,
  style = {},
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(router.asPath);

  // useEffect(() => {
  //   dispatch(
  //     updateHeadTagInfo({
  //       title: errorMessage || "Page not found",
  //       description: errorMessage || "page not found(404)",
  //     }),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={styles.errorPageContainer} style={style}>
      <Image
        src={image}
        alt="error"
        width={imageWidth}
        height={imageHight}
        objectFit="contain"
      />
      <div className={styles.info}>
        <p className={styles.text}>{errorMessage} </p>
        {showBackIcon && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.icon}
            onClick={() => router.back()}
          />
        )}
        {showHomeIcon && (
          <FontAwesomeIcon
            icon={faHouse}
            className={styles.icon}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
