import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Appoiments from "./components/Appointments/";
import Home from "./components/Home";
import Login from "./components/Login";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Doctors from "./components/DoctorsList/Doctors";
import Signup from "./components/Signup";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
    };
  }

  setUsername = (username) => {
    this.setState({ username });
  };

  render() {
    return (
      <>
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/appointments" component={Appoiments} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={() => <Login setUsername={this.setUsername} />}
            />
            <Route path="/doctors" render={() => <Doctors />} />
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
