import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FC } from "react";
import AContainer from "../../../../containers/A.container";
import GET_A_GENERAL_BLOG_BY_SLUG from "../../../../gqlLib/blog/query/getAGeneralBlogBySlug";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import GET_ALL_ADMIN from "../../../../gqlLib/user/queries/getAllAdmin";
import { useAppSelector } from "../../../../redux/hooks";
import SkeletonBlogDetails from "../../../../theme/skeletons/skeletonBlogDetails";
import ErrorPage from "../../404Page";
import styles from "./BlogDetails.module.scss";
import BlogDetailsCenter from "./BlogDetailsCenter";
import RelatedBlog from "./RelatedBlog";

const BlogDetails = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  const { blog_slug } = router.query;
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_A_GENERAL_BLOG_BY_SLUG, {
    variables: { slug: blog_slug, memberId: dbUser._id },
  });
  const {
    data: generalBlogData,
    loading: generalBlogLoading,
    error: generalBlogError,
  } = useQuery(GET_ALL_GENERAL_BLOG_FOR_CLIENT, {
    variables: {
      currentDate: new Date().toISOString().slice(0, 10),
      memberId: dbUser._id,
    },
    fetchPolicy: "cache-and-network",
  });
  const { data: allAdminData } = useQuery(GET_ALL_ADMIN);

  const findAmin = (id: string) => {
    const admin = allAdminData?.getAllAdmin?.find((admin) => admin?._id === id);
    return admin ? `${admin?.firstName} ${admin?.lastName}` : "Gabriel Branu";
  };

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
            findAmin={findAmin}
          />
        </div>
        <div className={styles.center}>
          <BlogDetailsCenter
            blogDetails={blogData?.getAgeneralBlogBySlug}
            findAmin={findAmin}
          />
        </div>
      </div>
    </Layout>
  );
};

const Layout: FC = ({ children }) => {
  return (
    <AContainer
      headerTitle="Blog details"
      logo={true}
      showBlogCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      {children}
    </AContainer>
  );
};

export default BlogDetails;
