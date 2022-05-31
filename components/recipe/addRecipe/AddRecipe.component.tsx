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
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setLoading } from '../../../redux/slices/utilitySlice';
import imageUploadS3 from '../../utility/imageUploadS3';
import { BLEND_CATEGORY } from '../../../gqlLib/recipes/queries/getEditRecipe';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX from '../../../gqlLib/recipes/queries/getBlendNutritionBasedOnRecipeXxx';
import RightTrayComponents from '../../rightTray/rightTray.component';
import CREATE_A_RECIPE_BY_USER from '../../../gqlLib/recipes/mutations/createARecipeByUser';
import notification from '../../utility/reactToastifyNotification';
import { useRouter } from 'next/router';

const AddRecipePage = () => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [selectedBlendValueState, setSelectedBlendValueState] = useState(
    '61cafc34e1f3e015e7936587',
  );
  const [editRecipeHeading, setEditRecipeHeading] = useState('');
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [calculateIngOz, SetcalculateIngOz] = useState(null);
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setSingleElement] = useState(false);
  const [counter, setCounter] = useState(1);
  const [howToState, setHowToSteps] = useState([]);
  const [recipeDescription, setRecipeDescription] = useState('');
  const [createNewRecipeByUser] = useMutation(CREATE_A_RECIPE_BY_USER);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const { dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();

  const [
    getBlendNutritionBasedOnRecipe,
    { loading: nutritionDataLoading, data: nutritionData },
  ] = useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX);

  const { loading: blendCategoriesInProgress, data: blendCategoriesData } =
    useQuery(BLEND_CATEGORY);

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
    if (editRecipeHeading && selectedIngredientsList?.length) {
      dispatch(setLoading(true));
      let ingArr = [];
      selectedIngredientsList?.forEach((item) => {
        let value = item?.portions?.find((item) => item.default);
        if (value) {
          ingArr?.push({
            ingredientId: item?._id,
            selectedPortionName: value?.measurement,
            weightInGram: Number(value?.meausermentWeight),
          });
        }
      });

      let obj = {
        userId: dbUser?._id,
        name: editRecipeHeading,
        description: recipeDescription,
        recipeBlendCategory: selectedBlendValueState,
        ingredients: ingArr,
        servingSize: calculateIngOz,
        servings: counter,
        recipeInstructions: howToState?.map((item) => `${item?.step}`),
      };

      try {
        if (images?.length) {
          const imageArr = await imageUploadS3(images);

          obj = {
            ...obj,
            //@ts-ignore
            image: imageArr?.map((img, index) =>
              index === 0
                ? { image: img, default: true }
                : { image: img, default: false },
            ),
          };

          const { data } = await createNewRecipeByUser({
            variables: {
              data: obj,
            },
          });
          dispatch(setLoading(false));
          notification('success', 'recipe create successfully');
          if (data?.addRecipeFromUser?._id) {
            router?.push(`/recipe_details/${data?.addRecipeFromUser?._id}`);
          }
        } else {
          const { data } = await createNewRecipeByUser({
            variables: {
              data: obj,
            },
          });
          dispatch(setLoading(false));
          notification('success', 'recipe create successfully');
          if (data?.addRecipeFromUser?._id) {
            router?.push(`/recipe_details/${data?.addRecipeFromUser?._id}`);
          }
        }
      } catch (error) {
        dispatch(setLoading(false));
        notification('error', error?.message || 'Something went wrong');
      }
    } else {
      notification(
        'warning',
        "You can't save recipe without name and ingredients",
      );
    }
  };

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
          <Center_header handleSaveRecipe={handleSubmitData} />
          <Center_Elements
            blendCategoryList={
              blendCategoriesData?.getAllCategories
                ? blendCategoriesData?.getAllCategories
                : []
            }
            setDropDownState={setSelectedBlendValueState}
            selectedBlendValueState={selectedBlendValueState}
            setImages={setImages}
            setEditRecipeHeading={setEditRecipeHeading}
            recipeDescription={recipeDescription}
            setRecipeDescription={setRecipeDescription}
            recipeTitle={editRecipeHeading}
          />
          <IngredientList
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
            howToState={howToState}
            setHowToSteps={setHowToSteps}
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
