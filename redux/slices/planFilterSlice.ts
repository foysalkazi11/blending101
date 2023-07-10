import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ActiveFilterTagCriteriaType,
  AllFilterType,
  FilterCriteriaOptions,
  FilterCriteriaValue,
  FiltersUpdateCriteria,
  IngredientType,
  NutrientFiltersType,
  NutrientMatrixType,
} from "../../type/filterType";
interface InitialState {
  isPlanFilterOpen: boolean;
  allFiltersForPlan: AllFilterType;
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
  allFiltersForPlan: {} as AllFilterType,
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
          queryFilters?: AllFilterType;
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
      const { updateStatus, filterCriteria, value, queryFilters } = payload;

      if (updateStatus === "bulkAdd") {
        state.allFiltersForPlan = queryFilters;
      }

      if (updateStatus === "add") {
        if (state.allFiltersForPlan[filterCriteria]) {
          state.allFiltersForPlan[filterCriteria].push(value);
        } else {
          state.allFiltersForPlan[filterCriteria] = [value];
        }
        // state.allFiltersForPlan = [...state.allFiltersForPlan, value];
        if (
          value.filterCriteria === "nutrientFilters" ||
          value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterStateForPlan = {
            ...value,
          };
        }
        if (value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterStateForPlan = {
            ...value,
          };
        }
      }
      // when update status remove
      if (updateStatus === "remove") {
        state.allFiltersForPlan[filterCriteria] = state.allFiltersForPlan[
          filterCriteria
        ].filter((filter) => filter.id !== value.id);

        if (
          value.filterCriteria === "nutrientFilters" ||
          value.filterCriteria === "nutrientMatrix"
        ) {
          if (state.numericFilterStateForPlan.id === value.id) {
            // @ts-ignore
            state.numericFilterStateForPlan = {
              ...dummyObj,
            };
          }
        }
        if (value.filterCriteria === "includeIngredientIds") {
          if (state.excludeFilterStateForPlan.id === value.id) {
            // @ts-ignore
            state.excludeFilterStateForPlan = {};
          }
        }
      }
      if (updateStatus === "update") {
        state.allFiltersForPlan[filterCriteria] = state.allFiltersForPlan[
          filterCriteria
        ].map((filter) => (filter.id === value.id ? value : filter));
        if (value.filterCriteria === "includeIngredientIds") {
          // @ts-ignore
          state.excludeFilterStateForPlan = {
            ...state.excludeFilterStateForPlan,
            ...value,
          };
        }
      }
      // when update status removeAll
      if (updateStatus === "removeAll") {
        state.allFiltersForPlan[filterCriteria] = state.allFiltersForPlan[
          filterCriteria
        ].filter(
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
      if (updateStatus === "focus") {
        const findOneItem = state.allFiltersForPlan[filterCriteria].find(
          (item) => item.id === value.id,
        );
        if (
          (findOneItem && value.filterCriteria === "nutrientFilters") ||
          value.filterCriteria === "nutrientMatrix"
        ) {
          // @ts-ignore
          state.numericFilterStateForPlan = {
            ...findOneItem,
          };
        }
        if (findOneItem && value.filterCriteria === "includeIngredientIds") {
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
      state.allFiltersForPlan = {} as {
        [key in FilterCriteriaOptions]: FilterCriteriaValue[];
      };
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
