import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Appoiments from "./components/Appointments/";
import Home from "./components/Home";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("doctorsAppointmentUser");
      }
    }
  }

  render() {
    return (
      <>
        <Router>
          <NavBar user={this.state.user} setUser={this.setUser} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/signup"
              render={() =>
                Object.keys(this.state.user).length === 0 ? (
                  <Signup />
                ) : (
                  <Redirect to="/appointments" />
                )
              }
            />
            <Route
              path="/login"
              render={() =>
                Object.keys(this.state.user).length === 0 ? (
                  <Login setUser={this.setUser} />
                ) : (
                  <Redirect to="/appointments" />
                )
              }
            />
            <Route
              path="/appointments"
              render={() =>
                Object.keys(this.state.user).length !== 0 ? (
                  <Appoiments user={this.state.user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/doctors"
              render={() =>
                Object.keys(this.state.user).length !== 0 ? (
                  <Doctors
                    token={this.state.user.token}
                    email={this.state.user.email}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
