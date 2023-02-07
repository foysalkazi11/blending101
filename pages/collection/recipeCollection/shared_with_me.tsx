import React, { FC, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import { useQuery } from "@apollo/client";
import GET_SHARE_WITH_ME_COLLECTIONS from "../../../gqlLib/collection/query/getShareWithMeCollections";
import { ShowRecipes } from "../../../components/recipe/recipeDiscovery/regularRecipes";
import { useAppSelector } from "../../../redux/hooks";
import SkeletonRecipeDiscovery from "../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import ErrorPage from "../../../components/pages/404Page";

const SharedWithMe = () => {
  const userId = useAppSelector((state) => state.user.dbUser._id);

  const { data, loading, error } = useQuery(GET_SHARE_WITH_ME_COLLECTIONS, {
    variables: { userId },
  });

  if (loading) {
    return (
      <Layout>
        <SkeletonRecipeDiscovery style={{ marginTop: "20px" }} />
        <SkeletonRecipeDiscovery />
        <SkeletonRecipeDiscovery />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorPage style={{ height: "50vh" }} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ marginTop: "20px" }}>
        {data?.getSharedWithMeCollections?.length ? (
          data?.getSharedWithMeCollections?.map((item) => {
            const { _id, description, image, name, recipes, slug } = item;
            return (
              <ShowRecipes
                key={_id}
                headerData={{
                  heading: name,
                  image: "/images/fire-alt-light.svg",
                  allUrl: `/collection/recipeCollection/${slug}?collectionId=${_id}`,
                }}
                loading={loading}
                recipes={recipes}
                // setOpenCollectionModal={setOpenCollectionModal}
                // setOpenShareModal={setOpenShareModal}
                // setShareRecipeData={setShareRecipeData}
              />
            );
          })
        ) : (
          <ErrorPage
            style={{ height: "50vh" }}
            image="/icons/empty_data.svg"
            errorMessage="No data found"
          />
        )}
      </div>
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

export default SharedWithMe;
