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

export const userListReducer = (
  state = {
    users: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
