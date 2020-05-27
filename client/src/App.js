import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Appoiments from "./components/Appointments/";
import Home from "./components/Home";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/appointments" component={Appoiments} />
            <Route path="/login" component={Login} />
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
