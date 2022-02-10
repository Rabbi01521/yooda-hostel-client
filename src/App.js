import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin/Admin";
import Distributions from "./components/Admin/Distributions/Distributions/Distributions";
import AddFood from "./components/Admin/Food/AddFood";
import Food from "./components/Admin/Food/Food";
import UpdateFood from "./components/Admin/Food/UpdateFood";
import AddStudent from "./components/Admin/Student/AddStudent";
import Student from "./components/Admin/Student/Student";
import UpdateStudent from "./components/Admin/Student/UpdateStudent";
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
          <Route exact path="/student">
            <Student />
          </Route>
          <Route path="/student/:id">
            <UpdateStudent></UpdateStudent>
          </Route>
          <Route path="/distribution">
            <Distributions></Distributions>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
