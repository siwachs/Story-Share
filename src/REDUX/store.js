import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./Reducers/userReducers";
import {
  deleteReducer,
  editStoryReducer,
  postStoryReducer,
  storyReducer,
  userStoriesReducer,
} from "./Reducers/storyReducers";

const reducers = combineReducers({
  loginUser: userLoginReducer,
  registerUser: userRegisterReducer,
  usersList: userListReducer,
  postStory: postStoryReducer,
  userStoriesList: userStoriesReducer,
  story: storyReducer,
  deleteStory: deleteReducer,
  editStory: editStoryReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initState = {
  loginUser: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
