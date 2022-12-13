import { useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import BlogCard from "./blogCard";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { BlogListType } from "../../../type/blog";
import styles from "./BlogList.module.scss";
import CommonSearchBar from "../../searchBar/CommonSearchBar";
import WikiBanner from "../../wiki/wikiBanner/WikiBanner";
import ErrorPage from "../404Page";

const BlogList = () => {
  const [blogSearchInput, setBlogSearchInput] = useState("");
  const {
    data: generalBlogData,
    loading: generalBlogLoading,
    error: generalBlogError,
  } = useQuery(GET_ALL_GENERAL_BLOG_FOR_CLIENT, {
    variables: {
      currentDate: new Date().toISOString().slice(0, 10),
    },
    fetchPolicy: "cache-and-network",
  });

  if (generalBlogLoading) {
    return (
      <Layout
        blogSearchInput={blogSearchInput}
        setBlogSearchInput={setBlogSearchInput}
      >
        <SkeletonCollectionRecipe style={{ marginTop: "20px" }} />;
      </Layout>
    );
  }
  if (generalBlogError) {
    return (
      <Layout
        blogSearchInput={blogSearchInput}
        setBlogSearchInput={setBlogSearchInput}
      >
        <ErrorPage />;
      </Layout>
    );
  }

  return (
    <Layout
      blogSearchInput={blogSearchInput}
      setBlogSearchInput={setBlogSearchInput}
    >
      <div className={styles.blogCardContainer}>
        {generalBlogData?.getAllGeneralBlogForClient?.map(
          (blog: BlogListType) => {
            return <BlogCard key={blog?._id} blogData={blog} />;
          },
        )}
      </div>
    </Layout>
  );
};

const Layout: FC<{
  blogSearchInput?: string;
  setBlogSearchInput?: (agr: string) => void;
}> = ({ children, blogSearchInput, setBlogSearchInput }) => {
  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      filterTray={true}
      headerTitle="Blog"
      showBlogCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.blogPageLayout}>
        <div style={{ paddingLeft: "16px" }}>
          <CommonSearchBar
            input={blogSearchInput}
            handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBlogSearchInput(e.target.value);
            }}
          />
        </div>
        <WikiBanner />
        {children}
      </div>
    </AContainer>
  );
};

export default BlogList;
