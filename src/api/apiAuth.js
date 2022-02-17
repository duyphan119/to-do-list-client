import axios from "axios";
import {
  signInFail,
  signInStart,
  signInSuccess,
  signOutSuccess,
} from "../redux/authSlice";
const BASE_URL = "https://to-do-list-56rv.onrender.com/api/auth";
export const apiSignUp = async (user, navigate) => {
  try {
    await axios.post(`${BASE_URL}/sign-up`, user, {
      withCredentials: true,
    });
    console.log("signip");
    navigate("/sign-in");
  } catch (error) {
    console.log(error.response.data);
  }
};
export const apiSignIn = async (user, dispatch, navigate) => {
  dispatch(signInStart);
  try {
    const res = await axios.post(`${BASE_URL}/sign-in`, user, {
      withCredentials: true,
    });
    dispatch(signInSuccess(res.data));
    navigate(`/`);
  } catch (error) {
    console.log(error.response.data);
    dispatch(signInFail);
  }
};
export const apiSignOut = async (dispatch, navigate) => {
  try {
    await axios.post(
      `${BASE_URL}/sign-out`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(signOutSuccess());
    navigate("/sign-in");
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};
export const apiRefreshToken = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return {};
  }
};
