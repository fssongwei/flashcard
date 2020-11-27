import { Router, Route } from "react-router-dom";
import history from "./tools/history";
import CreateFlashcard from "./pages/CreateFlashcard";
import Flashcards from "./pages/Flashcards";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router history={history}>
        <Navbar />
        <Route path="/" exact component={Flashcards} />
        <Route path="/add" exact component={CreateFlashcard} />
      </Router>
    </div>
  );
}

export default App;
