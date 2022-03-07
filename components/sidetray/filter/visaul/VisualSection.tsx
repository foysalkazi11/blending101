/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setBlendTye } from "../../../../redux/slices/sideTraySlice";
import styles from "../filter.module.scss";
import { blendTypes } from "../filterRankingList";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import FilterbottomComponent from "../filterBottom.component";
import { useLazyQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../../gqlLib/category/queries/fetchCategories";
import { setAllCategories } from "../../../../redux/slices/categroySlice";
import SkeletonBlendType from "../../../../theme/skeletons/skeletonBlendType/SkeletonBlendType";

const blendCategoryImage = {
  Smoothies: "/food/wholefood.png",
  WholeFood: "/food/soup.svg",
  "Frozen Treat": "/food/frozen.png",
  Refreshing: "/food/fresh.png",
  "Herbal Tea": "/other/heart.svg",
};

const defaultBlendImg =
  "https://blending.s3.us-east-1.amazonaws.com/3383678.jpg";

type VisualSectionProps = {
  categories?: { title: string; val: string }[];
};

const VisualSection = ({ categories }: VisualSectionProps) => {
  const blends = useAppSelector((state) => state.sideTray.blends);
  const [getAllBlendCategory, { loading: blendCategroyLoading }] = useLazyQuery(
    FETCH_BLEND_CATEGORIES
  );
  const { allCategories } = useAppSelector((state) => state?.categroy);
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const handleBlendClick = (blend) => {
    let blendz = [];
    let present = false;
    blends.forEach((blen) => {
      if (blen?.id === blend?.id) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...blends, blend];
    } else {
      blendz = blends.filter((blen) => {
        return blen?.id !== blend?.id;
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
      dispatch(setAllCategories(data?.getAllCategories));
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (!allCategories?.length) {
        fetchAllBlendCategroy();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFilterTray]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.filter}>
      {blendCategroyLoading ? (
        <SkeletonBlendType />
      ) : (
        <div className={styles.filter__top}>
          <h3>Blend Type</h3>
          <div className={styles.filter__menu}>
            {allCategories?.length
              ? allCategories.map((blend, i) => (
                  <div
                    key={blend?.name + i}
                    className={styles.filter__menu__item}
                    onClick={() =>
                      handleBlendClick({
                        title: blend?.name,
                        img: blend?.image || defaultBlendImg,
                        id: blend?._id,
                      })
                    }
                  >
                    <div className={styles.filter__menu__item__image}>
                      <img
                        src={blend?.image || defaultBlendImg}
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
                ))
              : null}
          </div>
        </div>
      )}
      <div className={styles.filter__top} style={{ marginTop: "15px" }}>
        <h3>Ingredients</h3>
        <FilterbottomComponent categories={categories} />
      </div>
    </div>
  );
};

export default VisualSection;
