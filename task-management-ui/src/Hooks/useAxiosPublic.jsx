import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://task-managing-default-rtdb.asia-southeast1.firebasedatabase.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;