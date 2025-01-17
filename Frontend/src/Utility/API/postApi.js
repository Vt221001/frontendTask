import axios from "axios";
import { postApiConfig } from "../APIEndPoints/postApiConfig";
import getHeaders from "../Headers/getHeader";
import { toast } from "react-toastify";

const postApi = async (endpoint, payload, params = {}, setStateData) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const config = {
      method: "POST",
      url: `${BASE_URL}/api${postApiConfig[endpoint]?.url}`,
      data: payload,
      params: params,
    };

    const response = await axios(config);
    if (setStateData) {
      setStateData(response.data.data);
    }
    if (response.data.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    if (setStateData) {
      setStateData(
        error.response?.data || error.message || "An error occurred"
      );
    }
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }

    return Promise.reject(error);
  }
};

export default postApi;
