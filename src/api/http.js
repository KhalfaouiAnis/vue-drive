import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL,
});

export default http;
