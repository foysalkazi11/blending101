import React, { useEffect, useRef, useState } from "react";
import styles from "./WikiRight.module.scss";
import LinearComponent from "../../../theme/linearProgress/LinearProgress.component";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import IngredientPanelSkeleton from "../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";
import Combobox from "../../../theme/dropDown/combobox/Combobox.component";
import { Portion } from "../../../type/wikiListType";
import GET_ONLY_INGREDIENTS_BASED_ON_NURTITION from "../../../gqlLib/wiki/query/getOnlyIngredientsBasedOnNutrition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort,faArrowDownShortWide } from "@fortawesome/pro-solid-svg-icons";

const categories = [
  { label: "All", value: "All" },
  { label: "Leafy", value: "Leafy" },
  { label: "Berry", value: "Berry" },
  { label: "Herbal", value: "Herbal" },
  { label: "Fruity", value: "Fruity" },
  { label: "Balancer", value: "Balancer" },
  { label: "Fatty", value: "Fatty" },
  { label: "Seasoning", value: "Seasoning" },
  { label: "Flavor", value: "Flavor" },
  { label: "Rooty", value: "Rooty" },
  { label: "Flowering", value: "Flowering" },
  { label: "Liquid", value: "Liquid" },
  { label: "Tube-Squash", value: "Tube-Squash" },
];

interface ingredientState {
  name: string;
  value: number;
  units: string;
  ingredientId: string;
  portion: Portion;
}

interface NutrientPanelProps {
  ingredient?: any[];
  wikiId?: string;
  ingredientsDataLoading?: boolean;
}

function WikiRightComponent({
  ingredient = [],
  wikiId = "",
  ingredientsDataLoading = false,
}: NutrientPanelProps) {
  const [dpd, setDpd] = useState("All");
  const [ingredientData, setIngredientData] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const [getAllIngredientsBasedOnNutrition, { data, loading, error }] =
    useLazyQuery(GET_ONLY_INGREDIENTS_BASED_ON_NURTITION, {
      fetchPolicy: "cache-and-network",
    });
  const isMounted = useRef(false);

  const fetchData = async () => {
    try {
      const { data } = await getAllIngredientsBasedOnNutrition({
        variables: {
          data: {
            nutritionID: wikiId,
            category: dpd,
          },
        },
      });
      setIngredientData(data?.getAllIngredientsBasedOnNutrition?.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ingredient?.length) {
      setIngredientData([...ingredient]);
    }
  }, [ingredient]);

  useEffect(() => {
    if (isMounted?.current) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpd]);

  useEffect(()=>{
    if (isMounted?.current) {
      setIngredientData(prev => [...prev]?.reverse())
    }

  },[ascendingOrder])

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.right}>
      <div className={styles.recipeHeadingTopSec}>
        <h3>
          <div className={styles.chartbarIconDiv}>
            <Image
              src={"/icons/chart-bar-light-green.svg"}
              alt="Picture will load soon"
              height={"100%"}
              width={"100%"}
              layout="responsive"
              objectFit="contain"
            />
          </div>
          Rx Facts
        </h3>
      </div>
      <div className={styles.rightCard}>
        <div className={styles.rightCardHeading}>Ingredients</div>
        <div className={styles.dropDownBox}>
          <div className={styles.dropDown}>
          <Combobox
          value={dpd}
          options={categories}
          onChange={(e) => setDpd(e?.target?.value)}
          style={{ width: "100%" }}
          placeholder="Categories"
        />

          </div>
        
        {ascendingOrder ? <FontAwesomeIcon icon={faArrowDownWideShort} onClick={()=>setAscendingOrder(prev=>!prev)} className={styles.downArrowIcon} /> : <FontAwesomeIcon icon={faArrowDownShortWide} onClick={()=>setAscendingOrder(prev=>!prev)} className={styles.downArrowIcon} />}
        </div>
        <div className={styles.progressIndicator}>
          {loading || ingredientsDataLoading ? (
            <IngredientPanelSkeleton />
          ) : ingredientData?.length ? (
            ingredientData?.map(
              (
                { name, value, units, ingredientId, portion }: ingredientState,
                index,
              ) => {
                return (
                  <LinearComponent
                    name={name}
                    percent={Number(value?.toFixed(2))}
                    key={index}
                    units={units}
                    //@ts-ignore
                    highestValue={ingredientData[0]?.value}
                    ingredientId={ingredientId}
                    portion={portion}
                  />
                );
              },
            )
          ) : (
            <p className={styles.noIngredient}>No ingredient found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WikiRightComponent;
