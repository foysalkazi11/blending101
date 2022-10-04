import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import GET_INGREDIENT_STATS from "../../../../../gqlLib/wiki/query/getIngredientsStats";
import { useAppSelector } from "../../../../../redux/hooks";
import BarChart from "./barChart";
import s from "./index.module.scss";
import LineChartIndex from "./lineChart";

interface Props {
  wikiId: string;
}

const MyFacts = ({ wikiId }: Props) => {
  const [getIngredientsStats, { data, loading, error }] =
    useLazyQuery(GET_INGREDIENT_STATS);
  const { dbUser } = useAppSelector((state) => state?.user);

  const fetchData = async (category?: string, type?: string) => {
    const today = new Date().toISOString().slice(0, 10);
    try {
      const { data } = await getIngredientsStats({
        variables: {
          ingredientId: wikiId,
          memberId: dbUser?._id,
          currentDate: `${today}`,
          type: type || "Y",
          categoy: category || "All",
        },
      });
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={s.myFactsContainer}>
      <LineChartIndex
        stats={data?.testGetIngredientsStats?.stats}
        portion={data?.testGetIngredientsStats?.portion}
      />
      <BarChart
        loading={loading}
        barChartData={
          data?.testGetIngredientsStats?.otherIngredients
            ? data?.testGetIngredientsStats?.otherIngredients
            : []
        }
        fetchChartData={fetchData}
        wikiId={wikiId}
      />
    </div>
  );
};

export default MyFacts;
