import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import { useLazyQuery, useQuery } from "@apollo/client";
import GET_SINGLE_COLLECTION from "../../gqlLib/collection/query/getSingleCollection";
import GET_ALL_MY_CREATED_RECIPES from "../../gqlLib/collection/query/getAllMyCreatedRecipes";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../gqlLib/collection/query/getAllRecipesWhithiCollections";

const ViewAll = () => {
  const router = useRouter();
  const slug = router.query?.collectionSlug as string;

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [recipes, setRecipes] = useState([]);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [getAllRecipes] = useLazyQuery(GET_ALL_RECIPES_WITHIN_COLLECTIONS);
  const [getMyRecipes] = useLazyQuery(GET_ALL_MY_CREATED_RECIPES);
  const [getCustomRecipes] = useLazyQuery(GET_SINGLE_COLLECTION);

  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );

  useEffect(() => {
    if (!slug) return;
    if (slug == "all-recipes") {
      getAllRecipes({ variables: { userId } }).then((res: any) => {
        setTitle("All Recipes");
        setRecipes(res?.data?.getAllRecipesFromCollection);
      });
    } else if (slug === "my-recipes") {
      getMyRecipes({ variables: { userId } }).then((res: any) => {
        setTitle("My Recipes");
        setRecipes(res?.data?.getAllMyCreatedRecipes);
      });
    } else {
      getCustomRecipes({ variables: { userId, slug } }).then((res: any) => {
        setTitle(res?.data?.getASingleCollection?.name);
        setIcon(res?.data?.getASingleCollection?.image);
        setRecipes(res?.data?.getASingleCollection?.recipes);
      });
    }
  }, [getAllRecipes, getCustomRecipes, getMyRecipes, slug, userId]);

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

        {blends.length || ingredients.length || filters?.length ? (
          <FilterPageBottom
            blends={blends}
            ingredients={ingredients}
            filters={filters}
          />
        ) : (
          <div>
            <div className={classes.head}>
              <div className="flex ai-center">
                {icon && (
                  <img src={icon} alt={title} className={classes.head__icon} />
                )}
                <h2 className={classes.head__title}>{title}</h2>
              </div>
              <IconButton
                fontName={faTimes}
                variant="secondary"
                size="small"
                colorCode="#fff"
                onClick={() => {
                  router.back();
                }}
              />
            </div>
            {/* <AppdownLoadCard /> */}
            <div className="row mb-20">
              {recipes?.map((item) => {
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
