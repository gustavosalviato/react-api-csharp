import axios from "axios";

const api = axios.create({
    baseURL: "https://facec-webapi-2022.herokuapp.com"
});

export default api;