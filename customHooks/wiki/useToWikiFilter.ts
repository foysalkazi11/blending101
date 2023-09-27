import { useLazyQuery } from "@apollo/client";
import { SelectedWikiTypeProps } from "components/wiki";
import { useUser } from "context/AuthProvider";
import FILTER_WIKI from "gqlLib/wiki/query/filterWiki";

enum BlendIngredientType {
  Leafy = "LEAFY",
  Berry = "BERRY",
  Herbal = "HERBAL",
  Fruity = "FRUITY",
  Balancer = "BALANCER",
  Fatty = "FATTY",
  Seasoning = "SEASONING",
  Flavor = "FLAVOR",
  Rooty = "ROOTY",
  Flowering = "FLOWERING",
  Liquid = "LIQUID",
  "Tube-Squash" = "TUBE_SQUASH",
}
enum NutrientCategoryFilterType {
  Energy = "MACRO_NUTRIENTS",
  Micronutrients = "MICRO_NUTRIENTS",
  Vitamins = "VITAMIN",
  Minerals = "MINERAL",
  Calories = "CALORIE",
}
enum WikiTypes {
  Ingredient = "INGREDIENT",
  Nutrient = "NUTRIENT",
  Health = "HEALTH",
}

type WikiFilterCriteria = {
  wikiType?: "" | WikiTypes;
  BlendIngredientType?: "" | BlendIngredientType;
  nutrientCategory?: "" | NutrientCategoryFilterType;
  includeWikiIds?: string[];
  excludeWikiIds?: string[];
  nutrientFilters?: any[];
  nutrientMatrix?: any[];
  searchTerm?: string;
};

const useToWikiFilter = () => {
  const user = useUser();
  const [filterWiki, filterWikiState] = useLazyQuery(FILTER_WIKI);
  const handleWikiFilter = async (allWikiFilters: SelectedWikiTypeProps, page = 1, limit = 12) => {
    // let wikiType: WikiTypes | "" = "";
    // let BlendIngredientType: BlendIngredientType | "" = "";
    // let nutrientCategory: NutrientCategoryFilterType | "" = "";
    // let includeWikiIds: string[] = [];
    // let excludeWikiIds: string[] = [];
    // let nutrientFilters = [];
    // let nutrientMatrix = [];
    // let searchTerm: string = "";

    const objWikiFilter: WikiFilterCriteria = {};

    if (allWikiFilters.wikiType) {
      objWikiFilter.wikiType = WikiTypes[allWikiFilters.wikiType];
    }
    if (allWikiFilters?.wikiType === "Ingredient" && allWikiFilters?.category) {
      objWikiFilter.BlendIngredientType = BlendIngredientType[allWikiFilters.category];
    }
    if (allWikiFilters?.wikiType === "Nutrient" && allWikiFilters?.category) {
      objWikiFilter.nutrientCategory = NutrientCategoryFilterType[allWikiFilters.category];
    }

    if (allWikiFilters?.selectedItems?.length) {
      objWikiFilter.includeWikiIds = [...allWikiFilters?.selectedItems];
    }
    if (allWikiFilters?.searchTerm) {
      objWikiFilter.searchTerm = allWikiFilters?.searchTerm;
    }

    try {
      const { data } = await filterWiki({
        variables: {
          data: objWikiFilter,
          page,
          limit,
          userId: user.id,
        },
      });

      return data.filterWiki;
    } catch (error) {
      throw new Error("Filed to filter wiki");
    }
  };

  return { handleWikiFilter, ...filterWikiState };
};

export default useToWikiFilter;
