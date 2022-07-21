/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./wikiCenter.module.scss";
import Image from "next/image";
import CancelIcon from "../../../public/icons/cancel_black_36dp.svg";
import FiberManualRecordIcon from "../../../public/icons/fiber_manual_record_black_36dp.svg";
import CustomSlider from "../../../theme/carousel/carousel.component";
import perser from "html-react-parser";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";

//read more read less functionality
// const ReadMore = ({ children }) => {
//   const text = children.toString();
//   const [isReadMore, setIsReadMore] = useState(true);
//   const toggleReadMore = () => {
//     setIsReadMore(!isReadMore);
//   };
//   return (
//     <p className={styles.text}>
//       {isReadMore ? text.slice(0, 300) : text},
//       <span onClick={toggleReadMore} className={styles.read_or_hide}>
//         {isReadMore ? (
//           <span>&nbsp; {"Read More"}</span>
//         ) : (
//           <span>&nbsp; {"Read Less"}</span>
//         )}
//       </span>
//     </p>
//   );
// };

interface WikiCenterComponentProps {
  heading?: string;
  name?: string;
  categroy?: string;
  author?: string;
  coverImages?: string[];
  body?: any;
}

function WikiCenterComponent({
  author = "Author",
  body = "",
  categroy = "Categroy",
  coverImages = [],
  heading = "About Heading",
  name = "Name",
}: WikiCenterComponentProps) {
  const router = useRouter();
  return (
    <div className={styles.centerMain}>
      <div className={styles.recipeHeadingTopSection}>
        <h3>
          <span className={styles.iconPdInner}>
            <div>
              <Image
                src={"/icons/information.svg"}
                alt="icon"
                height={"100%"}
                width={"100%"}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </span>
          {heading}
        </h3>
        <IconWarper
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
          handleClick={() => router?.back()}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
        {/* <CancelIcon className={styles.cancleBtn} /> */}
      </div>
      <div className={styles.card}>
        <div className={styles.blendingRecipeHeading}>
          <h3>{name}</h3>
        </div>
        <div className={styles.blendingRecipeTopOptions}>
          <div className={styles.blendingTopLeft}>
            <div className={styles.tagItemBx}>
              <a className={styles.recipeTag} href="#">
                {categroy}
              </a>
            </div>
            <div className={styles.authorBx}>
              <div className={styles.dotDiv}>
                <FiberManualRecordIcon className={styles.dot} />
              </div>

              <div className={styles.authName}>{author}</div>
            </div>
          </div>
          <div className={styles.blendingTopRight}>
            <ul className={styles.recipeOptionsBtm}>
              <li>
                <a className={styles.bookmarkBtn} href="#">
                  <div className={styles.shareIcon}>
                    <Image
                      src={"/icons/share-alt-light-grey.svg"}
                      alt="Picture will load soon"
                      height={"10%"}
                      width={"10%"}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                  <span className={styles.blshare}>Share</span>
                </a>
              </li>
              <li>
                <button className={styles.commentBtn}>
                  <div className={styles.commentIcon}>
                    <Image
                      src={"/icons/comment.svg"}
                      alt="Picture will load soon"
                      height={"100%"}
                      width={"100%"}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                  <span className={styles.countComment}>21</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <CustomSlider>
          {coverImages?.length
            ? coverImages.map((img, index) => {
                return (
                  <div key={index} className={styles.imageBox}>
                    <img src={img} alt="coverImage" />
                  </div>
                );
              })
            : null}
        </CustomSlider>
      </div>
      {body && JSON.parse(body)?.length ? (
        <div className={styles.bodyContainer}>{perser(JSON.parse(body))}</div>
      ) : null}
    </div>
  );
}

export default WikiCenterComponent;
