import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ActiveFilterTagCriteriaType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
  IngredientType,
  NutrientFiltersType,
  NutrientMatrixType,
} from "../../type/filterType";

interface InitialState {
  isPlanFilterOpen: boolean;
  allFiltersForPlan: FilterCriteriaValue[];
  activeFilterTagForPlan: ActiveFilterTagCriteriaType;
  numericFilterStateForPlan: NutrientFiltersType | NutrientMatrixType;
  excludeFilterStateForPlan: IngredientType;
}

const initialState: InitialState = {
  isPlanFilterOpen: false,
  activeFilterTagForPlan: {
    activeSection: "tags",
    filterCriteria: null,
    activeTab: "",
    childTab: "",
  },
  allFiltersForPlan: [],
  numericFilterStateForPlan: {} as NutrientFiltersType | NutrientMatrixType,
  excludeFilterStateForPlan: {} as IngredientType,
};

export const planFilterSlice = createSlice({
  initialState,
  name: "planFilter",
  reducers: {
    setIsPlanFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isPlanFilterOpen = action.payload;
    },
    updateFilterCriteriaItemForPlan: (
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
        state.allFiltersForPlan = [...state.allFiltersForPlan, payload.value];
        if (
          payload.value.filterCriteria === "nutrientFilters" ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterStateForPlan = {
            ...payload.value,
          };
        }
        if (payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterStateForPlan = {
            ...payload.value,
          };
        }
      }
      // when update status remove
      if (payload.updateStatus === "remove") {
        state.allFiltersForPlan = state.allFiltersForPlan.filter(
          (filter) => filter.id !== payload.value.id,
        );

        if (
          payload.value.filterCriteria === "nutrientFilters" ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          if (state.numericFilterStateForPlan.id === payload.value.id) {
            // @ts-ignore
            state.numericFilterStateForPlan = {
              ...dummyObj,
            };
          }
        }
        if (payload.value.filterCriteria === "includeIngredientIds") {
          if (state.excludeFilterStateForPlan.id === payload.value.id) {
            // @ts-ignore
            state.excludeFilterStateForPlan = {};
          }
        }
      }
      if (payload.updateStatus === "update") {
        state.allFiltersForPlan = state.allFiltersForPlan.map((filter) =>
          filter.id === payload.value.id ? payload.value : filter,
        );
        if (payload.value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterStateForPlan = {
            ...state.excludeFilterStateForPlan,
            ...payload.value,
          };
        }
      }
      // when update status removeAll
      if (payload.updateStatus === "removeAll") {
        state.allFiltersForPlan = state.allFiltersForPlan.filter(
          (filter) =>
            filter.filterCriteria !==
            state.activeFilterTagForPlan.filterCriteria,
        );
        // @ts-ignore
        state.numericFilterStateForPlan = {
          ...dummyObj,
        };
        // @ts-ignore
        state.excludeFilterStateForPlan = {};
      }
      // when update status focus
      if (payload.updateStatus === "focus") {
        const findOneItem = state.allFiltersForPlan.find(
          (item) => item.id === payload.value.id,
        );
        if (
          (findOneItem && payload.value.filterCriteria === "nutrientFilters") ||
          payload.value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterStateForPlan = {
            ...findOneItem,
          };
        }
        if (
          findOneItem &&
          payload.value.filterCriteria === "includeIngredientIds"
        ) {
          // @ts-ignore
          state.excludeFilterStateForPlan = {
            ...findOneItem,
          };
        }
      }
    },
    updateActiveFilterTagForPlan: (
      state,
      action: { payload: ActiveFilterTagCriteriaType },
    ) => {
      state.activeFilterTagForPlan = action.payload;
    },

    updateNumericFilterStateForPlan: (
      state,
      action: { payload: NutrientFiltersType | NutrientMatrixType },
    ) => {
      state.numericFilterStateForPlan = { ...action.payload };
    },

    resetAllFiltersForPlan: (state) => {
      state.allFiltersForPlan = [];
    },
  },
});

export const {
  setIsPlanFilterOpen,
  resetAllFiltersForPlan,
  updateActiveFilterTagForPlan,
  updateFilterCriteriaItemForPlan,
  updateNumericFilterStateForPlan,
} = planFilterSlice.actions;

export default planFilterSlice.reducer;
