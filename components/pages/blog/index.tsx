import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GET_ALL_GENERAL_BLOG_FOR_CLIENT from "../../../gqlLib/blog/query/getAllGeneralBlogForClient";
import styles from "./BlogList.module.scss";
import CommonSearchBar from "../../searchBar/CommonSearchBar";
import WikiBanner from "../../wiki/wikiBanner/WikiBanner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ShowLastModifiedCollection from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenBlogCollectionTray } from "../../../redux/slices/blogSlice";
import { useUser } from "../../../context/AuthProvider";
import BlogCollectionTray from "../../sidetray/blogCollectionTray";
import BlogCommentsTray from "components/sidetray/blogCommentsTray";
import BlogLeftSide from "./blogLeftSide";
import BlogCenter from "./blogCenter";
import useWindowSize from "components/utility/useWindowSize";
import TrayWrapper from "components/sidetray/TrayWrapper";
import TrayTag from "components/sidetray/TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFerrisWheel } from "@fortawesome/pro-light-svg-icons";
import useDebounce from "customHooks/useDebounce";
import useToFilterBlog from "customHooks/blog/useToFilterBlog";
import { useIsMounted } from "customHooks/useIsMounted";
import { BlogListType } from "type/blog";

const BlogList = () => {
  const [allBlogs, setAllBlogs] = useState<BlogListType[]>([]);
  const [activeTheme, setActiveTheme] = useState<{ [key: string]: any }>({});
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [openBlogFilterTray, setOpenBlogFilterTray] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useUser();
  const { lastModifiedBlogCollection } = useAppSelector((state) => state?.blog);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const isMounted = useIsMounted();
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

  const debounceValue = useDebounce(searchTerm, 300);
  const { handlerToFilterBlog, loading: blogFilterLoading } = useToFilterBlog();

  // blog field update function

  const blogFieldUpdateFunction = (id: string, obj: { [key: string]: any }) => {
    setAllBlogs((blogs) => blogs.map((blog) => (blog._id === id ? { ...blog, ...obj } : blog)));
  };

  // blog filter function
  const blogFilterFunction = async (searchTerm: string) => {
    try {
      const data = await handlerToFilterBlog({ searchTerm: searchTerm });
      setAllBlogs(data?.filterBlog?.blogs);
      setActiveTheme({});
    } catch (error) {
      console.log(error);
    }
  };

  // toggle theme panel
  const toggleThemePanel = () => {
    setOpenBlogFilterTray((prev) => !prev);
  };

  // check active theme
  const checkActiveTheme = (id: string) => {
    return activeTheme?._id === id;
  };

  // add or remove theme
  const blogThemeOnClick = (wikiThemeData: { [key: string]: any }) => {
    if (checkActiveTheme(wikiThemeData?._id)) {
      setActiveTheme({});
      setAllBlogs(generalBlogData?.getAllGeneralBlogForClient?.blogs);
    } else {
      setActiveTheme(wikiThemeData);
      setAllBlogs(wikiThemeData?.data?.GeneralBlog);
    }
  };

  // handle Click Close Button

  const handleClickCloseButton = () => {
    setAllBlogs(generalBlogData?.getAllGeneralBlogForClient?.blogs);
    setActiveTheme({});
    setSearchTerm("");
  };

  // if (generalBlogLoading) {
  //   return <SkeletonCollectionRecipe style={{ margin: "2rem" }} />;
  // }
  // if (generalBlogError) {
  //   return <ErrorPage />;
  // }

  useEffect(() => {
    if (isMounted()) {
      if (debounceValue) {
        blogFilterFunction(debounceValue);
      } else {
        setAllBlogs(generalBlogData?.getAllGeneralBlogForClient?.blogs);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    setAllBlogs(generalBlogData?.getAllGeneralBlogForClient?.blogs);
  }, [generalBlogData?.getAllGeneralBlogForClient?.blogs]);

  return (
    <>
      <BlogCollectionTray showPanle="left" showTagByDefaut={true} />
      <BlogCommentsTray showPanle="right" showTagByDefaut={false} />
      {/* <BlogFilterTray showPanel="left" showTagByDefault={false} /> */}
      <div className={styles.blogPageLayout}>
        <CommonSearchBar
          input={searchTerm}
          showFilterIcon={width > 1280 ? false : true}
          handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
          }}
          openFilterPanel={toggleThemePanel}
        />

        <WikiBanner />
        <div className={styles.blogCardContainer}>
          <div className={styles.left}>
            <BlogLeftSide blogThemeOnClick={blogThemeOnClick} checkActiveTheme={checkActiveTheme} />
          </div>

          <div className={styles.center}>
            <BlogCenter
              data={allBlogs}
              loading={generalBlogLoading || blogFilterLoading}
              setOpenCollectionModal={setOpenCollectionModal}
              showCloseButton={activeTheme?.data?.GeneralBlog || debounceValue ? true : false}
              handleClickCloseButton={handleClickCloseButton}
              blogFieldUpdateFunction={blogFieldUpdateFunction}
            />
          </div>
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

      <div className={width < 1280 ? "show" : "hide"}>
        <TrayWrapper
          isolated={true}
          showPanel="left"
          showTagByDefault={width < 1280 && openBlogFilterTray ? true : false}
          openTray={openBlogFilterTray}
          panelTag={(hover) => (
            <TrayTag
              hover={hover}
              icon={<FontAwesomeIcon icon={faFerrisWheel} />}
              placeMent="left"
              handleTagClick={toggleThemePanel}
            />
          )}
        >
          <BlogLeftSide
            blogThemeOnClick={blogThemeOnClick}
            checkActiveTheme={checkActiveTheme}
            style={{ marginTop: "1rem" }}
          />
        </TrayWrapper>
      </div>
    </>
  );
};

export default BlogList;
