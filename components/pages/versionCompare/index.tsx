import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { FC, useRef, useState, useEffect } from "react";
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
import notification from "../../utility/reactToastifyNotification";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import {
  faPen,
  faRectangleVerticalHistory,
} from "@fortawesome/pro-light-svg-icons";
import { useDispatch } from "react-redux";
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
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";
import { VersionAddDataType } from "../../../type/versionAddDataType";
import useToUpdateAfterEditVersion from "../../../customHooks/useToUpdateAfterEditVersion";
import mapIngredientStatus from "../../../helperFunc/mapIngredientStatus";
import { useUser } from "../../../context/AuthProvider";
import RecipeCommentsTray from "../../sidetray/commentsTray/RecipeCommentsTray";
import VersionTray from "../../sidetray/versionTray/VersionTray";
import RecipeCollectionAndThemeTray from "../../sidetray/collection/RecipeCollectionAndThemeTray";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

export interface CreateNewRecipeType {
  versionId: string;
  name: string;
  image: string[];
  description: string;
  recipeBlendCategory: string;
  ingredients: any;
  netCarbs?: number;
  RxScore?: number;
  calorie?: number;
}

const VersionCompare = () => {
  const [newVersionInfo, setNewVersionInfo] = useState<VersionAddDataType>(
    {} as VersionAddDataType,
  );
  const [openModal, setOpenModal] = useState(false);
  const [normalizeData, setNormalizeData] = useState<CompareRecipeType[]>([]);
  const [singleVersionsEditMode, setSingleVersionsEditMode] = useState(null);
  const [allVersionsEditMode, setAllVersionsEditMode] = useState(false);
  const [newRecipe, setNewRecipe] = useState<CreateNewRecipeType>({
    versionId: "",
    name: "",
    image: [],
    description: "",
    recipeBlendCategory: "",
    ingredients: [],
    calorie: 0,
    netCarbs: 0,
    RxScore: 100,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const recipeId = router.query?.recipeId as string;
  const user = useUser();
  const { data, loading, error } = useQuery(GET_ALL_RECIPE_VERSION, {
    variables: { recipeId, userId: user.id },
  });
  const sliderRef = useRef(null);
  const { handleToEditARecipeVersion, loading: versionUpdateLoading } =
    useToEditOfARecipeVersion();

  const isMounted = useRef(false);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const handleToUpdateARecipeVersionAfterEdit = useToUpdateAfterEditVersion();
  const { allIngredients } = useAppSelector((state) => state?.ingredients);

  // open confirmation modal
  const openConfirmationModal = (data: VersionAddDataType) => {
    setOpenModal(true);
    setNewVersionInfo(data);
  };

  // open version tray
  const handleOpenVersionTray = async () => {
    dispatch(setOpenVersionTray(true));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
    dispatch(setIsNewVersionInfo(newVersionInfo));
    setOpenModal(false);
  };

  const versionHandler = (
    recipeId: string,
    versionInfo?: VersionDataType,
    isVersionEditMode: boolean = false,
  ) => {
    dispatch(setOpenVersionTray(true));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
    let ingredientsArr = [];

    versionInfo?.ingredients?.forEach((ing) => {
      const ingredientId = ing?.ingredientId?._id;
      const selectedPortionName = ing?.selectedPortion?.name;
      const selectedPortionGram = ing?.selectedPortion?.gram;
      ingredientsArr.push({
        ingredientId: ingredientId,
        selectedPortionName: selectedPortionName,
        weightInGram: selectedPortionGram,
      });
    });

    let obj: VersionAddDataType = {
      postfixTitle: versionInfo?.postfixTitle,
      recipeId: versionInfo?.recipeId || recipeId,
      userId: user.id,
      description: versionInfo?.description,
      ingredients: ingredientsArr,
      recipeInstructions: versionInfo?.recipeInstructions,
      servingSize: versionInfo?.servingSize,
    };
    dispatch(setIsNewVersionInfo(isVersionEditMode ? obj : null));
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

    // map version to recipe
    let mapVersionToRecipe = (
      version: VersionDataType[],
      isVersionSharable: boolean,
    ): CompareRecipeType[] => {
      return version?.map((item) => ({
        addedToCompare,
        allRecipes,
        defaultVersion: {
          ...item,
          isVersionSharable,
          ingredients: mapIngredientStatus(
            item?.ingredients || [],
            item?.errorIngredients || [],
          ),
        },
        isMatch: false,
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
        defaultVersion: {
          ...defaultVersion,
          isVersionSharable: true,
          ingredients: mapIngredientStatus(
            defaultVersion?.ingredients,
            defaultVersion?.errorIngredients,
          ),
        },
        isMatch: true,
        myRecipes,
        notes,
        recipeId,
        userCollections,
        versionCount: 0,
      },
      ...(mapVersionToRecipe(turnedOnVersions, true) || []),
      ...(mapVersionToRecipe(turnedOffVersions, false) || []),
    ];

    if (!isMatch) {
      normalizeData = [
        {
          addedToCompare,
          allRecipes,
          defaultVersion: {
            ...recipeId?.originalVersion,
            isVersionSharable: true,
            ingredients: mapIngredientStatus(
              recipeId?.originalVersion?.ingredients,
              recipeId?.originalVersion?.errorIngredients,
            ),
          },
          isMatch: false,
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

  const findItemIngredientId = (id) => {
    return newRecipe?.ingredients?.find(
      (item) => item?.ingredientId === id || item?.qaId === id,
    );
  };
  const findItemQaId = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.qaId === id);
  };

  const addIngredient = (id: string, index: number) => {
    const findRecipe = findVersion(id);
    const findIngredient = findRecipe?.defaultVersion.ingredients[index];
    const isIngredientStatusOk = findIngredient?.ingredientStatus === "ok";

    let ingredientId = "";
    let newIngredient = {};
    if (isIngredientStatusOk) {
      ingredientId = findIngredient?.ingredientId?._id;
      const selectedPortionName = findIngredient?.selectedPortion?.name;
      const selectedPortionGram = findIngredient?.selectedPortion?.gram;
      const ingredientName = findIngredient?.ingredientId?.ingredientName;
      const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;
      const comment = findIngredient?.comment || "";
      let label = `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`;
      newIngredient = {
        ingredientId,
        selectedPortionName,
        weightInGram: selectedPortionGram,
        ingredientStatus: "ok",
        label,
        comment,
        selectedPortionQuantity,
        ingredientName,
      };
    } else {
      //@ts-ignore
      ingredientId = findIngredient?.qaId;
      newIngredient = {
        ...findIngredient,
        label: findIngredient?.errorString,
      };
    }
    // is already exist
    const item = isIngredientStatusOk
      ? findItemIngredientId(ingredientId)
      : findItemQaId(ingredientId);

    if (!item) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [...state?.ingredients, newIngredient],
      }));
    } else {
      return;
    }
  };

  // click to version edit
  const editVersionClick = (
    recipe: CompareRecipeType,
    editMode: boolean,
    index: number,
  ) => {
    const {
      defaultVersion: {
        ingredients,
        description,
        postfixTitle,
        _id,
        calorie,
        gigl,
      },
      recipeId: { image, recipeBlendCategory },
    } = recipe;
    let ingredientsArr = [];

    ingredients?.forEach((ing) => {
      const isIngredientStatusOk = ing?.ingredientStatus === "ok";
      if (isIngredientStatusOk) {
        const ingredientId = ing?.ingredientId?._id;
        const selectedPortionName = ing?.selectedPortion?.name;
        const selectedPortionGram = ing?.selectedPortion?.gram;
        const ingredientName = ing?.ingredientId?.ingredientName;
        const selectedPortionQuantity = ing?.selectedPortion?.quantity;
        const label = `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`;
        const comment = ing?.comment || "";
        ingredientsArr.push({
          ingredientId: ingredientId,
          selectedPortionName: selectedPortionName,
          weightInGram: selectedPortionGram,
          selectedPortionQuantity,
          ingredientName,
          label,
          comment,
          ingredientStatus: "ok",
        });
      } else {
        ingredientsArr.push({
          ...ing,
          label: ing?.errorString,
        });
      }
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
      ingredients: ingredientsArr,
      calorie: calorie?.value || 0,
      netCarbs: gigl?.netCarbs || 0,
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
    isVersionSharable: boolean,
  ) => {
    const version = findVersion(versionId);
    let ingArr = [];
    let newIngredientObj = [];
    newRecipe.ingredients?.forEach((item) => {
      const {
        ingredientId,
        selectedPortionName,
        weightInGram,
        ingredientName,
        selectedPortionQuantity,
        comment = "",
      } = item;
      ingArr?.push({
        ingredientId: item?.ingredientId,
        selectedPortionName: item?.selectedPortionName,
        weightInGram: item?.weightInGram,
        comment: comment || "",
      });
      newIngredientObj.push({
        ingredientId: {
          _id: ingredientId,
          ingredientName,
        },
        selectedPortion: {
          gram: weightInGram,
          name: selectedPortionName,
          quantity: selectedPortionQuantity,
        },
        weightInGram,
      });
    });

    let objForEditARecipe = {
      editId: newRecipe?.versionId,
      recipeId: recipeId,
      turnedOn: version?.defaultVersion?.isVersionSharable || null,
      userId: user.id,
      editableObject: {
        postfixTitle: newRecipe?.name,
        description: newRecipe?.description,
        ingredients: ingArr,
      },
    };

    const objForCreateNewVersion: VersionAddDataType = {
      postfixTitle: newRecipe?.name,
      recipeId: recipeId,
      userId: user.id,
      description: newRecipe?.description,
      ingredients: ingArr,
      recipeInstructions: [],
      servingSize: 0,
    };

    const findRecipe = findVersion(versionId);
    if (
      findRecipe?.defaultVersion?._id ===
      findRecipe?.recipeId?.originalVersion?._id
    ) {
      openConfirmationModal(objForCreateNewVersion);
    } else {
      try {
        const returnObj = await handleToEditARecipeVersion(
          user.id,
          recipeId,
          versionId,
          isVersionSharable,
          objForEditARecipe?.editableObject,
          isOriginalVersion,
        );

        handleToUpdateARecipeVersionAfterEdit(
          versionId,
          isVersionSharable,
          {
            postfixTitle: objForEditARecipe?.editableObject.postfixTitle,
            description: objForEditARecipe?.editableObject.description,
            ingredients: newIngredientObj,
            calorie: { value: newRecipe?.calorie },
            gigl: { netCarbs: newRecipe?.netCarbs },
          },
          returnObj,
        );

        handleEditMode(false, null);
        // notification("info", "Version updated successfully");
      } catch (error) {
        notification("error", "Version updated failed");
      }
    }
  };

  const handleToUpdateDataAfterChangeDefaultVersion = (
    versionId: string,
    returnObj: { [key: string]: any } = {},
  ) => {
    // dispatch(
    //   setDetailsARecipe({
    //     ...detailsARecipe,
    //     ...returnObj,
    //   }),
    // );
  };

  useEffect(() => {
    setNormalizeData(handleNormalizeData(detailsARecipe));
  }, [detailsARecipe]);

  useEffect(() => {
    if (!loading && data?.getAllVersions) {
      const recipe = data?.getAllVersions;
      dispatch(
        setDetailsARecipe({
          ...recipe,
          tempVersionInfo: {
            isOriginalVersion: recipe?.isMatch,
            isShareAble: true,
            version: recipe?.defaultVersion,
          },
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getAllVersions, loading]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
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
    return <SkeletonComparePage style={{ margin: "2rem" }} />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <React.Fragment>
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <VersionTray showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={false} />
      <div className={styles.versionCompareContainer}>
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
                  footerMenuType="OnlyStar"
                  updateDataAfterChangeDefaultVersion={
                    handleToUpdateDataAfterChangeDefaultVersion
                  }
                  handleToOpenVersionTray={versionHandler}
                  showTopCancelButton={
                    singleVersionsEditMode === index ? true : false
                  }
                  isVersionSharable={recipe?.defaultVersion?.isVersionSharable}
                />
              );
            })}
          </Slider>
        </DragDropContext>

        <ConfirmationModal
          text="You can't edit original recipe but you can make a new version like original one !!!"
          cancleFunc={() => {
            setOpenModal(false);
            dispatch(setIsNewVersionInfo(null));
          }}
          submitFunc={handleOpenVersionTray}
          openModal={openModal}
          setOpenModal={setOpenModal}
          submitButText="Proceed"
        />
      </div>
    </React.Fragment>
  );
};

export default VersionCompare;
