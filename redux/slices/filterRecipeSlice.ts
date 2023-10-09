import { createSlice } from "@reduxjs/toolkit";
import {
  ActiveFilterTagCriteriaType,
  AllFilterRecipes,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
  NutrientFiltersType,
  NutrientMatrixType,
  IngredientType,
} from "../../type/filterType";

interface FilterState {
  allFilters: FilterCriteriaValue[];
  activeFilterTag: ActiveFilterTagCriteriaType;
  numericFilterState: NutrientFiltersType | NutrientMatrixType;
  allFilterRecipes: AllFilterRecipes;
  excludeFilterState: IngredientType;
  showFilterOrSearchRecipes: boolean;
}

const initialState: FilterState = {
  activeFilterTag: {
    activeSection: "visual",
    filterCriteria: null,
    activeTab: "",
    childTab: "",
    id: "",
  },
  allFilters: [],
  numericFilterState: {} as NutrientFiltersType | NutrientMatrixType,
  allFilterRecipes: {
    filterRecipes: [],
    isFiltering: false,
    totalItems: 0,
  },
  excludeFilterState: {} as IngredientType,
  showFilterOrSearchRecipes: false,
};

export const filterRecipeSlice = createSlice({
  name: "filterRecipe",
  initialState,
  reducers: {
    updateFilterCriteriaItem: (
      state,
      action: {
        payload: {
          filterCriteria?: FilterCriteriaOptions;
          value?: FilterCriteriaValue;
          updateStatus: FiltersUpdateCriteria;
        };
      },
    ) => {
      const payload = action.payload;
      const dummyObj = {
        id: "",
        name: "",
        between: false,
        category: "",
        greaterThan: false,
        lessThan: true,
        lessThanValue: 0,
        greaterThanValue: 0,
        betweenStartValue: 0,
        betweenEndValue: 0,
      };

      // when update status add
      if (payload.updateStatus === "add") {
        state.allFilters = [...state.allFilters, payload.value];
        if (payload.value.filterCriteria === "nutrientFilters" || payload.value.filterCriteria === "nutrientMatrix") {
          // @ts-ignore
          state.numericFilterState = {
            ...payload.value,
          };
        }
        if (payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterState = {
            ...payload.value,
          };
        }
        state.activeFilterTag = payload.value.origin;
      }
      // when update status remove
      if (payload.updateStatus === "remove") {
        state.allFilters = state.allFilters.filter((filter) => filter.id !== payload.value.id);

        if (payload.value.filterCriteria === "nutrientFilters" || payload.value.filterCriteria === "nutrientMatrix") {
          if (state.numericFilterState.id === payload.value.id) {
            // @ts-ignore
            state.numericFilterState = {
              ...dummyObj,
            };
          }
        }
        if (payload.value.filterCriteria === "includeIngredientIds") {
          if (state.excludeFilterState.id === payload.value.id) {
            // @ts-ignore
            state.excludeFilterState = {};
          }
        }
      }
      if (payload.updateStatus === "update") {
        state.allFilters = state.allFilters.map((filter) => (filter.id === payload.value.id ? payload.value : filter));
        if (payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterState = {
            ...state.excludeFilterState,
            ...payload.value,
          };
        }
        // state.activeFilterTag = payload.value.origin;
      }
      // when update status removeAll
      if (payload.updateStatus === "removeAll") {
        state.allFilters = state.allFilters.filter(
          (filter) => filter.filterCriteria !== state.activeFilterTag.filterCriteria,
        );
        // @ts-ignore
        state.numericFilterState = {
          ...dummyObj,
        };
        // @ts-ignore
        state.excludeFilterState = {};
      }
      // when update status focus
      if (payload.updateStatus === "focus") {
        const findOneItem = state.allFilters.find((item) => item.id === payload.value.id);
        if (
          (findOneItem && payload.value.filterCriteria === "nutrientFilters") ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterState = {
            ...findOneItem,
          };
        }
        if (findOneItem && payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterState = {
            ...findOneItem,
          };
        }
        state.activeFilterTag = payload.value.origin;
      }
    },
    updateActiveFilterTag: (state, action: { payload: ActiveFilterTagCriteriaType }) => {
      state.activeFilterTag = action.payload;
    },

    updateNumericFilterState: (state, action: { payload: NutrientFiltersType | NutrientMatrixType }) => {
      state.numericFilterState = { ...action.payload };
    },
    updateAllFilterRecipes: (state, action: { payload: AllFilterRecipes }) => {
      state.allFilterRecipes = { ...action.payload };
    },
    updateShowFilterOrSearchRecipes: (state, action: { payload: boolean }) => {
      state.showFilterOrSearchRecipes = action.payload;
    },

    resetAllFilters: (state) => {
      state.allFilters = [];
    },
  },
});

export const {
  updateFilterCriteriaItem,
  updateActiveFilterTag,
  updateNumericFilterState,
  resetAllFilters,
  updateAllFilterRecipes,
  updateShowFilterOrSearchRecipes,
} = filterRecipeSlice.actions;

export default filterRecipeSlice.reducer;
