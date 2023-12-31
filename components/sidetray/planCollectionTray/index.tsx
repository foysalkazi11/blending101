import { useLazyQuery, useMutation } from "@apollo/client";
import { faGrid2, faRectangleHistory, faSearch, faSquare } from "@fortawesome/pro-light-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  EDIT_PLAN_COLLECTION,
  GET_ALL_PLAN_COLLECTION,
  ADD_NEW_PLAN_COLLECTION,
  DELETE_PLAN_COLLECTION,
  ADD_OR_REMOVE_PLAN_COLLECTION,
} from "../../../modules/plan/plan.graphql";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsActivePlanForCollection, setIsOpenPlanCollectionTray } from "../../../redux/slices/Planner.slice";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import SkeletonCollections from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import notification from "../../utility/reactToastifyNotification";
import AddCollectionModal from "../common/addCollectionModal/AddCollectionModal";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import SingleCollection from "../common/singleCollection/SingleCollection";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import styles from "./PlanCollectionTray.module.scss";
import { useUser } from "../../../context/AuthProvider";
import SideDrawer from "component/molecules/Drawer/SideDrawer.component";
import Button from "component/atoms/Button/Button.component";
import Icon from "component/atoms/Icon/Icon.component";
import { useMediaQuery } from "@/app/hooks/interface/useMediaQuery";
import useToUpdatePlanFields from "customHooks/plan/useToUpdatePlanFields";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const PlanCollectionTray = ({ showPanle, showTagByDefaut }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState({
    image: "",
    name: "",
    slug: "",
    description: "",
  });
  const [menuIndex, setMenuIndex] = useState(0);
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [isDeleteCollection, setIsDeleteCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const { isOpenPlanCollectionTray, activePlanForCollection } = useAppSelector((state) => state?.planner);
  const memberId = useUser().id;
  const isMounted = useRef(null);
  const [getAllPlanCollection, { data: allCollectionData, loading: allCollectionLoading, error: allCollectionError }] =
    useLazyQuery(GET_ALL_PLAN_COLLECTION, {
      fetchPolicy: "cache-and-network",
    });
  const [editPlanCollection, { loading: editPlanCollectionLoading }] = useMutation(EDIT_PLAN_COLLECTION);
  const [addNewPlanCollection, { loading: addNewPlanCollectionLoading }] = useMutation(ADD_NEW_PLAN_COLLECTION);
  const [deletePlanCollection, { loading: deletePlanCollectionLoading }] = useMutation(DELETE_PLAN_COLLECTION);
  const [addOrRemovePlanFromCollection] = useMutation(ADD_OR_REMOVE_PLAN_COLLECTION);
  const dispatch = useAppDispatch();
  const handleToUpdatePlanFields = useToUpdatePlanFields();

  const handleAddOrRemoveBlogFormCollection = async () => {
    try {
      await addOrRemovePlanFromCollection({
        variables: {
          memberId,
          collectionIds: activePlanForCollection.collectionIds,
          planId: activePlanForCollection.id,
        },
      });
      const updateObj = {
        planCollections: activePlanForCollection.collectionIds,
      };

      await handleToUpdatePlanFields(activePlanForCollection?.id, updateObj, activePlanForCollection?.planComeFrom);

      dispatch(
        setIsActivePlanForCollection({
          id: "",
          collectionIds: [],
          planComeFrom: "list",
        }),
      );
      notification("info", `Collection update successfully`);
      setIsCollectionUpdate(false);
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
          await editPlanCollection({
            variables: {
              data: {
                memberId,
                editId: collectionId,
                editableObject: {
                  description: input.description,
                  slug: input.slug,
                  name: input.name,
                },
              },
            },
            update(cache, { data: { editAPlanCollection } }) {
              cache.writeQuery({
                query: GET_ALL_PLAN_COLLECTION,
                variables: { memberId },
                data: {
                  getAllPlanCollection: {
                    planCollections: allCollectionData?.getAllPlanCollection?.planCollections.map((collection) =>
                      collection?._id === editAPlanCollection?._id
                        ? { ...collection, ...editAPlanCollection }
                        : collection,
                    ),
                  },
                },
              });
            },
          });
          setOpenModal(false);
          setInput({ image: "", name: "", description: "", slug: "" });
          setOpenModal(false);
        } else {
          await addNewPlanCollection({
            variables: {
              data: {
                memberId,
                name: input.name,
                slug: input.slug,
                description: input.description,
                image: input.image,
              },
            },
            update(cache, { data: { addNewPlanCollection } }) {
              cache.writeQuery({
                query: GET_ALL_PLAN_COLLECTION,
                variables: { memberId },
                data: {
                  getAllPlanCollection: {
                    planCollections: [
                      ...allCollectionData?.getAllPlanCollection?.planCollections,
                      addNewPlanCollection,
                    ],
                  },
                },
              });
            },
          });
        }

        setOpenModal(false);
        setInput({ image: "", name: "", slug: "", description: "" });
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
    setIsDeleteCollection(false);
    setIsEditCollection(false);
    setInput((pre) => ({
      ...pre,
      name: "",
      slug: "",
      description: "",
      image: "",
    }));
    setOpenModal(true);
  };

  // delete collection
  const handleOpenConfirmationModal = (collectionId: string) => {
    setIsDeleteCollection(true);
    setCollectionId(collectionId);
    setOpenModal(true);
  };

  // handle delete collection
  const handleDeleteCollection = async () => {
    try {
      await deletePlanCollection({
        variables: {
          collectionId,
          memberId,
        },
        update(cache, { data: { deletePlanCollection } }) {
          cache.writeQuery({
            query: GET_ALL_PLAN_COLLECTION,
            variables: { memberId },
            data: {
              getAllPlanCollection: {
                planCollections: [...deletePlanCollection?.planCollections],
              },
            },
          });
        },
      });
      setOpenModal(false);
      notification("info", "Delete collection successfully");
    } catch (error) {
      setOpenModal(false);
      notification("error", error?.message);
    }
  };

  // edit a collection
  const handleEditCollection = (id: string, name: string, slug: string, description: string) => {
    setIsDeleteCollection(false);
    setInput((pre) => ({
      ...pre,
      name,
      slug,
      description,
    }));
    setIsEditCollection(true);
    setCollectionId(id);
    setOpenModal(true);
  };

  // handle change blog form collection
  const handleChange = async (e, collectionId) => {
    setIsCollectionUpdate(true);
    if (e?.target?.checked) {
      dispatch(
        setIsActivePlanForCollection({
          ...activePlanForCollection,
          collectionIds: [...activePlanForCollection.collectionIds, collectionId],
        }),
      );
    } else {
      dispatch(
        setIsActivePlanForCollection({
          ...activePlanForCollection,
          collectionIds: activePlanForCollection.collectionIds.filter((id) => id !== collectionId),
        }),
      );
    }
  };

  useEffect(() => {
    if (isOpenPlanCollectionTray) {
      getAllPlanCollection({ variables: { memberId } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPlanCollectionTray]);

  useEffect(() => {
    if (isMounted.current) {
      if (!isOpenPlanCollectionTray) {
        if (isCollectionUpdate && activePlanForCollection.id) {
          handleAddOrRemoveBlogFormCollection();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPlanCollectionTray]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const isMobile = useMediaQuery("md");
  const Wrapper = isMobile ? SideDrawer : TrayWrapper;

  return (
    <Wrapper
      show={isOpenPlanCollectionTray}
      title="Blends Collection"
      button={
        <Button onClick={() => dispatch(setIsOpenPlanCollectionTray(true))}>
          <Icon fontName={faGrid2} color="#7DBD3B" size={20} className="mr-5" />
          Collections
        </Button>
      }
      onClose={() => {
        dispatch(setIsOpenPlanCollectionTray(!isOpenPlanCollectionTray));
      }}
      showTagByDefault={showTagByDefaut}
      closeTray={() => {
        !isCollectionUpdate &&
          dispatch(
            setIsActivePlanForCollection({
              id: "",
              collectionIds: [],
              planComeFrom: "list",
            }),
          );
        dispatch(setIsOpenPlanCollectionTray(!isOpenPlanCollectionTray));
      }}
      openTray={isOpenPlanCollectionTray}
      showPanel={showPanle}
      panelTag={(hover) => <TrayTag icon={<FontAwesomeIcon icon={faBookmark} />} placeMent="left" hover={hover} />}
    >
      {!isMobile && (
        <ToggleMenu
          toggleMenuList={[
            <div key={"key0"} className={styles.menu}>
              <FontAwesomeIcon icon={faRectangleHistory} className={styles.icon} />
              <p>Collections</p>
            </div>,
          ]}
          variant={"outlineSecondary"}
        />
      )}
      <div className="ml-10 mr-10">
        <div className="flex jc-between mb-20">
          <Button onClick={() => dispatch(setIsOpenPlanCollectionTray(true))}>
            <Icon fontName={faGrid2} color="#7DBD3B" size={20} className="mr-5" />
            Collections
          </Button>

          <IconForAddComment handleIconClick={addNewCollection} label="Add collection" />
        </div>
        {allCollectionLoading ? (
          <SkeletonCollections />
        ) : (
          allCollectionData?.getAllPlanCollection?.planCollections?.map((collection, i) => {
            const { _id, name, slug, collectionDataCount, image, blogs, description } = collection;

            return (
              <SingleCollection
                key={_id}
                id={_id}
                name={name}
                description={description}
                slug={slug}
                image={image || "/cards/food.png"}
                collectionItemLength={collectionDataCount}
                showMoreMenu={true}
                handleDeleteCollection={handleOpenConfirmationModal}
                handleEditCollection={handleEditCollection}
                index={i}
                menuIndex={menuIndex}
                setMenuIndex={setMenuIndex}
                changeItemWithinCollection={activePlanForCollection.id ? true : false}
                isRecipeWithinCollection={activePlanForCollection.collectionIds?.includes(_id)}
                deleteCollectionLoading={deletePlanCollectionLoading}
                handleClickCheckBox={handleChange}
                collectionRoute="planCollection"
              />
            );
          })
        )}
      </div>
      {isDeleteCollection && (
        <ConfirmationModal
          text="All the related entities will be removed along with this collection !!!"
          cancleFunc={() => setOpenModal(false)}
          submitFunc={handleDeleteCollection}
          loading={deletePlanCollectionLoading}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      {!isDeleteCollection && (
        <AddCollectionModal
          input={input}
          setInput={setInput}
          setOpenModal={setOpenModal}
          handleToAddOrUpdateCollection={handleAddOrEditCollection}
          isAddOrUpdateCollectionLoading={addNewPlanCollectionLoading || editPlanCollectionLoading}
          openModal={openModal}
        />
      )}
    </Wrapper>
  );
};

export default PlanCollectionTray;
