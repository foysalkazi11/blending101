import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FooterRecipeFilter from "../../../components/footer/footerRecipeFilter.component";
import AContainer from "../../../containers/A.container";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import { useQuery } from "@apollo/client";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import GET_ALL_ADMIN from "../../../gqlLib/user/queries/getAllAdmin";
import GET_ALL_BLOGS_FOR_A_COLLECTION from "../../../gqlLib/blog/query/getAllBlogsForACollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-regular-svg-icons";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

const CollectionBlog = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const slug = router.query?.collectionSlug as string;
  const [input, setInput] = useState("");
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { data: allAdminData } = useQuery(GET_ALL_ADMIN);
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
  const findAmin = (id: string) => {
    const admin = allAdminData?.getAllAdmin?.find((admin) => admin?._id === id);
    return admin ? `${admin?.firstName} ${admin?.lastName}` : "Gabriel Branu";
  };

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Blog collection",
        description: "blog collection",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AContainer
      headerIcon="/icons/book_light.svg"
      headerTitle="Blog collection"
      showBlogCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: true,
      }}
      showBlogCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
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
          findAmin={findAmin}
        />
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default CollectionBlog;
