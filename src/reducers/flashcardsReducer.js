import { UPDATE_FLASHCARDS } from "../actions/types";

const flashcardsReducer = (state = null, action) => {
  if (action.type === UPDATE_FLASHCARDS) {
    let flashcards = action.payload;
    return flashcards;
  }
  return state;
};

export default flashcardsReducer;
