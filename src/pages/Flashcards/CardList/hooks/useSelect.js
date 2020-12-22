import { useState } from "react";

const isFlashcardSelected = (flashcard, selectedTags) => {
  for (let tag of flashcard.tags) {
    if (selectedTags.indexOf(tag) >= 0) return true;
  }
  return false;
};

const useSelect = (flashcards) => {
  const [selectedTags, setSelectedTags] = useState([]);
  let selectedFlashcards = []; // flashcards that will be display based on filter

  if (selectedTags.length === 0) {
    selectedFlashcards = flashcards;
  } else {
    selectedFlashcards = flashcards.filter((flashcard) => {
      return isFlashcardSelected(flashcard, selectedTags);
    });
  }

  return [selectedFlashcards, selectedTags, setSelectedTags];
};

export default useSelect;
