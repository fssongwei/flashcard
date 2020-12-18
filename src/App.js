import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Add from "./pages/Add";
import Flashcards from "./pages/Flashcards";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, fetchFlashcards } from "./actions";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    console.log(user);
    if (user) dispatch(fetchFlashcards());
  }, [user]);

  if (user === null) {
    return <div>loading</div>;
  }

  if (user === false) {
    return (
      <div>
        <a
          href={`${process.env.REACT_APP_AUTH_HOST}?origin=${window.location.href}`}
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/add" exact component={Add} />
          <Route path="/categories/:category" exact component={Flashcards} />
          <Route path="/" component={Flashcards} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
