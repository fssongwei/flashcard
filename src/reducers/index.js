import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import flashcardsReducer from "./flashcardsReducer";
import tagsReducer from "./tagsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  flashcards: flashcardsReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  user: userReducer,
});
