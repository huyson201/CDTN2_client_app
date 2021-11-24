import axios from "axios";
// https://my-booking-hotel.herokuapp.com/
// baseURL máy ảo android : http://10.0.2.2:3000
const axiosClient = axios.create({
  baseURL: "http://192.168.43.72:3000",
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosClient;