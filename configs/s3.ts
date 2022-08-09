const S3_CONFIG = {
  objectURL: process.env.NEXT_PUBLIC_S3_OBJECT_URL || "",
  baseURL: process.env.NEXT_PUBLIC_S3_BASE_URL || "",
};

export default S3_CONFIG;
