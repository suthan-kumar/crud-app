import { Redirect, Route, Switch } from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";
import User from "./pages/User";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h2 className="text-center mt-3">CRUD Application</h2>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={User} />
        <Route exact path="/post/:id" component={Post} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
