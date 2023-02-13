import axios from "axios";

// initializing the axios instance with custom configs
const api = axios.create({
  // withCredentials: true,
  baseURL: "https://localhost:7281/api",
  headers: {
    "Custom-Language": "en",
  },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// // registering the custom error handler to the
// // "api" axios instance
// api.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     return errorHandler(error);
//   }
// );

export default api;
