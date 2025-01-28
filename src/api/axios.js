import axios from "axios";

const BASE_URL = "http://localhost:8085/api";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


export default instance;
