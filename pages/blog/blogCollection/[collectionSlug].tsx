import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import { useQuery } from "@apollo/client";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import GET_ALL_BLOGS_FOR_A_COLLECTION from "../../../gqlLib/blog/query/getAllBlogsForACollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-regular-svg-icons";
import { useUser } from "../../../context/AuthProvider";
import BlogCollectionTray from "components/sidetray/blogCollectionTray";
import BlogCommentsTray from "components/sidetray/blogCommentsTray";

const CollectionBlog = () => {
  const router = useRouter();
  const slug = router.query?.collectionSlug as string;
  const [input, setInput] = useState("");
  const memberId = useUser().id;
  const { data: allBlogs, loading: allBlogsLoading } = useQuery(
    GET_ALL_BLOGS_FOR_A_COLLECTION,
    {
      variables: {
        slug,
        memberId,
        page: 1,
        limit: 12,
      },
    },
  );

  return (
    <React.Fragment>
      <BlogCollectionTray showPanle="left" showTagByDefaut={true} />
      <BlogCommentsTray showPanle="right" showTagByDefaut={false} />
      <div className={styles.main__div}>
        <CommonSearchBar
          input={input}
          setInput={setInput}
          isSearchTag={false}
          styles={{ marginLeft: "16px" }}
        />
        <WikiBanner />

        <ShowRecipeContainer
          data={allBlogs?.getAllBlogsForACollection?.blogs}
          loading={allBlogsLoading}
          headerLeftSide={
            <div className="flex ai-center">
              {slug === "my-favorite" ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className={classes.head__icon}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={classes.head__icon} />
              )}

              <h2 className={classes.head__title}>
                {allBlogs?.getAllBlogsForACollection?.collectionInfo?.name}
              </h2>
            </div>
          }
          closeHandler={() => router.push("/blog")}
          showItems="blog"
          showDefaultRightHeader
        />
      </div>
    </React.Fragment>
  );
};

CollectionBlog.meta = {
  icon: "/icons/book_light.svg",
  title: "Blog collection",
};

export default CollectionBlog;
