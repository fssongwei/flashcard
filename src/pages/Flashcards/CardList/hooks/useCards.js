import { useSelector } from "react-redux";

// Get flashcards and tags under the choose category;
const useFlashcards = (category) => {
  const allFlashcards = useSelector((state) => state.flashcards);

  let flashcards = []; // flashcards under the category
  let tags = []; // tags of the flashcards under the category

  let tagsSet = new Set();
  flashcards = allFlashcards.filter((flashcard) => {
    if (!category || flashcard.category === category) {
      flashcard.tags.forEach((tag) => tagsSet.add(tag));
      return true;
    }
    return false;
  });
  tags = Array.from(tagsSet);

  return [flashcards, tags];
};

export default useFlashcards;
