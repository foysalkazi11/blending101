import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import SectionTitleWithIcon from "../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import NutritionPanelSkeleton from "../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import WikiCard from "../wikiCard/WikiCard";
import styles from "./WikiIngredientDetails.module.scss";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { WikiCompareList } from "../../../type/wikiCompareList";
import { useQuery } from "@apollo/client";
import UpdatedRecursiveAccordion from "../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import GET_BLEND_NUTRITION_BASED_ON_RECIPEXXX from "../../../gqlLib/nutrition/query/getBlendNutritionBasedOnRecipexxx";

interface Props {
  removeCompareRecipe?: (id: string, e?: React.SyntheticEvent) => void;
  ingredient?: WikiCompareList;
  handleAddOrRemoveToWikiCompareList?: (
    id: string,
    isCompared?: boolean,
  ) => void;
}

const WikiIngredientDetails = ({
  removeCompareRecipe = () => {},
  ingredient = {} as WikiCompareList,
  handleAddOrRemoveToWikiCompareList = () => {},
}: Props) => {
  const {
    _id,
    category,
    commentsCount,
    hasInCompare,
    image,
    portion,
    publishedBy,
    type,
    wikiDescription,
    wikiTitle,
  } = ingredient;
  const [winReady, setWinReady] = useState(false);
  const { loading, error, data } = useQuery(
    GET_BLEND_NUTRITION_BASED_ON_RECIPEXXX,
    {
      variables: {
        ingredientsInfo: [
          {
            ingredientId: ingredient?._id,
            value: parseFloat(portion?.meausermentWeight),
          },
        ],
      },
    },
  );

  useEffect(() => {
    setWinReady(true);
  }, []);

  return (
    <div className={styles.recipeDetailsFirstContainer}>
      <div className={styles.recipeDetailsContainer}>
        <div className={styles.cancelIcon}>
          <IconWarper
            defaultBg="gray"
            handleClick={(e) => removeCompareRecipe(ingredient?._id, e)}
          >
            <IoClose />
          </IconWarper>
        </div>
        <WikiCard
          author={publishedBy}
          comments={commentsCount}
          description={wikiDescription}
          image={image}
          title={wikiTitle}
          id={_id}
          hasInCompare={hasInCompare}
          type={type}
          handleAddOrRemoveToWikiCompareList={
            handleAddOrRemoveToWikiCompareList
          }
        />

        <div className={styles.dividerBox}>
          <SectionTitleWithIcon
            title="Nutrition"
            icon="/icons/chart-bar-light-green.svg"
          />

          <div className={`${styles.ingredientsDetails} `}>
            {winReady ? (
              loading ? (
                <NutritionPanelSkeleton />
              ) : (
                <UpdatedRecursiveAccordion
                  dataObject={
                    data?.getBlendNutritionBasedOnRecipexxx &&
                    JSON?.parse(data?.getBlendNutritionBasedOnRecipexxx)
                  }
                  showUser={false}
                  counter={1}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiIngredientDetails;
