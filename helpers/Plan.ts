import axios from "axios";

// To get the merged image from the recipes of the plan list
export function getPlanImage(images: string[]) {
  return axios
    .post(
      "https://om7h45qezg.execute-api.us-east-1.amazonaws.com/prod/file-processing/images/merge",
      { images },
    )
    .then((response) => {
      return { url: response.data?.data?.image, hash: "" };
    });
}
