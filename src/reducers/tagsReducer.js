import { UPDATE_FLASHCARDS } from "../actions/types";

const tagsReducer = (state = [], action) => {
  if (action.type === UPDATE_FLASHCARDS) {
    let flashcards = action.payload;
    let tags = new Set();
    for (let flashcard of flashcards) {
      for (let tag of flashcard.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags);
  }
  return state;
};

export default tagsReducer;
