import axios from "axios";

// const api = axios.create({
//   baseURL: "http://echoesofthepast.runasp.net/api/", // Replace with your API base URL
//   withCredentials: true, // This allows sending credentials (cookies, authorization headers, etc.)
//   headers: {
//     "Content-Type": "application/json", // Set content type if necessary
//     platform: "Web", // You can set any header you want here
//   },
// });
const api = axios.create({
  baseURL: "http://echoesofthepast.runasp.net/api/",
  headers: {
    "Content-Type": "application/json",
    platform: "Web",
  },
  // ❌ إحذف السطر ده:
  // withCredentials: true,
});


export const get = async (url = "", params = {}) => {
  try {
    const response = await api.get(
      url +
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&")
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const post = async (url = "", params = {}, data = {}) => {
  try {
    const response = await api.post(
      url +
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&"),
      data
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const put = async (url = "", params = {}, data = {}) => {
  try {
    const response = await api.put(
      url +
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&"),
      data
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const Delete = async (url = "", params = {}) => {
  try {
    const response = await api.delete(
      url +
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&")
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};
