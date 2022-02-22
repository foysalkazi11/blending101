/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setBlendTye } from "../../../../redux/slices/sideTraySlice";
import styles from "../filter.module.scss";
import { blendTypes } from "../filterRankingList";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import FilterbottomComponent from "../filterBottom.component";
import { useLazyQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../../gqlLib/category/queries/fetchCategories";

const blendCategoryImage = {
  Smoothies: "/food/wholefood.png",
  WholeFood: "/food/soup.svg",
  "Frozen Treat": "/food/frozen.png",
  Refreshing: "/food/fresh.png",
  "Herbal Tea": "/other/heart.svg",
  //  {title: 'Dessert', img: '/other/nutritio.svg'},
};

type VisualSectionProps = {
  categories?: { title: string; val: string }[];
};

const VisualSection = ({ categories }: VisualSectionProps) => {
  const blends = useAppSelector((state) => state.sideTray.blends);
  const [getAllBlendCategory, { loading: blendLoading, data: blendData }] =
    useLazyQuery(FETCH_BLEND_CATEGORIES);
  const [blendCategroy, setBlendCategroy] = useState<
    { _id: string; name: string; imgae: string }[]
  >([]);
  const dispatch = useAppDispatch();

  const handleBlendClick = (blend) => {
    let blendz = [];
    let present = false;
    blends.forEach((blen) => {
      if (blen === blend) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...blends, blend];
    } else {
      blendz = blends.filter((blen) => {
        return blen !== blend;
      });
    }
    dispatch(setBlendTye(blendz));
  };

  const checkActive = (id) => {
    let present = false;
    blends.forEach((blen) => {
      if (blen?.id === id) {
        present = true;
      }
    });
    return present;
  };

  const fetchAllBlendCategroy = async () => {
    try {
      const { data } = await getAllBlendCategory();
      setBlendCategroy(data?.getAllCategories);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!blendCategroy?.length) {
      fetchAllBlendCategroy();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.filter}>
      <div className={styles.filter__top}>
        <h3>Blend Type</h3>
        <div className={styles.filter__menu}>
          {blendCategroy?.length &&
            blendCategroy.map((blend, i) => (
              <div
                key={blend?.name + i}
                className={styles.filter__menu__item}
                onClick={() =>
                  handleBlendClick({
                    title: blend?.name,
                    img: blendCategoryImage[blend?.name],
                    id: blend?._id,
                  })
                }
              >
                <div className={styles.filter__menu__item__image}>
                  <img
                    src={blendCategoryImage[blend?.name]}
                    alt={blend?.name}
                  />
                  {checkActive(blend._id) && (
                    <div className={styles.tick}>
                      <CheckCircle className={styles.ticked} />
                    </div>
                  )}
                </div>
                <p>{blend.name}</p>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.filter__top} style={{ marginTop: "15px" }}>
        <h3>Ingredients</h3>
        <FilterbottomComponent categories={categories} />
      </div>
    </div>
  );
};

export default VisualSection;
