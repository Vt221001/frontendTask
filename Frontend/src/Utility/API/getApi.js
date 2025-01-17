import { getApiConfig } from "../APIEndPoints/getApiConfig";
import axios from "axios";
import getHeaders from "../Headers/getHeader";

const getAPI = async (endpoint, params = {}, setStateData) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  try {
    const config = {
      method: getApiConfig[endpoint].method,
      headers: await getHeaders(["access-token"]),
      url: `${BASE_URL}/api/${getApiConfig[endpoint].url}`,
      params: params,
    };
    const response = await axios(config);
    setStateData(response.data);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    setStateData(error);
    return error;
  }
};

export default getAPI;
