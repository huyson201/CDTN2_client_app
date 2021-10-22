import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://my-booking-hotel.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
