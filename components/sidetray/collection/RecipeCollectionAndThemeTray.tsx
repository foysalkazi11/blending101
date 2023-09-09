/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TrayWrapper from "../TrayWrapper";
import CollectionComponent from "./content/collection.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import AddCollectionModal from "../common/addCollectionModal/AddCollectionModal";
import GET_COLLECTIONS_AND_THEMES from "../../../gqlLib/collection/query/getCollectionsAndThemes";
import { useLazyQuery, useMutation } from "@apollo/client";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";
import {
  setChangeRecipeWithinCollection,
  setCurrentCollectionInfo,
} from "../../../redux/slices/collectionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrayTag from "../TrayTag";
import { faRectangleHistory } from "@fortawesome/pro-regular-svg-icons";
import styles from "./collectionTray.module.scss";
import Widget from "../../../component/module/Widget/Widget.component";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { faFerrisWheel } from "@fortawesome/pro-light-svg-icons";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import CREATE_NEW_COLLECTION from "../../../gqlLib/collection/mutation/createNewCollection";
import EDIT_COLLECTION from "../../../gqlLib/collection/mutation/editCollection";
import notification from "../../utility/reactToastifyNotification";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import DELETE_COLLECTION from "../../../gqlLib/collection/mutation/deleteCollection";
import useUpdateRecipeField from "../../../customHooks/useUpdateRecipeFirld";
import { useUser } from "../../../context/AuthProvider";
import { useRouter } from "next/router";
import CommentAndNoteButton from "../../../theme/button/commentAndNoteButton/CommentAndNoteButton";

