import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setBlendTye } from "../../../../redux/slices/sideTraySlice";
import styles from "../filter.module.scss";
import CheckCircle from "../../../../public/icons/check_circle_black_24dp.svg";
import { setAllCategories } from "../../../../redux/slices/categroySlice";
import { useLazyQuery } from "@apollo/client";
import { FETCH_BLEND_CATEGORIES } from "../../../../gqlLib/category/queries/fetchCategories";
import SkeletonBlendType from "../../../../theme/skeletons/skeletonBlendType/SkeletonBlendType";

const defaultBlendImg =
  "https://blending.s3.us-east-1.amazonaws.com/3383678.jpg";

const BlendType = () => {
  const { allCategories } = useAppSelector((state) => state?.categroy);
  const blends = useAppSelector((state) => state.sideTray.blends);
  const [getAllBlendCategory, { loading }] = useLazyQuery(
    FETCH_BLEND_CATEGORIES,
  );
  const { openFilterTray, ingredients: ingredientsList } = useAppSelector(
    (state) => state?.sideTray,
  );
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

  if (loading) {
    return <SkeletonBlendType />;
  }

  return (
    <div className={styles.filter__top}>
      <h3>Blend Type</h3>
      <div style={{ marginTop: "20px" }}>
        <div className={`${styles.ingredientContainer} y-scroll`}>
          {allCategories?.length
            ? allCategories.map((blend, i) => (
                <div
                  key={blend?.name + i}
                  className={styles.item}
                  onClick={() =>
                    handleBlendClick({
                      title: blend?.name,
                      img: blend?.image || defaultBlendImg,
                      id: blend?._id,
                    })
                  }
                >
                  <div className={styles.image}>
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

                  <p>{blend?.name}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default BlendType;
