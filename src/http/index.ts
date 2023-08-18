import axios from "axios";

export const API_URL = "https://cloud-drive-w6h8.onrender.com/api";

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token !== null) 
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});
