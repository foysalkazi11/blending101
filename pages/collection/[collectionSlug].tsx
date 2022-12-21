import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FooterRecipeFilter from "../../components/footer/footerRecipeFilter.component";
import AContainer from "../../containers/A.container";
import { useAppSelector } from "../../redux/hooks";
import styles from "../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../styles/pages/viewAll.module.scss";
import { useLazyQuery } from "@apollo/client";
import GET_SINGLE_COLLECTION from "../../gqlLib/collection/query/getSingleCollection";
import GET_ALL_MY_CREATED_RECIPES from "../../gqlLib/collection/query/getAllMyCreatedRecipes";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import ShowRecipeContainer from "../../components/showRecipeContainer";

const ViewAll = () => {
  const router = useRouter();
  const slug = router.query?.collectionSlug as string;
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [recipes, setRecipes] = useState([]);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [getAllRecipes, { loading: getAllRecipesLoading }] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS,
  );
  const [getMyRecipes, { loading: getMyRecipesLoading }] = useLazyQuery(
    GET_ALL_MY_CREATED_RECIPES,
  );
  const [getCustomRecipes, { loading: getCustomRecipesLoading }] = useLazyQuery(
    GET_SINGLE_COLLECTION,
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
        <ShowRecipeContainer
          data={recipes}
          loading={
            getAllRecipesLoading ||
            getMyRecipesLoading ||
            getCustomRecipesLoading
          }
          headerLeftSide={
            <div className="flex ai-center">
              {icon && (
                <img src={icon} alt={title} className={classes.head__icon} />
              )}
              <h2 className={classes.head__title}>{title}</h2>
            </div>
          }
          closeHandler={() => router.push("/discovery")}
        />
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default ViewAll;
