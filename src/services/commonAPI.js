import axios from "axios";
import baseURL from "./baseURL";

const commonAPI = async (httpMethod, endpoints, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url: baseURL + endpoints,
    data: reqBody,
    headers: reqHeader ? reqHeader : { ContentType: "application/json" },
  };

  return await axios(reqConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonAPI;