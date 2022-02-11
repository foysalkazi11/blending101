import S3_CONFIG from "../../configs/s3";
import axios from "axios";

const imageUploadS3 = (files: any[]) => {
  let images = [];

  return new Promise(async (res, rej) => {
    try {
      for (let i = 0; files?.length > i; i++) {
        const { Key, uploadURL } = await (
          await axios.get(S3_CONFIG.objectURL)
        ).data;
        await fetch(uploadURL, {
          method: "PUT",
          body: files[i],
        });
        const objectUrl = `${S3_CONFIG.baseURL}/${Key}`;
        images?.push(objectUrl);
      }
      res(images);
    } catch (error) {
      rej(error);
      console.log(error.message)
    }
  });
};

export default imageUploadS3;
