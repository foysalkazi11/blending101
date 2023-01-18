import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FooterRecipeFilter from "../../../components/footer/footerRecipeFilter.component";
import AContainer from "../../../containers/A.container";
import { useAppSelector } from "../../../redux/hooks";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import { useLazyQuery } from "@apollo/client";
import GET_SINGLE_COLLECTION from "../../../gqlLib/collection/query/getSingleCollection";
import GET_ALL_MY_CREATED_RECIPES from "../../../gqlLib/collection/query/getAllMyCreatedRecipes";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-regular-svg-icons";
import ErrorPage from "../../../components/pages/404Page";

const CollectionRecipes = () => {
  const router = useRouter();
  const shareBy = router.query?.shareBy as string;
  const token = router.query?.token as string;
  const slug = router.query?.collectionSlug as string;
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [getAllRecipes, { loading: getAllRecipesLoading }] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS,
  );
  const [getMyRecipes, { loading: getMyRecipesLoading }] = useLazyQuery(
    GET_ALL_MY_CREATED_RECIPES,
  );
  const [
    getCustomRecipes,
    { loading: getCustomRecipesLoading, error: getCollectionRecipeError },
  ] = useLazyQuery(GET_SINGLE_COLLECTION);

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
      getCustomRecipes({
        variables: {
          userId,
          slug,
          creatorId: shareBy || "",
          token: token || "",
        },
      }).then((res: any) => {
        setTitle(res?.data?.getASingleCollection?.name);
        setIcon(res?.data?.getASingleCollection?.image);
        setRecipes(res?.data?.getASingleCollection?.recipes);
      });
    }
  }, [
    getAllRecipes,
    getCustomRecipes,
    getMyRecipes,
    shareBy,
    token,
    slug,
    userId,
  ]);

  if (getCollectionRecipeError) {
    return <ErrorPage errorMessage="No collection recipe found" />;
  }

  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main__div}>
        <CommonSearchBar
          input={input}
          setInput={setInput}
          isSearchTag={false}
          styles={{ marginLeft: "16px" }}
        />
        <WikiBanner />

        <ShowRecipeContainer
          data={recipes}
          loading={
            getAllRecipesLoading ||
            getMyRecipesLoading ||
            getCustomRecipesLoading
          }
          headerLeftSide={
            <div className="flex ai-center">
              {slug === "my-favorite" ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className={classes.head__icon}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={classes.head__icon} />
              )}

              <h2 className={classes.head__title}>{title}</h2>
            </div>
          }
          closeHandler={() => router.push("/discovery")}
          showItems="recipe"
          showDefaultRightHeader
        />
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default CollectionRecipes;
