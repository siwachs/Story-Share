import {
  DELETE_FAIL,
  DELETE_SUCCESS,
  POST_FAIL,
  POST_REQUEST,
  POST_SUCCESS,
  STORIES_FAIL,
  STORIES_REQUEST,
  STORIES_SUCCESS,
  STORY_FAIL,
  STORY_REQUEST,
  STORY_SUCCESS,
  DELETE_REQUEST,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAIL,
} from "../types";
import axios from "axios";

export const postStory = (uid, image, title, story) => async (dispatch) => {
  try {
    dispatch({
      type: POST_REQUEST,
    });

    //Form Data
    const formData = new FormData();
    formData.append("image", image);
    formData.append("uid", uid);
    formData.append("title", title);
    formData.append("story", story);

    const { data } = await axios.post("/api/stories", formData);

    dispatch({
      type: POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserStories = (uid) => async (dispatch) => {
  try {
    dispatch({
      type: STORIES_REQUEST,
    });

    const { data } = await axios.get(`/api/stories/${uid}`);

    dispatch({
      type: STORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: STORY_REQUEST,
    });

    const { data } = await axios.get(`/api/stories/story/${id}`);

    dispatch({
      type: STORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/stories/${id}`);

    dispatch({
      type: DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editStory = (id, story, title) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_REQUEST,
    });

    //Headers Type
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.patch(
      `/api/stories/${id}`,
      { story, title },
      config
    );

    dispatch({
      type: EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
