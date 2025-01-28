import axios from "../../../api/axios";


export const registerUser = async (formData) => {
    const response = await axios.post("/register", formData);
    return response.data;
};


export const loginUser = async (credentials) => {
    const response = await axios.post("/login", credentials); 
    return response.data;
};