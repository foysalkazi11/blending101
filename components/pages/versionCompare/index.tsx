import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { FC, useRef, useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_RECIPE_VERSION from "../../../gqlLib/versionCompare/query/getAllRecipeVersions";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import styles from "./index.module.scss";
import Slider from "react-slick";
import { compareRecipeResponsiveSetting } from "./utility";
import { useAppSelector } from "../../../redux/hooks";
import ErrorPage from "../404Page";
import ArrowBackIcon from "../../../public/icons/arrow_back_black_36dp.svg";
import VersionDetailsIndex from "./versionDetails";
import { DragDropContext } from "react-beautiful-dnd";
import { reorder } from "../../recipe/compareRecipe/utility";
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import notification from "../../utility/reactToastifyNotification";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import {
  faPen,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-light-svg-icons";
import { useDispatch } from "react-redux";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";
import {
  RecipeDetailsType,
  VersionDataType,
} from "../../../type/recipeDetailsType";
import { CompareRecipeType } from "../../../type/compareRecipeType";
import useToEditOfARecipeVersion from "../../../customHooks/useToEditOfARecipeVersion";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import {
  setIsNewVersionInfo,
  setOpenVersionTray,
} from "../../../redux/slices/versionTraySlice";
import useToGetARecipeVersion from "../../../customHooks/useToGetARecipeVersion";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const VersionCompare = () => {
  const [newVersionInfo, setNewVersionInfo] = useState<{ [key: string]: any }>(
    {},
  );
  const [openModal, setOpenModal] = useState(false);
  const [normalizeData, setNormalizeData] = useState<CompareRecipeType[]>([]);
  const [singleVersionsEditMode, setSingleVersionsEditMode] = useState(null);
  const [allVersionsEditMode, setAllVersionsEditMode] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [uploadNewImage, setUploadNewImage] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    versionId: "",
    name: "",
    image: [],
    description: "",
    recipeBlendCategory: "",
    ingredients: [],
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const recipeId = router.query?.recipeId as string;
  const { dbUser } = useAppSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_ALL_RECIPE_VERSION, {
    variables: { recipeId, userId: dbUser._id },
  });
  const sliderRef = useRef(null);
  const { handleToEditARecipeVersion, loading: versionUpdateLoading } =
    useToEditOfARecipeVersion();
  const { handleToGetARecipeVersion, loading: getARecipeVersionLoading } =
    useToGetARecipeVersion();

  // open confirmation modal
  const openConfirmationModal = (data: { [key: string]: any }) => {
    setOpenModal(true);
    setNewVersionInfo(data);
  };

  // open version tray
  const handleOpenVersionTray = () => {
    dispatch(setDetailsARecipe(data?.getAllVersions));
    dispatch(setOpenVersionTray(true));
    dispatch(setIsNewVersionInfo(newVersionInfo));
    setOpenModal(false);
  };

  // arrange array for working
  const handleNormalizeData = (
    data: RecipeDetailsType,
  ): CompareRecipeType[] => {
    const {
      recipeId,
      defaultVersion,
      turnedOffVersions,
      turnedOnVersions,
      isMatch,
      addedToCompare,
      allRecipes,
      myRecipes,
      notes,
      userCollections,
      versionsCount,
      tempVersionInfo,
    } = data;
    let mapVersionToRecipe = (
      version: VersionDataType[],
    ): CompareRecipeType[] => {
      return version?.map((item) => ({
        addedToCompare,
        allRecipes,
        defaultVersion: { ...item },
        isMatch,
        myRecipes,
        notes,
        recipeId,
        userCollections,
        versionCount: 0,
      }));
    };
    let normalizeData: CompareRecipeType[] = [
      {
        addedToCompare,
        allRecipes,
        defaultVersion,
        isMatch,
        myRecipes,
        notes,
        recipeId,
        userCollections,
        versionCount: 0,
      },
      ...mapVersionToRecipe(turnedOnVersions),
      ...mapVersionToRecipe(turnedOffVersions),
    ];

    if (!isMatch) {
      normalizeData = [
        {
          addedToCompare,
          allRecipes,
          defaultVersion: recipeId?.originalVersion,
          isMatch,
          myRecipes,
          notes,
          recipeId,
          userCollections,
          versionCount: 0,
        },
        ...normalizeData,
      ];
    }

    return normalizeData;
  };

  // handle go edit mode
  const handleEditMode = (editMode: boolean, index: number | null = null) => {
    setAllVersionsEditMode(editMode);
    setSingleVersionsEditMode(index);
  };

  // update create new recipe data
  const handleUpdateData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >,
  ) => {
    const target = e?.target;
    const { name, value } = target;
    if (target?.files) {
      setNewRecipe((state) => ({ ...state, image: e?.target?.files }));
      setUploadNewImage(true);
    } else {
      setNewRecipe((state) => ({ ...state, [name]: value }));
    }
  };

  // find version by id
  const findVersion = (id: string) => {
    const findOne = normalizeData?.find(
      (version) => version?.defaultVersion?._id === id,
    );
    return findOne;
  };

  // find existing ingredient
  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  // click to add ingredient form others versions
  const addIngredient = (id: string, index: number) => {
    const findRecipe = findVersion(id);

    if (findRecipe) {
      const findIngredient = findRecipe?.defaultVersion?.ingredients?.[index];
      const ingredientId = findIngredient?.ingredientId?._id;
      const selectedPortionName = findIngredient?.selectedPortion?.name;
      const selectedPortionGram = findIngredient?.selectedPortion?.gram;
      const ingredientName = findIngredient?.ingredientId?.ingredientName;
      const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;
      const item = findItem(ingredientId);

      if (!item) {
        const newIngredient = {
          ingredientId: ingredientId,
          selectedPortionName: selectedPortionName,
          weightInGram: selectedPortionGram,
          label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
        };

        setNewRecipe((state) => ({
          ...state,
          ingredients: [...state?.ingredients, newIngredient],
        }));
      } else {
        return;
      }
    }
  };

  // click to version edit
  const editVersionClick = (
    recipe: CompareRecipeType,
    editMode: boolean,
    index: number,
  ) => {
    const {
      defaultVersion: { ingredients, description, postfixTitle, _id },
      recipeId: { image, recipeBlendCategory },
    } = recipe;
    let ingredientsArr = [];

    ingredients?.forEach((ing) => {
      const ingredientId = ing?.ingredientId?._id;
      const selectedPortionName = ing?.selectedPortion?.name;
      const selectedPortionGram = ing?.selectedPortion?.gram;
      const ingredientName = ing?.ingredientId?.ingredientName;
      const selectedPortionQuantity = ing?.selectedPortion?.quantity;
      ingredientsArr.push({
        ingredientId: ingredientId,
        selectedPortionName: selectedPortionName,
        weightInGram: selectedPortionGram,
        label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
      });
    });

    const defaultImage =
      image?.find((img) => img?.default)?.image || image[0]?.image || "";
    setNewRecipe((state) => ({
      ...state,
      versionId: _id,
      name: postfixTitle,
      description,
      image: [defaultImage],
      recipeBlendCategory: recipeBlendCategory?._id,
      ingredients: [...ingredientsArr],
    }));
    handleEditMode(editMode, index);
  };

  // darg and drop data handle
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== "droppable") {
      if (destination.droppableId === "droppable") {
        addIngredient(source?.droppableId, source?.index);
      } else {
        return;
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        setNewRecipe((state) => ({
          ...state,
          ingredients: [
            ...reorder(state?.ingredients, source.index, destination.index),
          ],
        }));
      } else {
        return;
      }
    }
  };

  const handleSubmitEditedVersion = async (
    recipeId: string,
    versionId: string,
    isOriginalVersion: boolean,
  ) => {
    //  dispatch(setLoading(true));
    let ingArr = [];
    newRecipe.ingredients?.forEach((item) => {
      ingArr?.push({
        ingredientId: item?.ingredientId,
        selectedPortionName: item?.selectedPortionName,
        weightInGram: parseFloat(item?.weightInGram),
      });
    });

    let obj = {
      editId: newRecipe?.versionId,
      recipeId: recipeId,
      turnedOn: null,
      userId: dbUser?._id,
      editableObject: {
        postfixTitle: newRecipe?.name,
        description: newRecipe?.description,
        ingredients: ingArr,
      },
    };

    const findRecipe = findVersion(versionId);
    if (
      findRecipe?.defaultVersion?._id ===
      findRecipe?.recipeId?.originalVersion?._id
    ) {
      openConfirmationModal(obj);
    } else {
      try {
        const returnObj = await handleToEditARecipeVersion(
          dbUser._id,
          recipeId,
          versionId,
          true,
          obj.editableObject,
          isOriginalVersion,
        );
        const { isNew, status } = returnObj;
        const updateRecipeVersionObj = isNew
          ? {
              _id: status,
              postfixTitle: obj.editableObject.postfixTitle,
              description: obj.editableObject.description,
            }
          : {
              postfixTitle: obj.editableObject.postfixTitle,
              description: obj.editableObject.description,
            };

        setNormalizeData((data) =>
          data?.map((item) =>
            item?.defaultVersion?._id === versionId
              ? {
                  ...item,
                  defaultVersion: {
                    ...item?.defaultVersion,
                    ...updateRecipeVersionObj,
                  },
                }
              : item,
          ),
        );

        handleEditMode(false, null);
        notification("info", "Version updated successfully");
      } catch (error) {
        notification("error", "Version updated failed");
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      setNormalizeData(handleNormalizeData(data?.getAllVersions));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getAllVersions]);

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Recipe version compare",
        description: "recipe version compare",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customEditIcon = (recipe: any, isEditMode: boolean, index: number) => (
    <IconWarper
      hover="bgSlightGray"
      handleClick={() => editVersionClick(recipe, true, index)}
      style={{ width: "24px", height: "24px" }}
    >
      <FontAwesomeIcon icon={faPen} fontSize={12} />
    </IconWarper>
  );

  if (loading) {
    return (
      <LayoutComponent>
        <SkeletonComparePage />
      </LayoutComponent>
    );
  }

  if (error) {
    return (
      <LayoutComponent>
        <ErrorPage />
      </LayoutComponent>
    );
  }

  return (
    <>
      <LayoutComponent>
        <div className={styles.versionCompareNav} onClick={() => router.back()}>
          <ArrowBackIcon className={styles.versionCompareNav__icon} />
          <p>Back</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
            {normalizeData?.map((recipe, index) => {
              return (
                <VersionDetailsIndex
                  key={index}
                  recipe={recipe}
                  recipeId={recipe?.recipeId?._id}
                  isOriginalVersion={
                    recipe?.recipeId?.originalVersion?._id ===
                    recipe?.defaultVersion?._id
                  }
                  id={recipe?.defaultVersion?._id}
                  setOpenCollectionModal={setOpenCollectionModal}
                  dragAndDrop={allVersionsEditMode}
                  newRecipe={newRecipe}
                  setNewRecipe={setNewRecipe}
                  addItem={addIngredient}
                  handleUpdateData={handleUpdateData}
                  index={index}
                  singleVersionsEditMode={singleVersionsEditMode}
                  handleSubmitEditedVersion={handleSubmitEditedVersion}
                  handleEditMode={handleEditMode}
                  customMenu={customEditIcon(recipe, true, index)}
                  versionUpdateLoading={versionUpdateLoading}
                  showMoreMenuAtHover={true}
                />
              );
            })}
          </Slider>
        </DragDropContext>
      </LayoutComponent>
      <ConfirmationModal
        text="You can't edit original recipe but you can make a new version like original one !!!"
        cancleFunc={() => {
          setOpenModal(false);
          dispatch(setIsNewVersionInfo(null));
        }}
        submitFunc={handleOpenVersionTray}
        // loading={removeARecipeVersionLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        submitButText="Proceed"
      />
    </>
  );
};

const LayoutComponent: FC = ({ children }) => {
  return (
    <AContainer
      logo={false}
      headerIcon={
        <FontAwesomeIcon
          icon={faRectangleVerticalHistory}
          color="#7cbc39"
          fontSize={20}
        />
      }
      headerTitle="Compare versions"
      showCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: false,
      }}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
      showVersionTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.versionCompareContainer}>{children}</div>
    </AContainer>
  );
};

export default VersionCompare;
