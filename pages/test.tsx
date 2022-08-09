import axios from "axios";
import React from "react";
import S3_CONFIG from "../configs/s3";

const test = () => {
  const uploadImages = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      var formdata = new FormData();
      for (let i = 0; i < files?.length; i++) {
        const fileName = files[i].name;

        formdata.append("images[]", files[i], fileName);
      }
      const response = await axios({
        method: "post",
        url: S3_CONFIG.baseURL,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const URL = JSON.parse(response.data);
    }
  };
  return (
    <div>
      <input
        type="file"
        multiple
        // formEncType="multipart/form-data"
        // encType="multipart/form-data"
        onChange={uploadImages}
      />
    </div>
  );
};

export default test;
