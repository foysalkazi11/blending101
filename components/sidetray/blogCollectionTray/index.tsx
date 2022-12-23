import { useLazyQuery, useMutation } from "@apollo/client";
import { faRectangleHistory } from "@fortawesome/pro-regular-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ADD_NEW_BLOG_COLLECTION from "../../../gqlLib/blog/mutation/addNewBlogCllection";
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
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState({
    image: null,
    name: "",
    slug: "",
  });
  const [menuIndex, setMenuIndex] = useState(0);
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const { isOpenBlogCollectionTray, isActiveBlogForCollection } =
    useAppSelector((state) => state?.blog);
  const memberId = useAppSelector((state) => state?.user?.dbUser?._id || "");
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
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (isOpenBlogCollectionTray) {
      getAllBlogCollections({ variables: { memberId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlogCollectionTray]);
  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={() => {
        dispatch(setIsActiveBlogForCollection(""));
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
                isRecipeWithinCollection={blogs?.includes(
                  isActiveBlogForCollection,
                )}
                deleteCollectionLoading={deleteCollectionLoading}
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
