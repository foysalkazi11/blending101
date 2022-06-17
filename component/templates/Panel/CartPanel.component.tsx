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
import IconButton from "../../atoms/Button/IconButton.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import ToggleMenu from "../../organisms/Tabmenu/ToggleMenu.component";
// import GroceryComponent from "./grocery/Grocery.component";
import styles from "./CartPanel.module.scss";
import ButtonComponent from "../../../theme/button/button.component";
import Combobox from "../../organisms/Forms/Combobox.component";
import Checkbox from "../../organisms/Forms/Checkbox.component";
import useHideOnClickOutside from "../../../hooks/useHideOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { FormProvider, useForm } from "react-hook-form";
import Publish from "../../../helpers/Publish";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADD_GROCERY_ITEM,
  ADD_PANTRY_ITEM,
  ADD_STAPLE_ITEM,
  DELETE_CART_ITEM,
  GET_CART_DATA,
  SEARCH_INGREDIENTS_FOR_GROCERY,
} from "../../../graphql/GroceryPantry";
import {
  addGroceries,
  addGrocery,
  addPantries,
  addPantry,
  addStaple,
  addStaples,
  deleteCartIngredients,
} from "../../../redux/slices/Cart.slice";

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
  const [toggle, setToggle] = useState(1);
  const [checkedGroceries, setCheckedGroceries] = useState<string[]>([]);
  const [checkedPantries, setCheckedPantries] = useState<string[]>([]);

  console.log({ checkedGroceries, checkedPantries });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.dbUser);
  const { groceries, pantries, staples } = useAppSelector(
    (state) => state.cart,
  );

  const { data, loading, error } = useQuery(GET_CART_DATA, {
    variables: { userId: userId._id },
  });
  const [deleteCartItem, deleteState] = useMutation(DELETE_CART_ITEM);

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

  const deleteItems = async (ids: string[], isStaples?: boolean) => {
    const listType = isStaples ? "" : toggle === 1 ? "Grocery" : "Pantry";
    await Publish({
      mutate: deleteCartItem,
      variables: {
        userId: userId._id,
        ingredients: ids,
        listType,
      },
      state: deleteState,
      success: `Deleted ${toggle === 1 ? "Grocery" : "Pantry"} Successfully`,
      onSuccess: () => {
        dispatch(
          deleteCartIngredients({
            ids,
            type: isStaples
              ? "staples"
              : toggle === 1
              ? "groceries"
              : "pantries",
          }),
        );
      },
    });
  };

  const selectHandler = (
    type: "Grocery" | "Pantry",
    id: string,
    checked: boolean,
  ) => {
    if (type === "Grocery") {
      if (!checked)
        setCheckedGroceries(checkedGroceries.filter((item) => item !== id));
      else setCheckedGroceries([...checkedGroceries, id]);
    } else {
      if (!checked)
        setCheckedPantries(checkedPantries.filter((item) => item !== id));
      else setCheckedPantries([...checkedPantries, id]);
    }
  };

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
      <SearchPanel toggle={toggle} />
      <div className={styles.ingredients}>
        <div className={styles.ingredients__header}>
          <h2>Ingredients</h2>
          <h2>Servings</h2>
        </div>
        <ul>
          {items?.map((item, i) => (
            <li
              className={styles.ingredients__item}
              key={item.ingredientId._id}
            >
              <div className={styles.ingredients__content}>
                <Checkbox
                  checked={
                    toggle === 1
                      ? checkedGroceries.includes(item.ingredientId._id)
                      : checkedPantries.includes(item.ingredientId._id)
                  }
                  onChange={(e) =>
                    selectHandler(
                      toggle === 1 ? "Grocery" : "Pantry",
                      item.ingredientId._id,
                      e.target.checked,
                    )
                  }
                />
                <div className={styles.ingredients__image}>
                  <figure className="mr-10">
                    <img
                      src={
                        item.ingredientId.featuredImage || "/food/frozen.png"
                      }
                      alt="img"
                    />
                  </figure>
                </div>

                <div>
                  <div className={styles.ingredients__title}>
                    <div className="blending-item-title flex ai-center jc-between">
                      <p>{item.ingredientId.ingredientName}</p>
                    </div>
                  </div>
                  <p className={styles.ingredients__quantity}>
                    {item.quantity} {item.selectedPortion}
                  </p>
                </div>
              </div>
              <div className="flex ai-center">
                <IconButton
                  size="small"
                  variant="secondary"
                  style={{ marginRight: 5 }}
                >
                  <FaPen />
                </IconButton>
                <IconButton
                  size="small"
                  variant="primary"
                  onClick={() => deleteItems([item.ingredientId._id])}
                >
                  <FaRegTrashAlt />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {toggle === 2 && (
        <div className={styles.staples}>
          <h2 className={styles.staples__header}>Staples</h2>
          <ul className={styles.staples__list}>
            {Array.isArray(staples) &&
              staples?.map((staple) => (
                <li key={staple.ingredientId._id}>
                  <div className="flex ai-center jc-between">
                    <h4>{staple.ingredientId.ingredientName}</h4>
                    <div className="flex ai-center">
                      <IconButton
                        size="small"
                        variant="secondary"
                        style={{ marginRight: 5 }}
                      >
                        <FaPen />
                      </IconButton>
                      <IconButton
                        size="small"
                        variant="primary"
                        onClick={() =>
                          deleteItems([staple.ingredientId._id], true)
                        }
                      >
                        <FaRegTrashAlt />
                      </IconButton>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const defaultGrocery = {
  measurement: "",
  meausermentWeight: "",
};

const SearchPanel = ({ toggle }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"query" | "quantity">("query");
  const [query, setQuery] = useState("");
  const [isStaple, setIsStaple] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<any>({});

  const hideOutsideClick = useHideOnClickOutside(() => open && setOpen(false));

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.dbUser);
  const ingredients = useAppSelector(
    (state) => state.ingredients.allIngredients,
  );

  const methods = useForm({
    defaultValues: useMemo(() => defaultGrocery, []),
  });

  const [searchIngredient, { loading: searching, data: filteredIngredints }] =
    useLazyQuery(SEARCH_INGREDIENTS_FOR_GROCERY);
  const [addGroceryList, groceryState] = useMutation(ADD_GROCERY_ITEM);
  const [addPantryList, pantryState] = useMutation(ADD_PANTRY_ITEM);
  const [addStapleList, stapleState] = useMutation(ADD_STAPLE_ITEM);

  const searchHandler = (e) => {
    if (e.target.value) {
      searchIngredient({ variables: { query: e.target.value } });
      setOpen(true);
      setQuery(e.target.value);
    }
  };

  const ingredientHandler = (item) => {
    setMode("quantity");
    setSelectedIngredient(item);
  };

  // const filteredIngredints = useMemo(
  //   () =>
  //     query === ""
  //       ? ingredients
  //       : ingredients.filter((item) =>
  //           item.ingredientName.toLowerCase().startsWith(query.toLowerCase()),
  //         ),
  //   [ingredients, query],
  // );

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

  const onSubmit = async (data) => {
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

  // const data = filteredIngredints?.searchBlendIngredientsForGrocery || [];
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
        {/* <div className={styles.search__icon}>
          <IconButton
            size="small"
            variant="secondary"
            className="ml-10"
            onClick={() => {
              setOpen(true);
              setMode("query");
              methods.reset(defaultGrocery);
            }}
          >
            <FaPlus />
          </IconButton>
        </div> */}
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
                      setMode("query");
                      methods.reset(defaultGrocery);
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

const ShoppingPanel = () => {
  const [toggle, setToggle] = useState(1);
  return <div>Coming Soon... </div>;
};

export default CartPanel;
function GET_GROCERY_ITEMS(GET_GROCERY_ITEMS: any): {
  loading: any;
  error: any;
  data: any;
} {
  throw new Error("Function not implemented.");
}
