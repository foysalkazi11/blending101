import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import BlogCard from "./blogCard";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { BlogListType } from "../../../type/blog";
import styles from "./BlogList.module.scss";
import CommonSearchBar from "../../searchBar/CommonSearchBar";
import WikiBanner from "../../wiki/wikiBanner/WikiBanner";
import ErrorPage from "../404Page";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenBlogCollectionTray } from "../../../redux/slices/blogSlice";
import { useUser } from "../../../context/AuthProvider";
import BlogCollectionTray from "../../sidetray/blogCollectionTray";

const BlogList = () => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const user = useUser();
  const { lastModifiedBlogCollection } = useAppSelector((state) => state?.blog);
  const [blogSearchInput, setBlogSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const {
    data: generalBlogData,
    loading: generalBlogLoading,
    error: generalBlogError,
  } = useQuery(GET_ALL_GENERAL_BLOG_FOR_CLIENT, {
    variables: {
      currentDate: new Date().toISOString().slice(0, 10),
      memberId: user.id,
    },
  });

  if (generalBlogLoading) {
    return <SkeletonCollectionRecipe style={{ margin: "2rem" }} />;
  }
  if (generalBlogError) {
    return <ErrorPage />;
  }

  return (
    <>
      <BlogCollectionTray showPanle="left" showTagByDefaut={true} />
      <div className={styles.blogPageLayout}>
        <CommonSearchBar
          input={blogSearchInput}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBlogSearchInput(e.target.value);
          }}
        />

        <WikiBanner />
        <div className={styles.blogCardContainer}>
          {generalBlogData?.getAllGeneralBlogForClient?.map(
            (blog: BlogListType) => {
              return (
                <BlogCard
                  key={blog?._id}
                  blogData={blog}
                  setOpenLastModifiedCollectionModal={setOpenCollectionModal}
                />
              );
            },
          )}
        </div>
        <ShowLastModifiedCollection
          open={openCollectionModal}
          setOpen={setOpenCollectionModal}
          shouldCloseOnOverlayClick={true}
          lastModifiedCollectionName={lastModifiedBlogCollection?.name}
          openCollectionPanel={() => {
            dispatch(setIsOpenBlogCollectionTray(true));
            setOpenCollectionModal(false);
          }}
        />
      </div>
    </>
  );
};

export default BlogList;
