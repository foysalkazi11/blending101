import axios from "axios";
import React, { useEffect } from "react";

const GET_API = "";
const POST_API = "https://eqcdhpo7l3.execute-api.us-east-1.amazonaws.com/prod/api/v1/cdn";

const useStaticData = (key: string, data: any) => {
  useEffect(() => {
    axios.post(`${POST_API}/${key}`, { data: { data } }).then((res) => {
      console.log(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};

export default useStaticData;
