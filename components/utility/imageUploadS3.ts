import S3_CONFIG from "../../configs/s3";
import axios from "axios";

const imageUploadS3 = async (files: any[]) => {
  let images = [];

  try {
    files?.forEach(async (file) => {
      const { Key, uploadURL } = await (
        await axios.get(S3_CONFIG.objectURL)
      ).data;
      await fetch(uploadURL, {
        method: "PUT",
        body: file,
      });
      const objectUrl = `${S3_CONFIG.baseURL}/${Key}`;
      console.log(objectUrl);

      images?.push(objectUrl);
    });
    return images;
  } catch (error) {
    console.log(error);
  }
};

export default imageUploadS3;
