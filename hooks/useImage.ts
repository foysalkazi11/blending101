import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import S3_CONFIG from "../configs/s3";

const useImage = (initState: any[]) => {
  const [images, setImages] = useState<(Image | File)[]>(initState);
  const imageUrls = useRef([]);

  useEffect(() => {}, []);

  const postImages = useCallback(async () => {
    await Promise.all(
      images.map((image) => {
        if (image.hasOwnProperty("url")) {
          imageUrls.current.push({
            url: (image as Image).url,
            hash: "",
          });
        } else {
          const file = image as File;
          const fileName = file.name;
          const formdata = new FormData();
          formdata.append("folder_name", "online");
          formdata.append("image_name", fileName);
          formdata.append("image_file", file, fileName);
          return axios({
            method: "post",
            url: S3_CONFIG.uploadURL,
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      }),
    ).then((responses) => {
      responses.forEach((response) => {
        if (!response) return;
        else {
          imageUrls.current.push({
            url: response?.data?.body?.file_url,
            hash: response?.data?.body?.blur_hash,
          });
        }
      });
    });
    return imageUrls.current;
  }, [images]);

  return { images, setImages, loaded: true, postImages };
};

export default useImage;
