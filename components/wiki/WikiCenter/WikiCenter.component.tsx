import React, { useState } from "react";
import styles from "./wikiCenter.module.scss";
import CarouselComponent from "./Carousel/Carousel.component";
import Image from "next/image";
import CancelIcon from "../../../public/icons/cancel_black_36dp.svg";
import FiberManualRecordIcon from "../../../public/icons/fiber_manual_record_black_36dp.svg";
// import IngredientIconSvg from "./Assets/cardiogram.svg"

function WikiCenterComponent() {
  // const { observe, width } = useDimensions<HTMLDivElement | null>();

  const TitledContentData = [
    {
      Icon: "/icons/basket.svg",
      Title: "Ingredients",
      Content: `Contrary to popular belief, Lorem Ipsum is not simply random text.
    It has roots in a piece of classical Latin literature from 45 BC,
    making it over 2000 years old. Richard McClintock, a Latin professor
    at Hampden-Sydney College in Virginia, looked up one of the more
    obscure Latin words, consectetur, from a Lorem Ipsum passage, and
    going through the cites of the word in classical literature,
    discovered the undoubtable source. Lorem Ipsum comes from sections
    by Cicero are also reproduced in their exact original form,
    accompanied by English versions from the 1914 translation by H.
    Rackham. asfhajffuu faakl`,
    },
    {
      Icon: "/icons/cardiogram.svg",
      Title: "Health",
      Content: `Contrary to popular belief, Lorem Ipsum is not simply random text.
    It has roots in a piece of classical Latin literature from 45 BC,
    making it over 2000 years old. Richard McClintock, a Latin professor
    at Hampden-Sydney College in Virginia, looked up one of the more
    obscure Latin words, consectetur, from a Lorem Ipsum passage, and
    going through the cites of the word in classical literature,
    discovered the undoubtable source. Lorem Ipsum comes from sections
    by Cicero are also reproduced in their exact original form,
    accompanied by English versions from the 1914 translation by H.
    Rackham. asfhajffuu faakl`,
    },
  ];

  //read more read less functionality
  const ReadMore = ({ children }) => {
    const text = children.toString();
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className={styles.text}>
        {isReadMore ? text.slice(0, 300) : text},
        <span onClick={toggleReadMore} className={styles.read_or_hide}>
          {isReadMore ? (
            <span>&nbsp; {"Read More"}</span>
          ) : (
            <span>&nbsp; {"Read Less"}</span>
          )}
        </span>
      </p>
    );
  };

  return (
    <div className={styles.centerMain}>
      <div className={styles.recipeHeadingTopSection}>
        <h3>
          <span className={styles.iconPdInner}>
            <div>
              <Image
                src={"/icons/information.svg"}
                alt="Picture will load soon"
                height={"100%"}
                width={"100%"}
                // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </span>
          About Health (Disease, Conditions and Systems)
        </h3>
        <CancelIcon className={styles.cancleBtn} />
      </div>
      <div className={styles.card}>
        <div className={styles.blendingRecipeHeading}>
          <h3>Digestive System</h3>
        </div>
        <div className={styles.blendingRecipeTopOptions}>
          <div className={styles.blendingTopLeft}>
            <div className={styles.tagItemBx}>
              <a className={styles.recipeTag} href="javascript:void(0)">
                Leafy
              </a>
            </div>
            <div className={styles.authorBx}>
              <div className={styles.dotDiv}>
                <FiberManualRecordIcon className={styles.dot} />
              </div>

              <div className={styles.authName}>Author</div>
            </div>
          </div>
          <div className={styles.blendingTopRight}>
            <ul className={styles.recipeOptionsBtm}>
              <li>
                <a className={styles.bookmarkBtn} href="javascript:void(0)">
                  <div className={styles.shareIcon}>
                    <Image
                      src={"/icons/share-alt-light-grey.svg"}
                      alt="Picture will load soon"
                      height={"10%"}
                      width={"10%"}
                      // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
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
                      // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
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
        <CarouselComponent />
        <div className={styles.healthRiskRankScore}>240</div>
        <div className={styles.healthRiskRankTitle}>Health Risk Rank</div>
        <ReadMore>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham. asfhajffuu faakl
        </ReadMore>
      </div>

      <div className={styles.content}>
        <div className={styles.textContentDiv}>
          {TitledContentData.map(({ Icon, Title, Content }, index) => {
            return (
              <section className={styles.contentSection} key={index}>
                <div className={styles.contentTitle}>
                  <div className={styles.imgdiv}>
                    <Image
                      src={Icon}
                      alt="Picture will load soon"
                      height={"100%"}
                      width={"100%"}
                      // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
                      layout="responsive"
                      objectFit="contain"
                      className={styles.image}
                    />
                  </div>
                  {Title}
                </div>
                <ReadMore>{Content}</ReadMore>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WikiCenterComponent;
