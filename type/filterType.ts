import { RecipeType } from "./recipeType";

export type ActiveSectionType = "visual" | "tags";
export type FiltersUpdateCriteria = "add" | "remove" | "update" | "removeAll" | "focus" | "bulkAdd";
export type FilterCriteriaOptions =
  | "blendTypes"
  | "includeIngredientIds"
  | "nutrientFilters"
  | "nutrientMatrix"
  | "collectionIds"
  | "searchTerm";

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
type CommonProperties = {
  name: string;
  id: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
  image?: string;
  excludeIngredientIds?: boolean;
  between?: boolean;
  category?: "energy" | "mineral" | "vitamin";
  matrixName?: "gi" | "gl" | "calorie" | "netCarbs";
  greaterThan?: boolean;
  lessThan?: boolean;
  lessThanValue?: number;
  greaterThanValue?: number;
  betweenStartValue?: number;
  betweenEndValue?: number;
};

export type BlendType = {
  name: string;
  id: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
  image?: string;
};
export interface SearchTermType {
  searchTerm: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  id: string;
}

export type IngredientType = {
  name: string;
  id: string;
  tagLabel: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
  image?: string;
  excludeIngredientIds?: boolean;
};
export interface NutrientFiltersType {
  between: boolean;
  category: "energy" | "mineral" | "vitamin";
  greaterThan: boolean;
  lessThan: boolean;
  lessThanValue: number;
  greaterThanValue: number;
  betweenStartValue: number;
  betweenEndValue: number;
  id: string;
  tagLabel: string;
  name: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
  image?: string;
}

export interface NutrientMatrixType {
  between: boolean;
  greaterThan: boolean;
  lessThan: boolean;
  matrixName: "gi" | "gl" | "calorie" | "netCarbs";
  lessThanValue: number;
  greaterThanValue: number;
  betweenStartValue: number;
  betweenEndValue: number;
  id: string;
  tagLabel: string;
  name: string;
  filterCriteria: FilterCriteriaOptions;
  origin: ActiveFilterTagCriteriaType;
  image?: string;
}

export interface ActiveFilterTagCriteriaType {
  activeSection: ActiveSectionType;
  filterCriteria: FilterCriteriaOptions;
  activeTab: string;
  childTab: string;
  id: string;
}

export type FilterCriteriaValue = CommonProperties;

export interface AllFilterRecipes {
  filterRecipes: RecipeType[];
  isFiltering: boolean;
  totalItems: number;
}

export type AllFilterType = {
  [key in FilterCriteriaOptions]?: key extends "searchTerm" ? string : FilterCriteriaValue[];
};
