import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Add from "./pages/Add";
import Flashcards from "./pages/Flashcards";
import Flashcard from "./pages/Flashcard";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, fetchFlashcards } from "./actions";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) dispatch(fetchFlashcards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user === null) {
    return <div>loading</div>;
  }

  if (user === false) {
    window.location.replace("/welcome");
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/add" exact component={Add} />
          <Route path="/categories/:category" exact component={Flashcards} />
          <Route path="/flashcard/:id" exact component={Flashcard} />
          <Route path="/edit/:id" exact component={Add} />
          <Route path="/" component={Flashcards} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
