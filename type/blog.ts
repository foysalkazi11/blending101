export interface BlogListType {
  _id: string;
  coverImage: string;
  createdBy: string;
  hasInCollection: boolean;
  mediaLength: string;
  mediaUrl: string;
  publishDate: string;
  slug: string;
  title: string;
  publishDateString: string;
  type: "post" | "audio" | "video";
  commentsCount: number;
}

export interface BlogDetailsType {
  _id: string;
  title: string;
  body: string;
  commentsCount: number;
  coverImage: string;
  type: "post" | "audio" | "video";
  slug: string;
  publishDateString: string;
  publishDate: string;
  mediaUrl: string;
  mediaLength: string;
  keywords: string[];
  hasInCollection: boolean;
  description: string;
  createdBy: string;
  category: string;
}
