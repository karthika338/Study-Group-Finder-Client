import axios from "axios";

const api = axios.create({
    baseURL: "study-group-finder-server.vercel.app",
});

export default api;