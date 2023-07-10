import { RecipeType } from "./recipeType";

export type ActiveSectionType = "visual" | "tags";
export type FiltersUpdateCriteria =
  | "add"
  | "remove"
  | "update"
  | "removeAll"
  | "focus"
  | "bulkAdd";
export type FilterCriteriaOptions =
  | "blendTypes"
  | "includeIngredientIds"
  | "nutrientFilters"
  | "nutrientMatrix"
  | "collectionIds";

export type FilterProps = {
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

export interface BlendType {
  name: string;
  id: string;
  image?: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
}

export interface IngredientType {
  name: string;
  id: string;
  image?: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  excludeIngredientIds: boolean;
  origin: ActiveFilterTagCriteriaType;
}
export interface NutrientFiltersType {
  between: boolean;
  category: "energy" | "mineral" | "vitamin";
  greaterThan: boolean;
  lessThan: boolean;
  id: string;
  lessThanValue: number;
  greaterThanValue: number;
  betweenStartValue: number;
  betweenEndValue: number;
  tagLabel: string;
  name: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
}

export interface NutrientMatrixType {
  between: boolean;
  greaterThan: boolean;
  lessThan: boolean;
  matrixName: "gi" | "gl" | "calorie" | "netCarbs";
  id: string;
  lessThanValue: number;
  greaterThanValue: number;
  betweenStartValue: number;
  betweenEndValue: number;
  tagLabel: string;
  name: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
}

export interface ActiveFilterTagCriteriaType {
  activeSection: ActiveSectionType;
  filterCriteria: FilterCriteriaOptions;
  activeTab: string;
  childTab: string;
}

export type FilterCriteriaValue =
  | BlendType
  | IngredientType
  | NutrientFiltersType
  | NutrientMatrixType;

export interface AllFilterRecipes {
  filterRecipes: RecipeType[];
  isFiltering: boolean;
  totalItems: number;
}

export type AllFilterType = {
  [key in FilterCriteriaOptions]: FilterCriteriaValue[];
};
