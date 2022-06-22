import React, { useRef, useEffect, useState, Fragment, useMemo } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaEdit,
  FaEllipsisH,
  FaPen,
  FaPlus,
  FaRegTrashAlt,
} from "react-icons/fa";
import IconButton from "../../../atoms/Button/IconButton.component";
import Textfield from "../../../organisms/Forms/Textfield.component";
import ToggleMenu from "../../../organisms/Tabmenu/ToggleMenu.component";
// import GroceryComponent from "./grocery/Grocery.component";
import styles from "./Panel.module.scss";
import Combobox from "../../../organisms/Forms/Combobox.component";
import Checkbox from "../../../organisms/Forms/Checkbox.component";
import useHideOnClickOutside from "../../../../hooks/useHideOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { FormProvider, useForm } from "react-hook-form";
import Publish from "../../../../helpers/Publish";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADD_GROCERY_ITEM,
  ADD_PANTRY_ITEM,
  DELETE_CART_ITEM,
  GET_CART_DATA,
  SEARCH_INGREDIENTS_FOR_GROCERY,
} from "../../../../graphql/GroceryPantry";
import {
  addGroceries,
  addGrocery,
  addPantries,
  addPantry,
  addStaple,
  addStaples,
  deleteCartIngredients,
} from "../../../../redux/slices/Cart.slice";
import SearchPanel, { defaultGrocery } from "./_SearchPanel";
import ItemList from "./_ItemList";

function CartPanel(props) {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(1);

  const ref = useRef<any>();

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;
    if (open) {
      elem.style.right = "0";
    } else {
      elem.style.right = "-325px";
    }
  }, [open]);

  const handleClick = () => {
    setOpen(() => !open);
  };

  return (
    <div className={styles.tray} ref={ref}>
      {open ? (
        <div className={styles.image} onClick={handleClick}>
          <img src="/icons/cart__sidebar__orange.png" alt="drawer__orange" />
        </div>
      ) : (
        <div
          className={styles.image + " " + styles.image__white}
          onClick={handleClick}
        >
          <img src="/icons/cart__sidebar.svg" alt="drawer" />
        </div>
      )}
      <div>
        <div>
          <ToggleMenu
            toggleState={[toggle, setToggle]}
            menu={[
              { label: "Grocery", icon: "cart__tray" },
              { label: "Shopping", icon: "cart__tray" },
            ]}
          />
          {toggle === 1 && <GroceryPanel />}
          {toggle === 2 && <ShoppingPanel />}
        </div>
      </div>
    </div>
  );
}

const GroceryPanel = () => {
  const [toggle, setToggle] = useState<1 | 2>(1);
  const [checkedGroceries, setCheckedGroceries] = useState<string[]>([]);
  const [checkedPantries, setCheckedPantries] = useState<string[]>([]);
  const [checkedStaples, setCheckedStaples] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"query" | "quantity">("query");
  const [isStaple, setIsStaple] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<any>({});

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.dbUser);
  const { groceries, pantries, staples } = useAppSelector(
    (state) => state.cart,
  );

  const methods = useForm({
    defaultValues: useMemo(() => defaultGrocery, []),
  });

  const { data, loading, error } = useQuery(GET_CART_DATA, {
    variables: { userId: userId._id },
  });
  const [deleteCartItem, deleteState] = useMutation(DELETE_CART_ITEM);

  const deleteItems = async (ids: string[], isStaples?: boolean) => {
    const variables = {
      userId: userId._id,
      groceries: checkedGroceries,
      pantries: checkedPantries,
      staples: checkedStaples,
    };
    await Publish({
      mutate: deleteCartItem,
      variables: variables,
      state: deleteState,
      success: `Deleted ${toggle === 1 ? "Grocery" : "Pantry"} Successfully`,
      onSuccess: () => {
        dispatch(
          deleteCartIngredients({
            ingredients: variables,
          }),
        );
      },
    });
  };

  const openEditPanel = (item, isStaple) => {
    methods.reset({
      ammount: item.quantity,
      units: item.selectedPortion,
    });

    setOpen(true);
    setMode("quantity");

    const ingredient = {
      id: item?.ingredientId?._id,
      ingredientName: item?.ingredientId?.ingredientName,
      featuredImage: item?.ingredientId?.featuredImage,
      portions: item?.ingredientId?.portions || [],
    };
    setSelectedIngredient(ingredient);
    setIsEditMode(true);
    if (isStaple) {
      setIsStaple(true);
    } else {
      setIsStaple(false);
    }
  };

  useMemo(() => {
    if (data?.getMyGroceryList) {
      dispatch(addGroceries(data?.getMyGroceryList));
    }
    if (data?.getPantryList) {
      dispatch(addPantries(data?.getPantryList));
    }
    if (data?.getStapleList) {
      dispatch(addStaples(data?.getStapleList));
    }
  }, [data, dispatch]);

  const items = useMemo(
    () =>
      toggle === 1
        ? Array.isArray(groceries)
          ? groceries
          : []
        : Array.isArray(pantries)
        ? pantries
        : [],
    [groceries, pantries, toggle],
  );

  const hasBatchDelete =
    toggle === 1 ? checkedGroceries.length > 0 : checkedPantries.length > 0;

  return (
    <Fragment>
      <div className="flex jc-between ai-center">
        <ToggleMenu
          toggleState={[toggle, setToggle]}
          width="8rem"
          menu={[{ icon: "cart__tray" }, { icon: "cart__tray" }]}
        />
        <div className="text-green" style={{ transform: "translateX(-7.5px)" }}>
          {toggle === 1 ? "List" : "Pantry"}
        </div>
        <div>
          <IconButton
            size="medium"
            variant={hasBatchDelete ? "primary" : "disabled"}
            onClick={() =>
              deleteItems(toggle === 1 ? checkedGroceries : checkedPantries)
            }
          >
            <FaRegTrashAlt />
          </IconButton>
        </div>
      </div>
      <SearchPanel
        methods={methods}
        toggle={toggle}
        isEditModeState={[isEditMode, setIsEditMode]}
        isStapleState={[isStaple, setIsStaple]}
        openState={[open, setOpen]}
        modeState={[mode, setMode]}
        selectedIngredientState={[selectedIngredient, setSelectedIngredient]}
      />
      <div className={styles.ingredients}>
        <div className={styles.ingredients__header}>
          <h2>Ingredients</h2>
          <h2>Servings</h2>
        </div>
        <ItemList
          items={items}
          toggle={toggle}
          checkedGroceriesState={[checkedGroceries, setCheckedGroceries]}
          checkedPantriesState={[checkedPantries, setCheckedPantries]}
          checkedStaplesState={[checkedStaples, setCheckedStaples]}
          openEditPanel={openEditPanel}
          deleteItems={deleteItems}
        />
      </div>
      {toggle === 2 && (
        <div className={styles.staples}>
          <h2 className={styles.staples__header}>Staples</h2>
          <ItemList
            isStaples
            toggle={toggle}
            items={Array.isArray(staples) ? staples : []}
            checkedGroceriesState={[checkedGroceries, setCheckedGroceries]}
            checkedPantriesState={[checkedPantries, setCheckedPantries]}
            checkedStaplesState={[checkedStaples, setCheckedStaples]}
            openEditPanel={openEditPanel}
            deleteItems={deleteItems}
          />
        </div>
      )}
    </Fragment>
  );
};

const ShoppingPanel = () => {
  const [toggle, setToggle] = useState(1);
  return <div>Coming Soon... </div>;
};

export default CartPanel;
