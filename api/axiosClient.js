import axios from "axios";
// https://my-booking-hotel.herokuapp.com/
// baseURL máy ảo android : http://10.0.2.2:3000
const axiosClient = axios.create({
  baseURL: "https://my-booking-hotel.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosClient;