interface CollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function RecipeCollectionAndThemeTray({
  showTagByDefaut = true,
  showPanle = "left",
}: CollectionTrayProps) {
  const user = useUser();

  const [toggle, setToggle] = useState(0);
  const [input, setInput] = useState({
    name: "",
    slug: "",
    description: "",
    isSharedCollection: false,
  });
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [isDeleteCollection, setIsDeleteCollection] = useState(false);
  const [isDeleteCollectionShared, setIsDeleteCollectionShared] =
    useState(false);
  const [collectionId, setCollectionId] = useState("");

  const { changeRecipeWithinCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [createNewCollection, { loading: addCollectionLoading }] = useMutation(
    CREATE_NEW_COLLECTION,
  );
  const [editCollection, { loading: editCollectionLoading }] =
    useMutation(EDIT_COLLECTION);
  const [deleteCollection, { loading: deleteCollectionLoading }] =
    useMutation(DELETE_COLLECTION);
  const router = useRouter();

  // close recipe collection tray
  const closeTray = () => {
    dispatch(setOpenCollectionsTary(!openCollectionsTary));
    dispatch(setChangeRecipeWithinCollection(false));
  };

  const [
    getCollectionsAndThemes,
    {
      data: collectionsData,
      loading: collectionsLoading,
      error: collectionsError,
    },
  ] = useLazyQuery(GET_COLLECTIONS_AND_THEMES, {
    // fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (openCollectionsTary) {
      getCollectionsAndThemes({ variables: { userId: user.id } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollectionsTary]);

  const handleToggle = (no: number) => {
    if (!changeRecipeWithinCollection) {
      setToggle(no);
    }
  };

  // add new collection open modal
  const addNewCollection = () => {
    setIsDeleteCollection(false);
    setIsEditCollection(false);
    setInput({
      name: "",
      slug: "",
      description: "",
      isSharedCollection: false,
    });
    setOpenModal(true);
  };

  const saveToDb = async () => {
    if (input?.name) {
      try {
        if (isEditCollection) {
          await editCollection({
            variables: {
              data: {
                userId: user.id,
                collectionId: collectionId,
                newName: input?.name,
                isSharedCollection: input?.isSharedCollection,
              },
            },
            update(cache, { data: { editACollection } }) {
              cache.writeQuery({
                query: GET_COLLECTIONS_AND_THEMES,
                variables: { userId: user.id },
                data: {
                  getUserCollectionsAndThemes: {
                    collections:
                      collectionsData?.getUserCollectionsAndThemes?.collections?.map(
                        (collection) =>
                          collection?._id === collectionId
                            ? {
                                ...collection,
                                ...input,
                                personalizedName: input?.isSharedCollection
                                  ? input.name
                                  : "",
                              }
                            : collection,
                      ),
                  },
                },
              });
            },
          });
          setOpenModal(false);
          setInput({
            name: "",
            description: "",
            slug: "",
            isSharedCollection: false,
          });
        } else {
          await createNewCollection({
            variables: {
              data: {
                userId: user.id,
                collection: {
                  image: null,
                  name: input?.name,
                  recipes: [],
                  slug: input.slug,
                },
              },
            },
            update(cache, { data: { createNewCollection } }) {
              cache.writeQuery({
                query: GET_COLLECTIONS_AND_THEMES,
                variables: { userId: user.id },
                data: {
                  getUserCollectionsAndThemes: {
                    collections: [
                      ...collectionsData?.getUserCollectionsAndThemes
                        ?.collections,
                      createNewCollection,
                    ],
                  },
                },
              });
            },
          });
        }
        setOpenModal(false);
        setInput({
          name: "",
          description: "",
          slug: "",
          isSharedCollection: false,
        });
        if (isEditCollection) {
          notification("info", "Collection edit successfully");
        } else {
          notification("info", "Collection add successfully");
        }
      } catch (error) {
        setOpenModal(false);
        if (isEditCollection) {
          notification("error", "Failed to edit collection ");
        } else {
          notification("error", "Failed to add collection ");
        }
      }
    } else {
      notification("info", "Please write collection name");
    }
  };

  const handleEditCollection = (
    id: string,
    name: string,
    slug: string,
    description: string,
    isSharedCollection: boolean = false,
  ) => {
    setIsDeleteCollection(false);
    setInput((pre) => ({
      ...pre,
      name,
      slug,
      description,
      isSharedCollection,
    }));
    setIsEditCollection(true);
    setCollectionId(id);
    setOpenModal(true);
  };

  // delete collection
  const handleOpenConfirmationModal = (
    collectionId: string,
    isSharedCollection: boolean = false,
  ) => {
    setIsDeleteCollectionShared(isSharedCollection);
    setIsDeleteCollection(true);
    setCollectionId(collectionId);
    setOpenModal(true);
  };
  // delete collection
  const handleDeleteCollection = async () => {
    try {
      await deleteCollection({
        variables: {
          data: {
            collectionId: collectionId,
            userId: user.id,
            isSharedCollection: isDeleteCollectionShared,
          },
        },
        update(cache, { data: { deleteCollection } }) {
          cache.writeQuery({
            query: GET_COLLECTIONS_AND_THEMES,
            variables: { userId: user.id },
            data: {
              getUserCollectionsAndThemes: {
                collections:
                  collectionsData?.getUserCollectionsAndThemes?.collections?.filter(
                    (collection) => collection?._id !== collectionId,
                  ),
              },
            },
          });
        },
      });
      dispatch(setCurrentCollectionInfo({ id: "", name: "All Recipes" }));
      setOpenModal(false);
      // updateRecipe(activeRecipeId, {
      //   collection: null,
      // });

      notification("info", "Collection delete successfully");
    } catch (error) {
      setOpenModal(false);
      notification("error", error?.message);
    }
  };

  return (
    <TrayWrapper
      showTagByDefault={showTagByDefaut}
      closeTray={closeTray}
      openTray={openCollectionsTary}
      showPanel={showPanle}
      panelTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faBookmark} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <ToggleMenu
        setToggle={handleToggle}
        toggle={toggle}
        toggleMenuList={
          changeRecipeWithinCollection
            ? [
                <div key={"key0"} className={styles.menu}>
                  <FontAwesomeIcon
                    icon={faRectangleHistory}
                    className={styles.icon}
                  />

                  <p>Collections</p>
                </div>,
              ]
            : [
                <div key={"key0"} className={styles.menu}>
                  <FontAwesomeIcon
                    icon={faRectangleHistory}
                    className={styles.icon}
                  />

                  <p>Collections</p>
                </div>,
                <div key={"key1"} className={styles.menu}>
                  <FontAwesomeIcon
                    icon={faFerrisWheel}
                    className={styles.icon}
                  />
                  <p>Themes</p>
                </div>,
              ]
        }
        variant={"containSecondary"}
      />

      {toggle === 0 && (
        <div className="flex ai-center jc-between mt-20 mb-20">
          <CommentAndNoteButton
            type="submitBtn"
            submitBtnVarient="outlineSecondary"
            text={
              <div className="flex ai-center">
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ marginRight: "1rem" }}
                />
                <p>All Collections</p>
              </div>
            }
            handleClick={() => {
              closeTray();
              router.push(`/recipe/recipeCollection/my_collections`);
            }}
          />

          <IconForAddComment
            handleIconClick={addNewCollection}
            label="Add collection"
          />
        </div>
      )}

      {toggle === 0 ? (
        <CollectionComponent
          collections={
            collectionsData?.getUserCollectionsAndThemes?.collections || []
          }
          collectionsLoading={collectionsLoading}
          handleDeleteCollection={handleOpenConfirmationModal}
          handleEditCollection={handleEditCollection}
        />
      ) : (
        <Widget
          slug="recipe-editor"
          elements={(item) => (
            <div key={item.slug} className={"col-4"}>
              <Link href={`/recipe-editor/${item.slug}`}>
                <div className={styles.theme__child}>
                  <div className={styles.theme__cover}>
                    <div
                      className={styles.theme__cover__abs}
                      style={{ backgroundImage: `url(${item.icon})` }}
                    />
                  </div>
                  <p>{item.displayName}</p>
                </div>
              </Link>
            </div>
          )}
        />
      )}
      {isDeleteCollection && (
        <ConfirmationModal
          text="All the related entities will be removed along with this collection !!!"
          cancleFunc={() => setOpenModal(false)}
          submitFunc={handleDeleteCollection}
          loading={deleteCollectionLoading}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {!isDeleteCollection && (
        <AddCollectionModal
          input={input}
          setInput={setInput}
          setOpenModal={setOpenModal}
          handleToAddOrUpdateCollection={saveToDb}
          isAddOrUpdateCollectionLoading={
            addCollectionLoading || editCollectionLoading
          }
          openModal={openModal}
        />
      )}
    </TrayWrapper>
  );
}
