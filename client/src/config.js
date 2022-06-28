import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://jobsearch0.herokuapp.com/api/"
})
