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
