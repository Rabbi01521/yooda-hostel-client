import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin/Admin";
import AddFood from "./components/Admin/Food/AddFood";
import Food from "./components/Admin/Food/Food";
import UpdateFood from "./components/Admin/Food/UpdateFood";
import AddStudent from "./components/Admin/Student/AddStudent";
import Student from "./components/Admin/Student/Student";
import Navbar from "./components/Shared/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Admin />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/addFood">
            <AddFood></AddFood>
          </Route>
          <Route exact path="/food">
            <Food />
          </Route>
          <Route path="/food/:foodId">
            <UpdateFood></UpdateFood>
          </Route>
          <Route path="/AddStudent">
            <AddStudent />
          </Route>
          <Route path="/student">
            <Student />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
