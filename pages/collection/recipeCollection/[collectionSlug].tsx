import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
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
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

const CollectionRecipes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const collectionId = router.query?.collectionId as string;
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
          collectionId: collectionId || "",
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
    collectionId,
    token,
    slug,
    userId,
  ]);

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Recipe collection",
        description: "Recipe collection",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (getCollectionRecipeError) {
    return (
      <Layout>
        <ErrorPage
          style={{ height: "50vh" }}
          errorMessage="No collection recipe found"
        />
        ;
      </Layout>
    );
  }

  return (
    <Layout>
      <ShowRecipeContainer
        data={recipes}
        loading={
          getAllRecipesLoading || getMyRecipesLoading || getCustomRecipesLoading
        }
        headerLeftSide={
          <div className="flex ai-center">
            {slug === "my-favorite" ? (
              <FontAwesomeIcon icon={faHeart} className={classes.head__icon} />
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
    </Layout>
  );
};

const Layout: FC = ({ children }) => {
  const [input, setInput] = useState("");
  return (
    <AContainer
      headerIcon="/icons/juicer.svg"
      headerTitle="Recipe collection"
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
        />
        <WikiBanner />
        {children}
      </div>
    </AContainer>
  );
};

export default CollectionRecipes;
