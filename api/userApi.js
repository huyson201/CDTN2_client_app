import axiosClient from './axiosClient';
const userApi = {
  signUp: (name, email, password, cofirm_password, phone) => {
    console.log(phone,"phone");
    const url = '/register';
    return axiosClient.post(url, {
      user_name: name,
      user_email: email,
      user_password: password,
      confirm_password: cofirm_password,
      user_phone: phone,
    });
  },
  login: (email, password) => {
    const url = '/login';
    return axiosClient.post(url, {
      user_email: email,
      user_password: password,
    });
  },
  logout: token => {
    const url = '/logout';
    return axiosClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  refreshToken: refreshToken => {
    const url = "/refresh-token"
    return axiosClient.post(url, { refreshToken: refreshToken })
  },
  getUserById: (token, id) => {
    const url = `/users/${id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  update: (token, id, formData) => {
    const url = `/users/${id}`
    return axiosClient.patch(
      url,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${token}`
        }
      })
  }
};
export default userApi;
