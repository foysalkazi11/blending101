import React, { FC, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import { useQuery } from "@apollo/client";
import GET_SHARE_WITH_ME_COLLECTIONS from "../../../gqlLib/collection/query/getShareWithMeCollections";
import { ShowRecipes } from "../../../components/recipe/recipeDiscovery/regularRecipes";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SkeletonRecipeDiscovery from "../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import ErrorPage from "../../../components/pages/404Page";
import ShowLastModifiedCollection from "../../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import ShareRecipe from "../../../components/recipe/recipeDetails/center/shareRecipe";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";

const SharedWithMe = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.dbUser._id);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

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
          data?.getSharedWithMeCollections?.map((item, index) => {
            const {
              _id,
              description,
              image,
              name,
              recipes,
              slug,
              creatorInfo,
            } = item;
            return (
              <ShowRecipes
                key={_id}
                headerData={{
                  heading: name,
                  image: creatorInfo?.image || "/images/fire-alt-light.svg",
                  allUrl: `/collection/recipeCollection/${slug}?${
                    name === "Single Recipes"
                      ? "singleRecipeCollectionId"
                      : "collectionId"
                  }=${_id}`,
                }}
                loading={loading}
                recipes={recipes}
                setOpenCollectionModal={setOpenCollectionModal}
                setOpenShareModal={setOpenShareModal}
                setShareRecipeData={setShareRecipeData}
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
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
      <ShareRecipe
        id={shareRecipeData?.id}
        versionId={shareRecipeData.versionId}
        title={shareRecipeData?.name}
        image={shareRecipeData?.image}
        show={openShareModal}
        setShow={setOpenShareModal}
        type="recipe"
        heading="Share Recipe"
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

export default SharedWithMe;
