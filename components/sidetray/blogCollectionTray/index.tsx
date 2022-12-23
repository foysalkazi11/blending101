import { useLazyQuery, useMutation } from "@apollo/client";
import { faRectangleHistory } from "@fortawesome/pro-regular-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import useToUpdateBlogField from "../../../customHooks/blog/useToUpdateBlogFirld";
import ADD_NEW_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/addNewBlogCllection";
import ADD_OR_REMOVE_TO_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/addOrRemoveToBlogCollection";
import DELETE_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/deleteBlogCollection";
import GET_ALL_BLOG_COLLECTIONS from "../../../gqlLib/blog/query/getAllBlogCollections";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setIsActiveBlogForCollection,
  setIsOpenBlogCollectionTray,
} from "../../../redux/slices/blogSlice";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import SkeletonCollections from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import notification from "../../utility/reactToastifyNotification";
import AddCollectionModal from "../collection/addCollectionModal/AddCollectionModal";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import SingleCollection from "../common/singleCollection/SingleCollection";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import styles from "./BlogCollectionTray.module.scss";

interface BlogCollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const BlogCollectionTray = ({
  showPanle,
  showTagByDefaut,
}: BlogCollectionTrayProps) => {
  const [collectionHasRecipe, setCollectionHasRecipe] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState({
    image: null,
    name: "",
    slug: "",
  });
  const [menuIndex, setMenuIndex] = useState(0);
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const { isOpenBlogCollectionTray, isActiveBlogForCollection } =
    useAppSelector((state) => state?.blog);
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
  const isMounted = useRef(null);
  const [
    getAllBlogCollections,
    {
      data: allCollectionData,
      loading: allCollectionLoading,
      error: allCollectionError,
    },
  ] = useLazyQuery(GET_ALL_BLOG_COLLECTIONS, {
    fetchPolicy: "cache-and-network",
  });
  const [addNewBlogCollection, { loading: addNewBlogCollectionLoading }] =
    useMutation(ADD_NEW_BLOG_COLLECTION);
  const [deleteCollection, { loading: deleteCollectionLoading }] = useMutation(
    DELETE_BLOG_COLLECTION,
  );
  const [addOrRemoveBlogFromCollection] = useMutation(
    ADD_OR_REMOVE_TO_BLOG_COLLECTION,
  );
  const dispatch = useAppDispatch();
  const handleToUpdateBlog = useToUpdateBlogField();

  const handleAddOrRemoveBlogFormCollection = async () => {
    try {
      const { data } = await addOrRemoveBlogFromCollection({
        variables: {
          memberId,
          collectionIds: collectionHasRecipe,
          blogId: isActiveBlogForCollection,
        },
      });
      let isBlogWithingCollection = false;

      data?.getAllBlogCollections?.blogCollections?.forEach((collection) => {
        const { _id, blogs } = collection;

        if (blogs?.includes(isActiveBlogForCollection)) {
          isBlogWithingCollection = true;
        }
      });

      dispatch(setIsActiveBlogForCollection(""));
      notification("info", `Collection update successfully`);
      setIsCollectionUpdate(false);
      handleToUpdateBlog(isActiveBlogForCollection, { hasInCollection: false });
    } catch (error) {
      notification("error", error?.message);
      setIsCollectionUpdate(false);
    }
  };

  // add or edit collection
  const handleAddOrEditCollection = async () => {
    try {
      if (input?.name) {
        if (isEditCollection) {
          //  await editCollection({
          //    variables: {
          //      data: {
          //        userEmail: dbUser?.email,
          //        collectionId: collectionId,
          //        newName: input?.name,
          //      },
          //    },
          //  });
          //  setOpenModal(false);
          //  setInput({ image: null, name: "" });
          setOpenModal(false);
        } else {
          await addNewBlogCollection({
            variables: {
              data: {
                memberId,
                name: input.name,
                slug: input.slug,
              },
            },
            update(cache, { data: { addNewBlogCollection } }) {
              cache.writeQuery({
                query: GET_ALL_BLOG_COLLECTIONS,
                variables: { memberId },
                data: {
                  getAllBlogCollections: {
                    blogCollections: [
                      ...allCollectionData?.getAllBlogCollections
                        ?.blogCollections,
                      addNewBlogCollection,
                    ],
                  },
                },
              });
            },
          });
        }

        setOpenModal(false);
        setInput({ image: null, name: "", slug: "" });
        if (isEditCollection) {
          notification("info", "Collection edit successfully");
        } else {
          notification("info", "Collection add successfully");
        }
      } else {
        notification("info", "Please write collection name");
      }
    } catch (error) {
      notification("error", "An error occurred");
    }
  };
  // open collection modal
  const addNewCollection = () => {
    setIsEditCollection(false);
    setInput((pre) => ({ ...pre, name: "", slug: "" }));
    setOpenModal(true);
  };

  // handle delete collection
  const handleDeleteCollection = async (collectionId: string) => {
    try {
      await deleteCollection({
        variables: {
          collectionId,
          memberId,
        },
        update(cache, { data: { deleteBlogCollection } }) {
          // const allCollectionData = cache.readQuery({
          //   query: GET_ALL_BLOG_COLLECTIONS,
          //   variables: { memberId },
          // });

          cache.writeQuery({
            query: GET_ALL_BLOG_COLLECTIONS,
            variables: { memberId },
            data: {
              getAllBlogCollections: {
                blogCollections: [...deleteBlogCollection?.blogCollections],
              },
            },
          });
        },
      });

      //  dispatch(setCurrentCollectionInfo({ id: "", name: "All Recipes" }));
      //  updateRecipe(activeRecipeId, {
      //    collection: null,
      //  });

      notification("info", "Delete collection successfully");
    } catch (error) {
      notification("error", error?.message);
    }
  };

  // edit a collection
  const handleEditCollection = (id: string, name: string, slug: string) => {
    setInput((pre) => ({
      ...pre,
      name,
      slug,
    }));
    setIsEditCollection(true);
    setCollectionId(id);
    setOpenModal(true);
  };

  // handle change blog form collection
  const handleChange = async (e, collectionId) => {
    setIsCollectionUpdate(true);
    if (e?.target?.checked) {
      setCollectionHasRecipe((pre) => [...pre, collectionId]);
    } else {
      setCollectionHasRecipe((pre) => [
        ...pre?.filter((id) => id !== collectionId),
      ]);
    }
  };

  useEffect(() => {
    if (isOpenBlogCollectionTray) {
      getAllBlogCollections({ variables: { memberId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlogCollectionTray]);
  useEffect(() => {
    if (isActiveBlogForCollection && isOpenBlogCollectionTray) {
      setCollectionHasRecipe([]);
      allCollectionData?.getAllBlogCollections?.blogCollections?.forEach(
        (collection) => {
          const { _id, blogs } = collection;

          if (blogs?.includes(isActiveBlogForCollection)) {
            setCollectionHasRecipe((pre) => {
              if (pre) {
                return [...pre, _id];
              } else {
                return [_id];
              }
            });
          }
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveBlogForCollection, allCollectionData]);

  useEffect(() => {
    if (isMounted.current) {
      if (!isOpenBlogCollectionTray) {
        if (isCollectionUpdate && isActiveBlogForCollection) {
          handleAddOrRemoveBlogFormCollection();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlogCollectionTray]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={() => {
        !isCollectionUpdate && dispatch(setIsActiveBlogForCollection(""));
        dispatch(setIsOpenBlogCollectionTray(!isOpenBlogCollectionTray));
      }}
      openTray={isOpenBlogCollectionTray}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faBookmark} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={[
          <div key={"key0"} className={styles.menu}>
            <FontAwesomeIcon
              icon={faRectangleHistory}
              className={styles.icon}
            />
            <p>Collections</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <IconForAddComment
        handleIconClick={addNewCollection}
        tooltipText="Add collection"
      />
      {allCollectionLoading ? (
        <SkeletonCollections />
      ) : (
        allCollectionData?.getAllBlogCollections?.blogCollections?.map(
          (collection, i) => {
            const { _id, name, slug, collectionDataCount, image, blogs } =
              collection;

            return (
              <SingleCollection
                key={_id}
                id={_id}
                name={name}
                slug={slug}
                image={image || "/cards/food.png"}
                collectionItemLength={collectionDataCount}
                showMoreMenu={true}
                handleDeleteCollection={handleDeleteCollection}
                handleEditCollection={handleEditCollection}
                index={i}
                menuIndex={menuIndex}
                setMenuIndex={setMenuIndex}
                changeItemWithinCollection={
                  isActiveBlogForCollection ? true : false
                }
                isRecipeWithinCollection={collectionHasRecipe?.includes(_id)}
                deleteCollectionLoading={deleteCollectionLoading}
                handleClickCheckBox={handleChange}
              />
            );
          },
        )
      )}
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <AddCollectionModal
          input={input}
          setInput={setInput}
          setOpenModal={setOpenModal}
          handleToAddOrUpdateCollection={handleAddOrEditCollection}
          isAddOrUpdateCollectionLoading={addNewBlogCollectionLoading}
        />
      </CustomModal>
    </TrayWrapper>
  );
};

export default BlogCollectionTray;
