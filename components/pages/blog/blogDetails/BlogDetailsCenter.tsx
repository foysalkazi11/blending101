import React, { useState } from "react";
import { BlogDetailsType } from "../../../../type/blog";
import ImageSlider from "../../../wiki/WikiCenter/firstPortion/ImageSlider";
import SubHeader from "../../../wiki/WikiCenter/firstPortion/SubHeader";
import TopHeader from "../../../wiki/WikiCenter/firstPortion/TopHeader";
import styles from "./BlogDetails.module.scss";
interface Props {
  blogDetails: BlogDetailsType;
}
const BlogDetailsCenter = ({ blogDetails }: Props) => {
  const {
    _id,
    title,
    category,
    coverImage,
    description,
    mediaUrl,
    commentsCount,
  } = blogDetails;
  const [expandAllCollapse, setExpandAllCollapse] = useState(false);
  return (
    <>
      <TopHeader backAddress="/blog" title="Blog" />
      <div className={styles.blogDetailsCenterContainer}>
        <div className={styles.topHeading}>
          <h3>{title}</h3>
        </div>
        <SubHeader
          wikiId={_id}
          author={"Gabriel Branu"}
          categroy={category}
          commentsCount={commentsCount}
          expandAllCollapse={expandAllCollapse}
          setExpandAllCollapse={setExpandAllCollapse}
        />
        <ImageSlider
          imagesWithinBlock={[{ url: coverImage, id: "", caption: "" }]}
          setExpandAllCollapse={setExpandAllCollapse}
        />
      </div>
    </>
  );
};

export default BlogDetailsCenter;
