import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { categories } from "../../../../../../data/categories";
import Combobox from "../../../../../../theme/dropDown/combobox/Combobox.component";
import Linearcomponent from "../../../../../../theme/linearProgress/LinearProgress.component";
import IngredientPanelSkeleton from "../../../../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";
import s from "./index.module.scss";
import {
  faArrowDownWideShort,
  faArrowDownShortWide,
} from "@fortawesome/pro-solid-svg-icons";

interface Props {
  loading?: boolean;
  barChartData?: any[];
  fetchChartData?: (category?: string, type?: string) => void;
  wikiId?: string;
}

const BarChart = ({
  loading = false,
  barChartData = [],
  fetchChartData = () => {},
  wikiId = "",
}: Props) => {
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [category, setCategory] = useState("All");
  const isMounted = useRef(null);

  useEffect(() => {
    if (isMounted?.current) {
      fetchChartData(category);
    }
  }, [category]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={s.barChartContainer}>
      <p className={s.title}>Your top sources</p>
      <div className={s.dropDownBox}>
        <div className={s.dropDown}>
          <Combobox
            value={category}
            options={categories}
            onChange={(e) => setCategory(e?.target?.value)}
            style={{ width: "100%" }}
            placeholder="Categories"
          />
        </div>

        {ascendingOrder ? (
          <FontAwesomeIcon
            icon={faArrowDownWideShort}
            onClick={() => setAscendingOrder((prev) => !prev)}
            className={s.downArrowIcon}
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowDownShortWide}
            onClick={() => setAscendingOrder((prev) => !prev)}
            className={s.downArrowIcon}
          />
        )}
      </div>

      {loading ? (
        <IngredientPanelSkeleton />
      ) : barChartData?.length ? (
        barChartData?.map(
          ({ name, consumptionInGram, _id, portion }, index) => {
            return (
              <Linearcomponent
                name={name}
                percent={parseInt(consumptionInGram?.toFixed(2))}
                key={index}
                units="G"
                highestValue={barChartData[0]?.consumptionInGram}
                ingredientId={_id}
                portion={portion}
                highLight={wikiId === _id}
              />
            );
          },
        )
      ) : (
        <p className={s.noIngredient}>No ingredient found</p>
      )}
    </div>
  );
};

export default BarChart;
