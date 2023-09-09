import { useState } from "react";
const useToDeleteImageFromS3 = () => {
  const [loading, setLoading] = useState(false);
  const deleteImage = async (imageLink: string) => {
    try {
      setLoading(true);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_S3_IMAGE_DELETE_URL}`,
        {
          method: "DELETE",
          body: JSON.stringify({ images: [imageLink] }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      if (response.ok) {
        response = await response.json();
        setLoading(false);
        return response;
      }
      setLoading(false);
      throw new Error("Failed to delete image");
    } catch (err) {
      setLoading(false);
      throw new Error("Failed to delete image");
    }
  };

  return { deleteImage, loading };
};

export default useToDeleteImageFromS3;
