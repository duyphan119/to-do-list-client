import { configAxios } from "../config/configAxios";
import { getAllToDos } from "../redux/toDoSlice";
const BASE_URL = "https://to-do-list-56rv.onrender.com/api/to-do";
export const apiGetAllToDoByUserId = async (user, date, filter, dispatch) => {
  try {
    const axiosJWT = configAxios(user, dispatch);
    let url = `${BASE_URL}/user/${user._id}`;
    if (date && filter) {
      url = `${BASE_URL}/user/${user._id}?date=${date}&sort=${filter.name}&by=${filter.sortBy}`;
    }
    const res = await axiosJWT.get(url);
    dispatch(getAllToDos(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const apiGetById = async (user, id, dispatch) => {
  try {
    const axiosJWT = configAxios(user, dispatch);
    const res = await axiosJWT.get(`${BASE_URL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
export const apiCreate = async (user, toDo, dispatch) => {
  try {
    const axiosJWT = configAxios(user, dispatch);
    const res = await axiosJWT.post(`${BASE_URL}`, toDo);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
export const apiUpdate = async (user, toDo, dispatch) => {
  try {
    const axiosJWT = configAxios(user, dispatch);
    await axiosJWT.put(`${BASE_URL}`, toDo);
  } catch (error) {
    console.log(error.response.data);
  }
};
export const apiDelete = async (user, id, dispatch) => {
  try {
    const axiosJWT = configAxios(user, dispatch);
    await axiosJWT.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.log(error.response.data);
  }
};
