import axios from "axios";
import { FETCH_USER, LOGOUT, UPDATE_FLASHCARDS } from "./types";
import { message } from "antd";

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`/auth/user`);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const fetchFlashcards = () => async (dispatch) => {
  try {
    let flashcards = (await axios.get("/api/flashcards")).data;
    dispatch({ type: UPDATE_FLASHCARDS, payload: flashcards });
  } catch (error) {
    // show some error message
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    dispatch({ type: LOGOUT, payload: false });
  } catch (error) {
    // dispatch({ type: LOGOUT, payload: false });
  }
};

export const createFlashcard = (flashcard, history) => async (dispatch) => {
  try {
    let createdFlashcard = (await axios.post("/api/flashcards/add", flashcard))
      .data;
    let flashcards = (await axios.get("/api/flashcards")).data;
    dispatch({ type: UPDATE_FLASHCARDS, payload: flashcards });
    history.push(`/categories/${createdFlashcard.category}`);
    message.info("Flashcard create success!");
  } catch (error) {
    // show some error message
  }
};
