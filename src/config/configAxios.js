import axios from "axios";
import jwtDecode from "jwt-decode";
import { apiRefreshToken } from "../api/apiAuth";
import { updateToken } from "../redux/authSlice";

export const configAxios = (user, dispatch) => {
  const instance = axios.create({
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config) => {
      if (jwtDecode(user.accessToken).exp * 1000 < new Date().getTime()) {
        const data = await apiRefreshToken();
        console.log("Hết hạn token và đã refresh", data);
        dispatch(updateToken(data.accessToken));
        config.headers["authorization"] = `Bearer ${data.accessToken}`;
      } else {
        console.log("token còn hạn");
        config.headers["authorization"] = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return instance;
};
