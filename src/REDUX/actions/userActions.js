import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from "../types";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const { data } = await axios.get("/api/users");

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    //Headers Type
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (image, name, email, password, role) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      //Form Data
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      console.log("image", image);

      const { data } = await axios.post("/api/users/register", formData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  localStorage.removeItem("userInfo");
};
