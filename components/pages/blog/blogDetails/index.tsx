import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GET_A_GENERAL_BLOG_BY_SLUG from "../../../../gqlLib/blog/query/getAGeneralBlogBySlug";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import { updateSidebarActiveMenuName } from "../../../../redux/slices/utilitySlice";
import SkeletonBlogDetails from "../../../../theme/skeletons/skeletonBlogDetails";
import ErrorPage from "../../404Page";
import styles from "./BlogDetails.module.scss";
import BlogDetailsCenter from "./BlogDetailsCenter";
import RelatedBlog from "./RelatedBlog";
import { useUser } from "../../../../context/AuthProvider";
import BlogCommentsTray from "../../../sidetray/blogCommentsTray";

const BlogDetails = () => {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const { blog_slug } = router.query;
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_A_GENERAL_BLOG_BY_SLUG, {
    variables: { slug: blog_slug, memberId: user.id },
  });
  const {
    data: generalBlogData,
    loading: generalBlogLoading,
    error: generalBlogError,
  } = useQuery(GET_ALL_GENERAL_BLOG_FOR_CLIENT, {
    variables: {
      currentDate: new Date().toISOString().slice(0, 10),
      memberId: user.id,
    },
    fetchPolicy: "cache-and-network",
  });

  if (blogLoading) {
    return <SkeletonBlogDetails />;
  }
  if (blogError) {
    return <ErrorPage />;
  }
  return (
    <React.Fragment>
      <BlogCommentsTray showPanle="left" showTagByDefaut={false} />
      <div className={styles.blogDetailsContainer}>
        <div className={styles.left}>
          <RelatedBlog relatedBlogs={generalBlogData?.getAllGeneralBlogForClient?.blogs?.slice(0, 4) || []} />
        </div>
        <div className={styles.center}>
          <BlogDetailsCenter blogDetails={blogData?.getAgeneralBlogBySlug} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogDetails;
