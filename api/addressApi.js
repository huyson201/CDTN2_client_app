import axios from 'axios';

const addressApi = axios.create({
  baseURL: 'https://api.mysupership.vn/v1/partner/areas',
  headers: {
    'Content-Type': 'application/json',
  },
});

const addressUtil = {
  getProvince: function () {
    return addressApi.get('/province');
  },
  getDistrict: function (provinceCode) {
    return addressApi.get(`/district?province=${provinceCode}`);
  },
  getCommune: function (districtCode) {
    return addressApi.get(`/commune?district=${districtCode}`);
  },
};

export default addressUtil;
