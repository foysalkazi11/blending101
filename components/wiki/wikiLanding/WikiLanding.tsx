import { useLazyQuery } from "@apollo/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import GET_INGREDIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getIngredientWikiList";
import GET_NUTRIENT_WIKI_LIST from "../../../gqlLib/wiki/query/getNutrientWikiList";
import { useAppSelector } from "../../../redux/hooks";
import { WikiListType } from "../../../type/wikiListType";
import notification from "../../utility/reactToastifyNotification";
import s from "./WikiLanding.module.scss";
import { WikiType } from "../../../type/wikiListType";
import WikiLandingContent from "./WikiLandingContent";
import WikiSingleType from "../wikiSingleType/WikiSingleType";

interface Props {
  setType?: Dispatch<SetStateAction<WikiType>>;
}

interface NormalizeWikiList {
  type: string;
  data: WikiListType[];
}

const WikiLanding = ({ setType = () => {} }: Props) => {
  const [showAll, setShowAll] = useState<WikiType>("");
  const { dbUser } = useAppSelector((state) => state?.user);
  const [
    getIngredientList,
    {
      loading: ingredientListLoading,
      data: ingredientList,
      error: ingredientListError,
    },
  ] = useLazyQuery(GET_INGREDIENT_WIKI_LIST, {
    fetchPolicy: "cache-and-network",
  });
  const [
    getNutrientList,
    {
      loading: nutrientListLoading,
      data: nutrientListList,
      error: nutrientListListError,
    },
  ] = useLazyQuery(GET_NUTRIENT_WIKI_LIST, {
    fetchPolicy: "cache-and-network",
  });

  const funcObj = {
    Ingredient: getIngredientList,
    Nutrient: getNutrientList,
    Health: () =>
      new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, "foo");
      }),
  };

  const fetchList = async (
    type: WikiType = "Ingredient",
    page: number = 1,
    limit: number = 12,
    ids: string[] = [],
  ) => {
    try {
      await funcObj[type]({
        variables: {
          userId: dbUser?._id,
          page,
          limit,
          ids,
        },
      });
    } catch (error) {
      notification("error", "Failed to fetch ingredient list");
    }
  };

  useEffect(() => {
    Promise.all([
      funcObj["Ingredient"]({
        variables: {
          userId: dbUser?._id,
          page: 1,
          limit: 12,
          ids: [],
        },
      }),
      funcObj["Nutrient"]({
        variables: {
          userId: dbUser?._id,
          page: 1,
          limit: 12,
          ids: [],
        },
      }),
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredientWikiList = ingredientList?.getIngredientWikiList?.wikiList;
  const nutrientWikiListList = nutrientListList?.getNutrientWikiList?.wikiList;

  return (
    <div style={{ margin: "20px 0" }}>
      <WikiLandingContent
        title="Ingredient"
        image={"/images/thumbs-up.svg"}
        list={ingredientWikiList}
        loading={ingredientListLoading}
        setShowAll={setType}
      />

      <WikiLandingContent
        title="Nutrient"
        image={"/images/thumbs-up.svg"}
        list={nutrientWikiListList}
        loading={nutrientListLoading}
        setShowAll={setType}
      />
    </div>
  );
};

export default WikiLanding;
