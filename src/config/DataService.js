import axios from "axios";
import Index from "../containers/Index";

const API_ENDPOINT = import.meta.env.VITE_BASE_URL;
// export const imageUrl = import.meta.env.VITE_IMAGE_URL;
export const imageUrl = `${import.meta.env.VITE_IMAGE_URL}/uploads/`;
export const certificateImageUrl = `${import.meta.env.VITE_IMAGE_URL}/certificate`;

// Create Axios instance
const DataService = axios.create({
  baseURL: API_ENDPOINT,
});
export default DataService;

//#region Utility Functions
const handleSuccess = (response, isShow) => {
  if (isShow && response?.data?.message) {
    Index.toast.success(response.data.message, { autoClose: 2000 });
  }
  return response;
};

const handleError = (error, isShow) => {
  if (isShow && error?.response?.data?.message) {
    Index.toast.error(error.response.data.message, { autoClose: 2000 });
  }
  throw error;
};

//#region API Calls
export const doGet = async (url, isShow = true) => {
  try {
    const response = await DataService.get(url);
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};

export const doGetByQuery = async (
  url,
  query,
  controller = null,
  isShow = true
) => {
  try {
    const response = await DataService.get(url, {
      ...query,
      signal: controller?.signal,
    });
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};

export const doPost = async (url, data, isShow = true) => {
  try {
    const response = await DataService.post(url, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};

export const doPostFormData = async (url, data, isShow = true) => {
  try {
    const response = await DataService.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};

export const doPostGetParams = async (url, data, id, isShow = true) => {
  try {
    delete data?.id;
    const response = await DataService.post(`${url}?id=${id}`, data);
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};

export const doGetParams = async (url, id, isShow = true) => {
  try {
    const response = await DataService.get(`${url}/${id}`);
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};

export const doPostData = async (url, data, isShow = true) => {
  try {
    const response = await DataService.post(url, data);
    return handleSuccess(response, isShow);
  } catch (error) {
    handleError(error, isShow);
  }
};
