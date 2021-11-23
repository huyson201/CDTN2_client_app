import axiosClient from "./axiosClient";
const hotelApi = {
  getAll: (query) => {
    const url = `/${query}`;
    return axiosClient.get(url);
  },
  getHotelById: (id) => {
    const url = `/hotels/${id}`;
    return axiosClient.get(url);
  },
  getAllRoomsByIdHotel: (idHotel) => {
    const url = `/hotels/${idHotel}/rooms`;
    return axiosClient.get(url);
  },
  getRoomById: (id) => {
    const url = `/rooms/${id}`;
    return axiosClient.get(url);
  },
  getServiceById: (id) => {
    const url = `/hotels/${id}/services`
    return axiosClient.get(url)
  },
  getRates: (id, params = {}) => {
    const url = `/hotels/${id}/rates`
    return axiosClient.get(url, {
      params: params
    })
  }
};
export default hotelApi;
