import { UPDATE_FLASHCARDS } from "../actions/types";

const categoriesReducer = (state = [], action) => {
  if (action.type === UPDATE_FLASHCARDS) {
    let flashcards = action.payload;
    let categoriesSet = new Set();
    for (let flashcard of flashcards) {
      categoriesSet.add(flashcard.category);
    }
    return Array.from(categoriesSet);
  }
  return state;
};

export default categoriesReducer;
