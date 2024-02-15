import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
