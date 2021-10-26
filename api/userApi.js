import axiosClient from './axiosClient';
const userApi = {
  signUp: (name, email, password, cofirm_password, phone) => {
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
    const action = axiosClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(action);
    return action;
  },
};
export default userApi;
