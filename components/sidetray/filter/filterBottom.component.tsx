/* eslint-disable @next/next/no-img-element */
import CheckCircle from "../../../public/icons/check_circle_black_24dp.svg";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIngredients } from "../../../redux/slices/sideTraySlice";
import CalciumSearchElem from "../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../theme/switch/switchTwo.component";
import styles from "./filter.module.scss";
import { filterRankingList, ingredientLeafy } from "./filterRankingList";
import { useLazyQuery } from "@apollo/client";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { setAllIngredients } from "../../../redux/slices/ingredientsSlice";
import SkeletonIngredients from "../../../theme/skeletons/skeletonIngredients/SkeletonIngredients";

type FilterbottomComponentProps = {
  categories?: { title: string; val: string }[];
};

export default function FilterbottomComponent({
  categories,
}: FilterbottomComponentProps) {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "All" });
  const ingredients = filterRankingList;
  const dispatch = useAppDispatch();
  const { ingredients: ingredientsList, openFilterTray } = useAppSelector(
    (state) => state.sideTray
  );
  const [filterIngredientByCategroyAndClass] = useLazyQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS
  );
  // const [ingredientData, setIngredientData] = useState<any[]>([]);
  const { allIngredients } = useAppSelector((state) => state?.ingredients);
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);

  const handleIngredientClick = (ingredient) => {
    let blendz = [];
    let present = false;
    ingredientsList.forEach((blen) => {
      if (blen?.id === ingredient?.id) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...ingredientsList, ingredient];
    } else {
      blendz = ingredientsList.filter((blen) => {
        return blen?.id !== ingredient?.id;
      });
    }
    dispatch(setIngredients(blendz));
  };

  const checkActive = (ingredient: string) => {
    let present = false;
    ingredientsList.forEach((blen) => {
      //@ts-ignore
      if (blen.title === ingredient) {
        present = true;
      }
    });
    return present;
  };

  const fetchFilterIngredientByCategroyAndClass = async () => {
    setLoading(true);
    try {
      const { data } = await filterIngredientByCategroyAndClass({
        variables: {
          data: {
            ingredientCategory: dpd?.val,
            IngredientClass: 1,
          },
        },
      });

      dispatch(setAllIngredients(data?.filterIngredientByCategoryAndClass));

      setSearchIngredientData(data?.filterIngredientByCategoryAndClass);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (!allIngredients?.length) {
        fetchFilterIngredientByCategroyAndClass();
      } else {
        setSearchIngredientData(allIngredients);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFilterTray]);

  useEffect(() => {
    if (isMounted.current) {
      if (dpd?.val !== "All") {
        setSearchIngredientData(
          allIngredients?.filter((item) => item?.category === dpd?.val)
        );
      } else {
        if (allIngredients?.length) {
          setSearchIngredientData(allIngredients);
        } else {
          fetchFilterIngredientByCategroyAndClass();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpd]);

  useEffect(() => {
    if (isMounted.current) {
      if (searchInput === "") {
        setSearchIngredientData(allIngredients);
      } else {
        const filter = allIngredients?.filter((item) =>
          //@ts-ignore
          item?.ingredientName
            ?.toLowerCase()
            ?.includes(searchInput?.toLowerCase())
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.filter__bottom}>
      <SwitchTwoComponent
        value={toggle}
        setValue={setToggle}
        titleOne="Pictures"
        titleTwo="Rankings"
      />
      <div className={styles.dropdown}>
        <DropdownTwoComponent value={dpd} list={categories} setValue={setDpd} />
      </div>
      {toggle === 1 && (
        <div className={styles.filter__menu}>
          {dpd?.val === "All" ? (
            <input
              placeholder="Search ingredient"
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
            />
          ) : null}

          {loading ? (
            <SkeletonIngredients />
          ) : searchIngredientData?.length ? (
            <>
              {searchIngredientData.map((item, i) => (
                <div
                  key={i}
                  className={styles.filter__menu__item}
                  onClick={() =>
                    handleIngredientClick({
                      title: item?.ingredientName,
                      img: item?.featuredImage || "/food/chard.png",
                      id: item?._id,
                    })
                  }
                >
                  <div className={styles.filter__menu__item__image}>
                    <img
                      src={item?.featuredImage || "/food/chard.png"}
                      alt={item?.ingredientName}
                    />
                    {checkActive(item?.ingredientName) && (
                      <div className={styles.tick}>
                        <CheckCircle className={styles.ticked} />
                      </div>
                    )}
                  </div>
                  <p>{item?.ingredientName}</p>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.noResult}>
              <p>No result</p>
            </div>
          )}
        </div>
      )}
      {toggle === 2 && (
        <div className={styles.rankings}>
          <CalciumSearchElem />
          {ingredients.map(({ name, percent }, index) => {
            return (
              <Linearcomponent
                name={name}
                percent={percent}
                checkbox
                key={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
