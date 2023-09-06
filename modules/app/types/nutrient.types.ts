// SCHEMA: NutrientValue
export interface Nutrient {
  blendData: BlendNutrient;
  sourceId: string;
  uniqueNutrientRefference: SourceNutrient;
  value: string;
}

// SCHEMA: UniqueNutrient
export interface SourceNutrient {
  _id: string;
  category: string;
  mapTo: string;
  max: string;
  min: string;
  nutrient: string;
  nutrientId: string;
  parentNutrient: SourceNutrient;
  publication_date: string;
  rank: number;
  related_sources: NutrientSource[];
  unitName: string;
  units: string;
}

// SCHEMA: BlendIngredientData
export interface BlendNutrient {
  _id: string;
  altName?: string;
  blendId: string;
  category: BlendNutrientCategory;
  isBookmarked: boolean;
  mapList: {
    nutrientName: string;
    rank: number;
    srcUniqueNutrientId: string;
  }[];
  min_measure?: string;
  nutrientName: string;
  parent?: BlendNutrient;
  parentIsCategory: boolean;
  rank: number;
  related_sources: NutrientSource[];
  showChildren: boolean;
  status: string;
  unitName: string;
  units: string;
  usePriorityForMap: boolean;
}

interface BlendNutrientCategory {
  _id: string;
  blendId: string;
  categoryName: string;
  featuredImage: string;
  images: string[];
  isPublished: boolean;
  keywords: string[];
  nutrientDescription: string;
  rank: number;
  slug: string;
}

interface NutrientSource {
  source: string;
  sourceId: string;
  sourceNutrientName: string;
  units: string;
}
