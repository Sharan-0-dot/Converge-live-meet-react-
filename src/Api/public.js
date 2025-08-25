import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://converge-frow.onrender.com",
    // "http://localhost:8080", 
});
export default axiosPublic;