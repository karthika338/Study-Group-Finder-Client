import axios from "axios";

const api = axios.create({
  baseURL: "https://study-group-finder-server.vercel.app/api",
});

export default api;