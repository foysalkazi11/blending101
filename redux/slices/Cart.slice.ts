import { createSlice } from "@reduxjs/toolkit";

type Grocery = {
  ingredientId: { _id: string; ingredientName: string; featuredImage: string };
  selectedPortion: string;
  quantity: number;
};

interface CartState {
  groceries: Grocery[];
  pantries: Grocery[];
  staples: Grocery[];
}

const initialState: CartState = {
  groceries: [],
  pantries: [],
  staples: [],
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addGroceries: (state, action) => {
      state.groceries = action.payload || [];
    },
    addGrocery: (state, action: { payload: Grocery }) => {
      state.groceries.push(action.payload);
    },
    addPantries: (state, action) => {
      state.pantries = action.payload || [];
    },
    addPantry: (state, action: { payload: Grocery }) => {
      state.pantries.push(action.payload);
    },
    addStaples: (state, action) => {
      state.staples = action.payload || [];
    },
    addStaple: (state, action: { payload: Grocery }) => {
      state.staples.push(action.payload);
    },
    deleteCartIngredients: (
      state,
      action: { payload: { type: keyof CartState; ids: string[] } },
    ) => {
      const type = action.payload.type;
      const ids = action.payload.ids;
      state[type] = state[type].filter(
        (item) => !ids.includes(item.ingredientId._id),
      );
    },
  },
});

export const {
  addGroceries,
  addGrocery,
  addPantries,
  addPantry,
  addStaples,
  addStaple,
  deleteCartIngredients,
} = CartSlice.actions;

export default CartSlice.reducer;
