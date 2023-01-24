import { useQuery } from "@apollo/client";
import React, { FC, useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import BlogCard from "./blogCard";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { BlogListType } from "../../../type/blog";
import styles from "./BlogList.module.scss";
import CommonSearchBar from "../../searchBar/CommonSearchBar";
import WikiBanner from "../../wiki/wikiBanner/WikiBanner";
import ErrorPage from "../404Page";
import GET_ALL_ADMIN from "../../../gqlLib/user/queries/getAllAdmin";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenBlogCollectionTray } from "../../../redux/slices/blogSlice";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

const BlogList = () => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const { dbUser } = useAppSelector((state) => state?.user);
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
      memberId: dbUser._id,
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: allAdminData } = useQuery(GET_ALL_ADMIN);

  const findAmin = (id: string) => {
    const admin = allAdminData?.getAllAdmin?.find((admin) => admin?._id === id);
    return admin ? `${admin?.firstName} ${admin?.lastName}` : "Gabriel Branu";
  };

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Blog",
        description: "blog",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            return (
              <BlogCard
                key={blog?._id}
                blogData={{ ...blog, createdBy: findAmin(blog?.createdBy) }}
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
    </Layout>
  );
};

const Layout: FC<{
  blogSearchInput?: string;
  setBlogSearchInput?: (agr: string) => void;
}> = ({ children, blogSearchInput, setBlogSearchInput }) => {
  return (
    <AContainer
      headerIcon="/icons/book_light.svg"
      headerTitle="Blog Discovery"
      showBlogCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: true,
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
