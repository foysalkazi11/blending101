import { useRouter } from "next/router";
import React, { useState } from "react";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";

import IconButton from "../../component/atoms/Button/IconButton.component";
import Icon from "../../component/atoms/Icon/Icon.component";
import FooterRecipeFilter from "../../components/footer/footerRecipeFilter.component";
import DiscoverPageSearch from "../../components/recipe/recipeDiscovery/discoverPageSearch/DiscoverPageSearch.Component";
import FilterPageBottom from "../../components/recipe/recipeFilter/filterBottom.component";
import SearchtagsComponent from "../../components/searchtags/searchtags.component";
import AContainer from "../../containers/A.container";
import useLocalStorage from "../../customHooks/useLocalStorage";
import useViewAll, { QUERY_DICTIONARY } from "../../hooks/modules/useViewAll";
import { useAppSelector } from "../../redux/hooks";
import DatacardComponent from "../../theme/cards/dataCard/dataCard.component";
import ShowCollectionRecipes from "../../theme/showCollectionRecipes/ShowCollectionRecipes";

import styles from "../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../styles/pages/viewAll.module.scss";

const ViewAll = () => {
  const router = useRouter();
  const widgetId = router.query?.id as string;
  const params = router.query?.viewAll as string[];
  const page = params && QUERY_DICTIONARY[params[0]];

  const data = useViewAll(params, widgetId);
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );

  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { filters } = useAppSelector((state) => state?.filterRecipe);
  const { currentCollectionInfo } = useAppSelector(
    (state) => state?.collections,
  );
  const { blends, ingredients, openFilterTray } = useAppSelector(
    (state) => state.sideTray,
  );

  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      filterTray={true}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main__div}>
        <div
          style={{
            marginLeft: openFilterTray ? "310px" : "16px",
            transition: "all 0.5s",
          }}
        >
          <DiscoverPageSearch />
          {blends.length || ingredients.length || filters?.length ? (
            <SearchtagsComponent />
          ) : null}
        </div>

        {currentCollectionInfo?.name ? (
          <ShowCollectionRecipes />
        ) : blends.length || ingredients.length || filters?.length ? (
          <FilterPageBottom
            blends={blends}
            ingredients={ingredients}
            filters={filters}
          />
        ) : (
          <div>
            <div className={classes.head}>
              <div className="flex ai-center">
                <Icon
                  className={classes.head__icon}
                  fontName={page?.icon}
                  size="3rem"
                />
                <h2 className={classes.head__title}>{page?.title}</h2>
              </div>
              <IconButton
                className={classes.head__icon}
                fontName={faTimes}
                variant="secondary"
                size="medium"
                colorCode="#fff"
                onClick={() => {
                  router.back();
                }}
              />
            </div>
            {/* <AppdownLoadCard /> */}
            <div className="row mb-20">
              {data?.map((item) => {
                let ingredients = [];
                item?.ingredients?.forEach((ing) => {
                  const ingredient = ing?.ingredientId?.ingredientName;
                  ingredients.push(ingredient);
                });
                const ing = ingredients.join(", ");
                return (
                  <div className="col-3" key={item._id}>
                    <DatacardComponent
                      title={item.name}
                      ingredients={ing}
                      category={item.recipeBlendCategory?.name}
                      ratings={item?.averageRating}
                      noOfRatings={item?.numberOfRating}
                      carbs={item?.carbs}
                      score={item?.score}
                      calorie={item?.calorie}
                      noOfComments={item?.numberOfRating}
                      image={item.image[0]?.image}
                      recipeId={item?._id}
                      notes={item?.notes}
                      addedToCompare={item?.addedToCompare}
                      compareRecipeList={compareRecipeList}
                      setcompareRecipeList={setcompareRecipeList}
                      isCollectionIds={item?.userCollections}
                      setOpenCollectionModal={setOpenCollectionModal}
                      isMatch={item?.isMatch}
                      postfixTitle={item?.defaultVersion?.postfixTitle}
                      userId={item?.userId}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default ViewAll;
