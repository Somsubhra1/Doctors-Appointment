import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Appoiments from "./components/Appointments/";
import Home from "./components/Home";
import Login from "./components/Login";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Doctors from "./components/DoctorsList/Doctors";
import Signup from "./components/Signup";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  setUser = (user) => {
    this.setState({ user });
  };

  async componentDidMount() {
    if (!localStorage.getItem("doctorsAppointmentUser")) {
      return;
    }
    const config = {
      headers: {
        Authorization: JSON.parse(
          localStorage.getItem("doctorsAppointmentUser")
        ).token,
      },
    };
    try {
      const res = await axios.get("/auth/profile", config);
      const { email, id, name } = res.data;
      const token = JSON.parse(localStorage.getItem("doctorsAppointmentUser"))
        .token;

      this.setUser({ email, id, name, token });
    } catch (error) {}
  }

  render() {
    return (
      <>
        <Router>
          <NavBar user={this.state.user} setUser={this.setUser} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" render={() => (<Signup user={this.state.user} />)} />
            <Route
              path="/login"
              render={() => (
                <Login user={this.state.user} setUser={this.setUser} />
              )}
            />
            <Route
              path="/appointments"
              render={() => <Appoiments user={this.state.user} />}
            />
            <Route
              path="/doctors"
              render={() => (
                <Doctors user={this.state.user} email={this.state.user.email} />
              )}
            />
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
