export interface WikiListType {
  _id: string;
  wikiTitle: string;
  wikiDescription: string;
  type: string;
  category: string;
  image: string;
  status: string;
  portions: Portion[];
  publishedBy: string;
  description: string;
  isPublished: boolean;
  commentsCount: number;
  hasInCompare: boolean;
}

export interface Portion {
  measurement: string;
  meausermentWeight: string;
  default: boolean;
}
