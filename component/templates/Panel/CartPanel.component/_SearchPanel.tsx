import Image from "next/image";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import {
  SEARCH_INGREDIENTS_FOR_GROCERY,
  ADD_GROCERY_ITEM,
  ADD_PANTRY_ITEM,
  EDIT_CART_ITEM,
} from "../../../../graphql/GroceryPantry";
import Publish from "../../../../helpers/Publish";
import useHideOnClickOutside from "../../../../hooks/useHideOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addGrocery,
  addStaple,
  addPantry,
  editCartIngredients,
} from "../../../../redux/slices/Cart.slice";
import ButtonComponent from "../../../../theme/button/button.component";
import IconButton from "../../../atoms/Button/IconButton.component";
import Checkbox from "../../../organisms/Forms/Checkbox.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import Textfield from "../../../organisms/Forms/Textfield.component";

import styles from "./Panel.module.scss";

export const defaultGrocery = {
  ammount: "",
  units: "",
};

interface SearchPanelProps {
  isEditMode: boolean;
  methods: any;
  toggle: 1 | 2;
  openState: [boolean, any];
  modeState: ["query" | "quantity", any];
  selectedIngredientState: [any, any];
}

const SearchPanel = (props: SearchPanelProps) => {
  const {
    toggle,
    openState,
    modeState,
    methods,
    isEditMode,
    selectedIngredientState,
  } = props;

  const [open, setOpen] = openState;
  const [mode, setMode] = modeState;
  const [selectedIngredient, setSelectedIngredient] = selectedIngredientState;

  const [isStaple, setIsStaple] = useState(false);

  const hideOutsideClick = useHideOnClickOutside(() => open && setOpen(false));

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.dbUser);

  const [searchIngredient, { loading: searching, data: filteredIngredints }] =
    useLazyQuery(SEARCH_INGREDIENTS_FOR_GROCERY);
  const [addGroceryList, groceryState] = useMutation(ADD_GROCERY_ITEM);
  const [addPantryList, pantryState] = useMutation(ADD_PANTRY_ITEM);
  const [editCartItem, editState] = useMutation(EDIT_CART_ITEM);

  const searchHandler = (e) => {
    if (e.target.value) {
      searchIngredient({ variables: { query: e.target.value } });
      setOpen(true);
    }
  };

  const ingredientHandler = (item) => {
    setMode("quantity");
    setSelectedIngredient(item);
  };

  const onAdd = async (data) => {
    const variables: any = {
      data: {
        memberId: userId._id,
        ingredients: [
          {
            ingredientId: selectedIngredient._id,
            selectedPortion: data.units,
            quantity: parseFloat(data.ammount),
          },
        ],
      },
    };

    if (toggle === 2) variables.data.isStaple = isStaple;

    await Publish({
      mutate: toggle === 1 ? addGroceryList : addPantryList,
      variables,
      state: toggle === 1 ? groceryState : pantryState,
      success: `Added ${toggle === 1 ? "Grocery" : "Pantry"} Successfully`,
      onSuccess: () => {
        setOpen(false);
        setMode("quantity");

        if (toggle === 1) {
          dispatch(
            addGrocery({
              ingredientId: {
                _id: selectedIngredient._id,
                ingredientName: selectedIngredient.ingredientName,
                featuredImage: selectedIngredient.featuredImage,
              },
              quantity: data.ammount,
              selectedPortion: data.units,
            }),
          );
        } else if (toggle === 2) {
          if (isStaple) {
            dispatch(
              addStaple({
                ingredientId: {
                  _id: selectedIngredient._id,
                  ingredientName: selectedIngredient.ingredientName,
                  featuredImage: selectedIngredient.featuredImage,
                },
                quantity: data.ammount,
                selectedPortion: data.units,
              }),
            );
          } else {
            dispatch(
              addPantry({
                ingredientId: {
                  _id: selectedIngredient._id,
                  ingredientName: selectedIngredient.ingredientName,
                  featuredImage: selectedIngredient.featuredImage,
                },
                quantity: data.ammount,
                selectedPortion: data.units,
              }),
            );
          }
        }
        methods.reset(defaultGrocery);
        setSelectedIngredient({});
      },
    });
  };

  const onEdit = async (data) => {
    const listType = toggle === 1 ? "Grocery" : "Pantry";
    const ingredient = {
      ingredientId: selectedIngredient?.id,
      selectedPortion: data.units,
      quantity: parseFloat(data.ammount),
    };
    await Publish({
      mutate: editCartItem,
      variables: {
        memberId: userId._id,
        list: listType,
        ingredient,
      },
      state: editState,
      success: `Edited ${listType} Successfully`,
      onSuccess: () => {
        setOpen(false);
        setMode("search");

        dispatch(editCartIngredients({ listType, ingredient }));

        // if (toggle === 1) {
        //   dispatch(
        //     addGrocery({
        //       ingredientId: {
        //         _id: selectedIngredient._id,
        //         ingredientName: selectedIngredient.ingredientName,
        //         featuredImage: selectedIngredient.featuredImage,
        //       },
        //       quantity: data.ammount,
        //       selectedPortion: data.units,
        //     }),
        //   );
        // } else if (toggle === 2) {
        //   if (isStaple) {
        //     dispatch(
        //       addStaple({
        //         ingredientId: {
        //           _id: selectedIngredient._id,
        //           ingredientName: selectedIngredient.ingredientName,
        //           featuredImage: selectedIngredient.featuredImage,
        //         },
        //         quantity: data.ammount,
        //         selectedPortion: data.units,
        //       }),
        //     );
        //   } else {
        //     dispatch(
        //       addPantry({
        //         ingredientId: {
        //           _id: selectedIngredient._id,
        //           ingredientName: selectedIngredient.ingredientName,
        //           featuredImage: selectedIngredient.featuredImage,
        //         },
        //         quantity: data.ammount,
        //         selectedPortion: data.units,
        //       }),
        //     );
        //   }
        // }
        methods.reset(defaultGrocery);
        setSelectedIngredient({});
      },
    });
  };

  const onSubmit = async (data) => {
    if (isEditMode) {
      await onEdit(data);
    } else {
      await onAdd(data);
    }
  };

  const portionOptions = useMemo(
    () =>
      selectedIngredient.hasOwnProperty("portions")
        ? selectedIngredient.portions.map((portion) => ({
            value: portion.measurement,
            label: portion.measurement,
            selected: portion.default,
          }))
        : [],
    [selectedIngredient],
  );

  return (
    <div className={styles.search} ref={hideOutsideClick}>
      <div className={styles.search__box}>
        <Textfield
          placeholder="Enter a Ingredient"
          className={`${styles.search__input} ${
            open ? styles["search__input--active"] : ""
          }`}
          onChange={searchHandler}
        />
      </div>
      {open && (
        <div
          className={styles.search__panel}
          style={{ overflow: mode === "quantity" ? "hidden" : "auto" }}
        >
          {mode === "query" && (
            <ul className={styles.search__list}>
              {filteredIngredints?.searchBlendIngredientsForGrocery.map(
                (item) => (
                  <li
                    key={item.ingredientName}
                    onClick={() => ingredientHandler(item)}
                  >
                    <Image
                      src={item.featuredImage || "/food/Dandelion.png"}
                      alt={item.ingredientName}
                      layout="fixed"
                      height={25}
                      width={25}
                    />
                    <span className="ml-10">{item.ingredientName}</span>
                  </li>
                ),
              )}
            </ul>
          )}
          {mode === "quantity" && (
            <div className={styles.search__details}>
              <div className="row">
                <div className="col-10">
                  <div className="flex ai-center mb-10">
                    <Image
                      src={
                        selectedIngredient.featuredImage ||
                        "/food/Dandelion.png"
                      }
                      alt="Dandelion"
                      layout="fixed"
                      height={25}
                      width={25}
                    />
                    <span className="ml-10">
                      {selectedIngredient.ingredientName}
                    </span>
                  </div>
                </div>
                <div className="col-2">
                  <IconButton
                    variant="white"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                      setMode("quantity");
                      setSelectedIngredient({});
                    }}
                  >
                    <FaChevronLeft />
                  </IconButton>
                </div>
              </div>
              {toggle === 2 && (
                <div className="row">
                  <div className="col-12">
                    <Checkbox
                      label="Add to Staples"
                      defaultChecked={isStaple}
                      onChange={(e) => {
                        setIsStaple(e.target.checked);
                      }}
                    />
                  </div>
                </div>
              )}
              <FormProvider {...methods}>
                <div className="row ai-center">
                  <div className="col-8">
                    <Textfield
                      placeholder="Ammount"
                      name="ammount"
                      disabled={isStaple}
                    />
                  </div>
                  <div className="col-4 ta-center">Quantity</div>
                </div>
                <div className="row ai-center">
                  <div className="col-8">
                    <Combobox
                      options={portionOptions}
                      name="units"
                      disabled={isStaple}
                    />
                  </div>
                  <div className="col-4 ta-center">Units</div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ButtonComponent
                      value="Save"
                      type="primary"
                      style={{ height: "45px", margin: " 0rem auto .5rem" }}
                      // fullWidth={undefined}
                      width={150}
                      onClick={methods.handleSubmit(onSubmit)}
                    />
                  </div>
                </div>
              </FormProvider>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
