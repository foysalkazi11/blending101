import { createSlice } from "@reduxjs/toolkit";

type FilterProps = {
  pageTitle: string;
  expandedMenu: string;
  activeTab: string;
  values: string[];
  isMultiprops?: boolean;
  prefix?: string;
  postfix?: string;
  range?: [number, number];
  value?: number;
};

interface FilterState {
  isActive: boolean;
  filters: FilterProps[];
  activeState: FilterProps;
}

const initialState: FilterState = {
  isActive: true,
  filters: [],
  activeState: {
    pageTitle: "",
    expandedMenu: "",
    activeTab: "",
    values: [],
  },
};

export const filterRecipeSlice = createSlice({
  name: "filterRecipe",
  initialState,
  reducers: {
    showFilterPanel: (state) => {
      state.isActive = true;
    },
    hideFilterPanel: (state) => {
      state.isActive = false;
    },
    activeFilter: (
      state,
      action: {
        payload: {
          pageTitle: string;
          expandedMenu: string;
        };
      }
    ) => {
      state.activeState.pageTitle = action.payload.pageTitle;
      state.activeState.expandedMenu = action.payload.expandedMenu;

      const filterProps = state.filters.find(
        (filter) => filter.pageTitle === action.payload.pageTitle
      );

      state.activeState.values = filterProps ? filterProps.values : [];
      state.activeState.activeTab = filterProps ? filterProps.activeTab : "";
      state.activeState.value = filterProps ? filterProps.value : 0;
      state.activeState.range = filterProps ? filterProps.range : [0, 0];
    },
    resetFilterPage: (state) => {
      state.activeState.pageTitle = "";
      state.activeState.activeTab = "";
      state.activeState.values = [];
    },
    modifyFilter: (state, action: { payload: FilterProps }) => {
      // Checking if the filter already exists in the filters array
      const filterIndex = state.filters.findIndex(
        (filter) => filter.pageTitle === action.payload.pageTitle
      );

      // If the filter doesnt exist we create a new filter
      if (filterIndex === -1) state.filters.push(action.payload);
      // If the filter exist we modify that filter
      else {
        // If the filters value is null then removing the whole filter value.
        if (action.payload.values.length === 0) {
          state.filters.splice(filterIndex, 1);
          // To prevent filters of being null
          if (state.filters.length === 0) {
            state.filters = [];
          }
        } else state.filters[filterIndex] = action.payload;
      }

      // Modifying the active state values as well to make the active filter and the array filter become consistent
      state.activeState.values = action.payload.values;
    },
    resetFilterValue: (state, action: { payload: { pageTitle: string } }) => {
      const filterIndex = state.filters.findIndex(
        (filter) => filter.pageTitle === action.payload.pageTitle
      );
      if (filterIndex !== -1) {
        state.filters.splice(filterIndex, 1);
        // To prevent filters of being null
        if (state.filters.length === 0) {
          state.filters = [];
        }
        // Resetting the active state as well
        state.activeState.values = [];
        state.activeState.value = 0;
        state.activeState.range = [0, 0];
      }
    },
    deleteFilterValue: (
      state,
      action: { payload: { pageTitle: string; value: string } }
    ) => {
      const filterIndex = state.filters.findIndex(
        (filter) => filter.pageTitle === action.payload.pageTitle
      );
      if (filterIndex !== -1) {
        state.filters[filterIndex].values = state.filters[
          filterIndex
        ].values.filter((value) => value !== action.payload.value);

        const filterProps = state.filters.find(
          (filter) => filter.pageTitle === action.payload.pageTitle
        );

        state.activeState.values = filterProps ? filterProps.values : [];

        // If the filters value is null then removing the whole filter value.
        if (state.filters[filterIndex].values.length === 0)
          state.filters.splice(filterIndex, 1);
      }
    },
    showFilterPanelWithProps: (state, action: { payload: FilterProps }) => {
      state.isActive = false;
      // if (!state.isActive)
      state.activeState = action.payload;
      state.isActive = true;
    },
  },
});

export const {
  showFilterPanel,
  hideFilterPanel,
  activeFilter,
  resetFilterPage,
  modifyFilter,
  resetFilterValue,
  deleteFilterValue,
  showFilterPanelWithProps,
} = filterRecipeSlice.actions;

export default filterRecipeSlice.reducer;
