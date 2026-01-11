const axios = require("axios");

const api = axios.create({
    baseURL: "http://study-group-finder-server.vercel.app",
});

module.exports = api;