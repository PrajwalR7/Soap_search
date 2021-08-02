import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Signin from "..\\Components\\Signin.js"
import Signup from "..\\Components\\Signup.js"
import Home from "..\\Components\\home.js"

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <Route path="/signin" component={Signin}>
          </Route>
          <Route path="/signup" component={Signup}>
        </Route>
        </Switch>
      </div>
    </Router>
  );
}
