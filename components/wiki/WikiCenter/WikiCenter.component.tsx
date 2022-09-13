/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./wikiCenter.module.scss";
import Image from "next/image";
import FiberManualRecordIcon from "../../../public/icons/fiber_manual_record_black_36dp.svg";
import CustomSlider from "../../../theme/carousel/carousel.component";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import IngredientInfo from "./ingredientInfo/IngredientInfo";
import { GiGl } from "../../../type/nutrationType";
import { WikiType } from "../../../type/wikiListType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
} from "../../../redux/slices/wikiSlice";
import { faMessageDots as faMessageDotsSolid } from "@fortawesome/pro-solid-svg-icons";
import { faMessageDots as faMessageDotsLight } from "@fortawesome/pro-light-svg-icons";
import RenderJsonToHtml from "./jsonToHtml";

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
  giGl?: GiGl;
  type?: WikiType;
  wikiId?: string;
  commentsCount?: number;
  scrollPoint?: string;
}

function WikiCenterComponent({
  author = "Author",
  body = "",
  categroy = "Categroy",
  coverImages = [],
  heading = "About Heading",
  name = "Name",
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
  type = "Ingredient",
  wikiId = "",
  commentsCount = 0,
  scrollPoint = "",
}: WikiCenterComponentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpenWikiCommentsTray, wikiCommentsTrayCurrentWikiEntity } =
    useAppSelector((state) => state?.wiki);

  const openWikiCommentsTray = () => {
    if (!isOpenWikiCommentsTray) {
      dispatch(setIsOpenWikiCommentsTray(true));
    }
    dispatch(
      setWikiCommentsCurrentIngredient({
        ...wikiCommentsTrayCurrentWikiEntity,
        id: wikiId,
      }),
    );
  };

  //console.log(body && JSON.stringify(JSON.parse(body), null, 3));

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
              <p>{categroy}</p>
            </div>
            <div className={styles.authorBx}>
              <div className={styles.dotDiv}>
                <FiberManualRecordIcon className={styles.dot} />
              </div>

              <div className={styles.authName}>{author}</div>
            </div>
          </div>

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
              <div
                className={styles.commentsIconBox}
                onClick={openWikiCommentsTray}
              >
                <FontAwesomeIcon
                  icon={commentsCount ? faMessageDotsSolid : faMessageDotsLight}
                  className={`${
                    commentsCount ? styles.activeIcon : styles.inActiveIcon
                  }`}
                />
                <p
                  className={`${styles.text} ${
                    commentsCount ? styles.activeIcon : styles.inActiveIcon
                  }`}
                >
                  {commentsCount}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <CustomSlider>
          {coverImages?.length
            ? coverImages.map((img, index) => {
                return (
                  <div
                    key={index}
                    className={styles.imageBox}
                    //style={{ backgroundImage: `url(${img})` }}
                  >
                    <img src={img} alt="coverImage" />
                  </div>
                );
              })
            : null}
        </CustomSlider>
        {type === "Ingredient" && (
          <div className={styles.ingredientInfoContainer}>
            <IngredientInfo borderRight={true} />
            <IngredientInfo
              borderRight={true}
              text="Glycemic Index"
              amount={Math?.round(giGl?.totalGi)}
            />
            <IngredientInfo
              borderRight={true}
              text="Glycemic Load"
              amount={Math?.round(giGl?.totalGL)}
            />
            <IngredientInfo amount={240} text="Nutri Score" />
          </div>
        )}
      </div>
      {body ? (
        <RenderJsonToHtml
          blocks={JSON.parse(body)?.blocks}
          scrollPoint={scrollPoint}
        />
      ) : null}
    </div>
  );
}

export default WikiCenterComponent;
