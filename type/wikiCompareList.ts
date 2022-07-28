export interface WikiCompareList {
  _id: string;
  category: string;
  portion: Portion;
  featuredImage: string;
  wikiTitle: string;
  wikiDescription: string;
  type: string;
  image: string;
  publishedBy: string;
  commentsCount: number;
  hasInCompare: boolean;
}

export interface Portion {
  default: boolean;
  meausermentWeight: string;
  measurement: string;
}
