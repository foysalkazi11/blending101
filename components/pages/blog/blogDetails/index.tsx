import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FC } from "react";
import AContainer from "../../../../containers/A.container";
import GET_A_GENERAL_BLOG_BY_SLUG from "../../../../gqlLib/blog/query/getAGeneralBlogBySlug";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import SkeletonBlogDetails from "../../../../theme/skeletons/skeletonBlogDetails";
import ErrorPage from "../../404Page";
import styles from "./BlogDetails.module.scss";
import BlogDetailsCenter from "./BlogDetailsCenter";
import RelatedBlog from "./RelatedBlog";

const BlogDetails = () => {
  const router = useRouter();
  const { blog_slug } = router.query;
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_A_GENERAL_BLOG_BY_SLUG, { variables: { slug: blog_slug } });
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

  if (blogLoading) {
    return (
      <Layout>
        <SkeletonBlogDetails />
      </Layout>
    );
  }
  if (blogError) {
    return (
      <Layout>
        <ErrorPage />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className={styles.blogDetailsContainer}>
        <div className={styles.left}>
          <RelatedBlog
            relatedBlogs={
              generalBlogData?.getAllGeneralBlogForClient?.slice(0, 4) || []
            }
          />
        </div>
        <div className={styles.center}>
          <BlogDetailsCenter blogDetails={blogData?.getAgeneralBlogBySlug} />
        </div>
      </div>
    </Layout>
  );
};

const Layout: FC = ({ children }) => {
  return (
    <AContainer headerTitle="Blog details" logo={true}>
      {children}
    </AContainer>
  );
};

export default BlogDetails;
