import React from "react";
import styles from "../BlogList.module.scss";
import SkeletonCollectionRecipe from "theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { BlogListType } from "type/blog";
import BlogCard from "../blogCard";
import PanelHeader from "components/recipe/share/panelHeader/PanelHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faXmark } from "@fortawesome/pro-light-svg-icons";
import ErrorPage from "components/pages/404Page";
import IconWarper from "theme/iconWarper/IconWarper";
type BlogCenterProps = {
  data?: BlogListType[];
  loading?: boolean;
  setOpenCollectionModal?: (value: boolean) => void;
  headerTitle?: string;
  showCloseButton?: boolean;
  handleClickCloseButton?: () => void;
  blogFieldUpdateFunction?: (id: string, updateObj: { [key: string]: any }) => void;
};
const BlogCenter = ({
  data = [],
  loading = false,
  setOpenCollectionModal = () => {},
  headerTitle = "Blog Discovery",
  showCloseButton = false,
  handleClickCloseButton = () => {},
  blogFieldUpdateFunction = () => {},
}: BlogCenterProps) => {
  if (loading) {
    return <SkeletonCollectionRecipe style={{ margin: "2rem" }} />;
  }
  return (
    <>
      <PanelHeader
        title={headerTitle}
        icon={<FontAwesomeIcon icon={faInfoCircle} fontSize={24} />}
        rightSide={
          showCloseButton ? (
            <IconWarper
              iconColor="iconColorWhite"
              defaultBg="secondary"
              hover="bgSecondary"
              style={{ width: "28px", height: "28px" }}
              handleClick={handleClickCloseButton}
            >
              <FontAwesomeIcon icon={faXmark} />
            </IconWarper>
          ) : null
        }
      />
      {data?.length ? (
        <div className={styles.blogCenterContentContainer}>
          {data?.map((blog: BlogListType) => {
            return (
              <BlogCard
                key={blog?._id}
                blogData={blog}
                setOpenLastModifiedCollectionModal={setOpenCollectionModal}
                blogFieldUpdateFunction={blogFieldUpdateFunction}
              />
            );
          })}
        </div>
      ) : (
        <ErrorPage errorMessage="No Blog found" />
      )}
    </>
  );
};

export default BlogCenter;
