import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback, useRef } from "react";
import S3_CONFIG from "../configs/s3";

const useImage = (initState: any[]) => {
  const [images, setImages] = useState<(Image | File)[]>(initState);
  const imageUrls = useRef([]);

  const toastId = useRef(null);
  const notify = () => (toastId.current = toast("Hello", { autoClose: false }));
  const update = () =>
    toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });

  useEffect(() => {}, []);

  const postImages = useCallback(async () => {
    const loading = toast.loading("Uploading Image", {
      position: toast.POSITION.TOP_RIGHT,
    });

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
          const size = file.size / 1024 ** 2;
          if (size >= 2) {
            toast.update(loading, {
              render: `${fileName} size is more than 2MB`,
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            return axios({
              method: "post",
              url: `https://j88wgcjqa6.execute-api.us-east-1.amazonaws.com/prod/image_processing/upload?image_name=${fileName}&folder_name=first_folder`,
              data: file,
            });
          }
        }
      }),
    ).then((responses) => {
      responses.forEach((response) => {
        const value = response?.data?.data;
        if (!response) return;
        else {
          imageUrls.current.push({
            url: value?.file_url,
            hash: value?.blurhash_code,
          });
        }
      });
      toast.dismiss(loading);
    });
    return imageUrls.current;
  }, [images]);

  return { images, setImages, loaded: true, postImages };
};

export default useImage;
