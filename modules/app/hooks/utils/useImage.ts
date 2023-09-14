import axios from "axios";
import { toast } from "react-toastify";
import { useState, useCallback, useRef } from "react";
import imageCompression from "browser-image-compression";

const useImage = (initState: any[] = []) => {
  const [images, setImages] = useState<(Image | File)[]>(initState);
  const imageUrls = useRef([]);

  const postImages = useCallback(
    async (
      newImages: (Image | File)[] = [],
      folderName: string = "first_folder",
    ): Promise<{ url: string; hash: string }[]> => {
      const loading = toast.loading("Uploading Image", {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (!newImages.length) {
        newImages = images;
      }
      await Promise.all(
        newImages.map(async (image) => {
          if (image.hasOwnProperty("url")) {
            imageUrls.current.push({
              url: (image as Image).url,
              hash: "",
            });
          } else {
            const file = image as File;
            const fileName = file.name;
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1200,
              useWebWorker: true,
              initialQuality: 0.8,
            };
            return imageCompression(file, options).then((file) =>
              axios({
                method: "post",
                url: `https://j88wgcjqa6.execute-api.us-east-1.amazonaws.com/prod/image_processing/upload?image_name=${fileName}&folder_name=${folderName}`,
                data: file,
              }),
            );
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
    },
    [images],
  );

  return { images, setImages, loaded: true, postImages };
};

export default useImage;
