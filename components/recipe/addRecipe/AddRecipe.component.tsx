/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import AContainer from '../../../containers/A.container';
import styles from './AddRecipe.module.scss';
import Center_header from './header/centerHeader/Center_header.component';
import RightTray from './rightTray/rightTray.component';
import Left_tray_recipe_edit from './leftTray/left_tray_recipe_edit.component';
import Center_Elements from './recipe_elements/centerElements.component';
import IngredientList from './recipe_elements/ingredientList/ingredientList&Howto.component';
import Image from 'next/image';
import FooterRecipeFilter from '../../footer/footerRecipeFilter.component';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import imageUploadS3 from '../../utility/imageUploadS3';
import { BLEND_CATEGORY } from '../../../gqlLib/recipes/queries/getEditRecipe';
import { useLazyQuery } from '@apollo/client';
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX from '../../../gqlLib/recipes/queries/getBlendNutritionBasedOnRecipeXxx';
import RightTrayComponents from '../../rightTray/rightTray.component';

const AddRecipePage = () => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [uploadUrl, setUploadUrl] = useState([]);
  const [blendCategory, setblendCategory] = useState([]);
  const [selectedBlendValueState, setSelectedBlendValueState] = useState(null);
  const [editRecipeHeading, setEditRecipeHeading] = useState('');
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [calculateIngOz, SetcalculateIngOz] = useState(null);
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setSingleElement] = useState(false);
  const [counter, setCounter] = useState(1);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const [
    getBlendNutritionBasedOnRecipe,
    { loading: nutritionDataLoading, data: nutritionData },
  ] = useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX);

  const [
    getAllCategories,
    { loading: blendCategoriesInProgress, data: blendCategoriesData },
  ] = useLazyQuery(BLEND_CATEGORY, {
    fetchPolicy: 'network-only',
  });

  // center

  const adjusterFunc = (value) => {
    if (value < 1) {
      setCounter(1);
    } else {
      setCounter(value);
    }
  };

  // sumbit data for add recipe

  const handleSubmitData = async () => {
    dispatch(setLoading(true));
    let res: any;
    try {
      if (images?.length) {
        res = await imageUploadS3(images);
        setUploadUrl(res);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
    if (res) {
      return res;
    } else console.log({ res: 'something went wrong in image uploading' });
  };

  const fetchAllBlendCategories = async () => {
    await getAllCategories();
    setblendCategory(blendCategoriesData?.getAllCategories);
  };

  useEffect(() => {
    setSelectedBlendValueState(blendCategory[0]?.name?.toLowerCase());
  }, [blendCategoriesData]);

  // useEffect(() => {
  //   setEditRecipeHeading(recipeData?.name);
  // }, [recipeData]);

  useEffect(() => {
    if (!blendCategoriesInProgress) {
      fetchAllBlendCategories();
    }
  }, [blendCategoriesInProgress]);

  useEffect(() => {
    if (nutritionState?._id) {
      let value = nutritionState?.portions?.find(
        (item) => item.default,
      )?.meausermentWeight;
      if (value) {
        getBlendNutritionBasedOnRecipe({
          variables: {
            ingredientsInfo: [
              {
                ingredientId: nutritionState?._id,
                value: parseFloat(value),
              },
            ],
          },
        });
      }
    } else {
      let ingArr = [];
      let ozArr = 0;
      selectedIngredientsList?.forEach((item) => {
        let value = item?.portions?.find(
          (item) => item.default,
        )?.meausermentWeight;
        ozArr += value && parseInt(value);
        if (value) {
          ingArr?.push({
            ingredientId: item?._id,
            value: parseFloat(value),
          });
        }
      });
      SetcalculateIngOz(Math?.round(ozArr * 0.033814));
      getBlendNutritionBasedOnRecipe({
        variables: {
          ingredientsInfo: ingArr,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIngredientsList, nutritionState]);

  //left panel

  const handleIngredientClick = (ingredient: any, present: boolean) => {
    if (!present) {
      setSelectedIngredientsList((pre) => [...pre, ingredient]);
    } else {
      setSelectedIngredientsList((pre) => [
        //@ts-ignore
        ...pre?.filter((blen) => blen?._id !== ingredient?._id),
      ]);
    }
  };

  const checkActive = (id: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      //@ts-ignore
      if (blen?._id === id) {
        present = true;
      }
    });
    return present;
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <AContainer>
      <div className={styles.main}>
        <div
          className={styles.left}
          style={leftTrayVisibleState ? { marginLeft: '0px' } : {}}
        >
          <div
            className={styles.left__Drag__lightGreen}
            style={
              leftTrayVisibleState
                ? {
                    backgroundImage: `url("/icons/ingr-green.svg")`,
                    backgroundSize: 'contain',
                  }
                : {
                    backgroundImage: `url("/icons/ingr-white.svg")`,
                    backgroundSize: 'contain',
                  }
            }
            onClick={() => setLeftTrayVisibleState(!leftTrayVisibleState)}
          />
          <div className={styles.left__title}>
            <div className={styles.left__title__bagicon}>
              <Image
                src={'/icons/basket.svg'}
                alt="Picture will load soon"
                height={'100%'}
                width={'100%'}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            Ingredient List
          </div>
          <div className={styles.left__ingredientlistTray}>
            <Left_tray_recipe_edit
              handleIngredientClick={handleIngredientClick}
              checkActive={checkActive}
            />
          </div>
        </div>
        <div className={styles.center}>
          <Center_header />
          <Center_Elements
            blendCategoryList={blendCategory}
            setDropDownState={setSelectedBlendValueState}
            selectedBlendValueState={selectedBlendValueState}
            setImages={setImages}
            setEditRecipeHeading={setEditRecipeHeading}
          />
          <IngredientList
            blendCategory={blendCategory}
            selectedBlendValueState={selectedBlendValueState}
            handleSubmitData={handleSubmitData}
            uploadedImagesUrl={uploadUrl}
            editRecipeHeading={editRecipeHeading}
            adjusterFunc={adjusterFunc}
            counter={counter}
            calculatedIngOz={calculateIngOz}
            selectedIngredientsList={selectedIngredientsList}
            setSelectedIngredientsList={setSelectedIngredientsList}
            setSingleElement={setSingleElement}
            singleElement={singleElement}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
          />
        </div>
        <div className={styles.right__main}>
          <RightTrayComponents
            counter={counter}
            nutritionTrayData={
              nutritionData &&
              JSON?.parse(nutritionData?.getBlendNutritionBasedOnRecipexxx)
            }
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            isComeFormRecipePage={true}
            calculatedIngOz={calculateIngOz}
            nutritionDataLoading={nutritionDataLoading}
          />
        </div>
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};
export default AddRecipePage;
