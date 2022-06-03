import {
  DELETE_FAIL,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  POST_FAIL,
  POST_REQUEST,
  POST_SUCCESS,
  STORIES_FAIL,
  STORIES_REQUEST,
  STORIES_SUCCESS,
  STORY_FAIL,
  STORY_REQUEST,
  STORY_SUCCESS,
} from "../types";

export const postStoryReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_REQUEST:
      return {
        loading: true,
      };
    case POST_SUCCESS:
      return {
        loading: false,
        post: payload,
      };
    case POST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const editStoryReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case EDIT_REQUEST:
      return {
        _loading: true,
      };
    case EDIT_SUCCESS:
      return {
        _loading: false,
        post: payload,
      };
    case POST_FAIL:
      return {
        _loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const storyReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case STORY_REQUEST:
      return {
        loading: true,
      };
    case STORY_SUCCESS:
      return {
        loading: false,
        story: payload,
      };
    case STORY_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const deleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_REQUEST:
      return {
        _loading: true,
      };
    case DELETE_SUCCESS:
      return {
        _loading: false,
        isDeleted: payload,
      };
    case DELETE_FAIL:
      return {
        _loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userStoriesReducer = (state = { stories: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case STORIES_REQUEST:
      return {
        loading: true,
      };
    case STORIES_SUCCESS:
      return {
        loading: false,
        stories: payload,
      };
    case STORIES_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
