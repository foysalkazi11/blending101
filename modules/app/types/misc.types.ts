// Schema: CalorieInfo
export interface Calorie {
  value: number;
}

// Schema: GiGl
export interface GiGl {
  totalGi: number;
  netCarbs: number;
  totalGL: number;
  rxScore: number;
}

// Schema: Member
export interface Member {
  _id: string;
  bio: string;
  // collections: CollectionType[];
  compareLength: number;
  compareList: string[];
  // configuration: Configuration;
  createdAt: string;
  displayName: string;
  email: string;
  firstName: string;
  image: string;
  isCreated: boolean;
  lastModifiedCollection: string;
  lastName: string;
  location: string;
  myCart: string[];
  orderHistory: string[];
  phone: string;
  provider: string;
  recentViewedProducts: string[];
  wikiCompareCount: number;
  yourBlender: string;
}
