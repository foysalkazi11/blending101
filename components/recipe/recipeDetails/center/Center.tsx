/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdInfo, MdOutlineClose } from "react-icons/md";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import styles from "./Center.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MdOutlineInfo, MdAdd, MdRemove } from "react-icons/md";
import DropDown from "../../../../theme/dropDown/DropDown.component";
import { BiBarChart } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";

const recipeSliderImage = [
  "/images/recipe-slider-img1.png",
  "/images/recipe-slider-img2.png",
  "/images/recipe-slider-img3.png",
  "/images/recipe-slider-img4.png",
];
let BlendtecItem = ["Blendtec", "Blendtec"];
let ozItem = ["64 oz", "64 oz"];

const Center = () => {
  const [counter, setCounter] = useState(1);
  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + " " + styles.prevBtn} onClick={onClick}>
        <ChevronLeftIcon />
      </div>
    );
  };
  const NextButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + " " + styles.nextBtn} onClick={onClick}>
        <ChevronRightIcon />
      </div>
    );
  };

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

  const responsiveSetting = {
    nextArrow: <NextButton />,
    prevArrow: <PreviousButton />,
  };
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.alignItems}>
          <img src="/images/recipe-icon.svg" alt="recipe icon" />
          <h3>Recipe</h3>
        </div>
        <div className={styles.alignItems}>
          <div className={styles.editBox}>
            <FiEdit2 className={styles.editIcon} />
          </div>
          <div className={styles.closeBox}>
            <MdOutlineClose className={styles.closeIcon} />
          </div>
        </div>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h3>Red Hots Smoothie</h3>
          <span className={styles.ratingBox}>
            <img src="/images/rating.svg" alt="" />
            4.9 (71)
          </span>
        </div>
        <div className={styles.subMenu}>
          <div className={styles.alignItems}>
            <div className={styles.recipeType}>Smoothie</div>
            <img
              src="/images/yummly-logo.png"
              alt="recipe_logo"
              className={styles.recipeLogo}
            />
          </div>
          <div className={styles.alignItems}>
            <div className={styles.iconWithText}>
              <img src="/images/calendar-alt-light.svg" alt="calender" />
              <p>Planner</p>
            </div>

            <div className={styles.iconWithText}>
              <img src="/images/BookmarksStar-orange.svg" alt="saved" />
              <p>Saved</p>
            </div>
            <div className={styles.iconWithText}>
              <img src="/images/share-alt-light-grey.svg" alt="share" />
              <p>Share</p>
            </div>
            <div className={styles.iconWithText}>
              <img src="/icons/comment.svg" alt="comment" />
              <p style={{ color: "#7cbc39" }}>21</p>
            </div>
          </div>
        </div>

        <div className={styles.sliderBox}>
          <SlickSlider moreSetting={responsiveSetting}>
            {recipeSliderImage?.map((img, index) => {
              return (
                <div key={index} className={styles.imageBox}>
                  <img src={img} alt="recipe_image" />
                </div>
              );
            })}
          </SlickSlider>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoBox}>
            <span>45</span>
            <p>Net Carbs</p>
          </div>
          <div className={styles.infoBox}>
            <span>16</span>
            <p>Glycemic Load</p>
          </div>
          <div className={styles.infoBox}>
            <MdOutlineInfo className={styles.infoIcon} />
            <span>805</span>
            <p>Rx Score</p>
          </div>
        </div>

        <div>
          <ReadMore>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham. asfhajffuu faakl
          </ReadMore>
        </div>

        <div className={styles.dropDownContainer}>
          <div style={{ flex: 1 }}>
            <DropDown
              listElem={BlendtecItem}
              style={{ backgroundColor: "#fafbf9" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <DropDown
              listElem={ozItem}
              style={{ backgroundColor: "#fafbf9" }}
            />
          </div>
          <div style={{ flex: 1 }} className={styles.timeBox}>
            <img src="/images/time-icon.svg" alt="time-icon" />
            <p>
              Prep: <span>5 Min</span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.ingredentContainer}>
        <div className={styles.ingredentHeader}>
          <img src="/images/basket.svg" alt="basket" />
          <h3>Ingredients</h3>
        </div>
        <div className={styles.counterBox}>
          <div className={styles.counter}>
            <p>Servings : </p>
            <div className={styles.count}>
              <button onClick={() => setCounter((pre) => Number(pre) + 1)}>
                <MdAdd className={styles.icon} />
              </button>
              <input
                type="number"
                value={counter}
                //@ts-ignore
                onChange={(e) => setCounter(e?.target?.value)}
                min={1}
              />
              <button
                onClick={() =>
                  setCounter((pre) =>
                    Number(pre) <= 1 ? Number(pre) : Number(pre) - 1
                  )
                }
              >
                <MdRemove className={styles.icon} />
              </button>
            </div>
          </div>
          <div className={styles.size}>
            <p>serving Size : </p>
            <span>16 0z</span>
          </div>
          <div className={styles.usMatric}>
            <span>US</span>
            <p>| Matric</p>
          </div>
        </div>
        <div className={styles.ingredentDisContainer}>
          <div className={styles.singleIngredent}>
            <div className={styles.leftSide}>
              <img src="/images/5-2-avocado-png-hd.png" alt="icon" />
              <p>1 medium Avocado</p>
            </div>
            <div className={styles.iconGroup}>
              <MdOutlineInfo className={styles.icon} />
              <BiBarChart className={styles.icon} />
              <BsCartPlus className={styles.icon} />
            </div>
          </div>
          <div className={styles.singleIngredent}>
            <div className={styles.leftSide}>
              <img src="/images/Swiss-Chard-PNG-Photo.png" alt="icon" />
              <p>2 cups Swiss Chard, cut up</p>
            </div>
            <div className={styles.iconGroup}>
              <MdOutlineInfo className={styles.icon} />
              <BiBarChart className={styles.icon} />
              <BsCartPlus className={styles.icon} />
            </div>
          </div>
          <div className={styles.singleIngredent}>
            <div className={styles.leftSide}>
              <img src="/images/apple_PNG12405.png" alt="icon" />
              <p>1 whole Apple</p>
            </div>
            <div className={styles.iconGroup}>
              <MdOutlineInfo className={styles.icon} />
              <BiBarChart className={styles.icon} />
              <BsCartPlus className={styles.icon} />
            </div>
          </div>
          <div className={styles.singleIngredent}>
            <div className={styles.leftSide}>
              <img src="/images/5-2-avocado-png-hd.png" alt="icon" />
              <p>1 medium Avocado</p>
            </div>
            <div className={styles.iconGroup}>
              <MdOutlineInfo className={styles.icon} />
              <BiBarChart className={styles.icon} />
              <BsCartPlus className={styles.icon} />
            </div>
          </div>
          <div className={styles.singleIngredent}>
            <div className={styles.leftSide}>
              <img src="/images/Swiss-Chard-PNG-Photo.png" alt="icon" />
              <p>2 cups Swiss Chard, cut up</p>
            </div>
            <div className={styles.iconGroup}>
              <MdOutlineInfo className={styles.icon} />
              <BiBarChart className={styles.icon} />
              <BsCartPlus className={styles.icon} />
            </div>
          </div>
          <div className={styles.singleIngredent}>
            <div className={styles.leftSide}>
              <img src="/images/apple_PNG12405.png" alt="icon" />
              <p>1 whole Apple</p>
            </div>
            <div className={styles.iconGroup}>
              <MdOutlineInfo className={styles.icon} />
              <BiBarChart className={styles.icon} />
              <BsCartPlus className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ingredentContainer}>
        <div className={styles.ingredentHeader}>
          <img src="/images/chef.svg" alt="basket" />
          <h3>How to</h3>
        </div>
      </div>
    </div>
  );
};

export default Center;
