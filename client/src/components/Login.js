import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      toAppointments: false,
    };
  }

  submitLoginForm = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // console.log("Login submitted", this.props.test);
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { name, id, token, isAdmin } = res.data;
      const user = { email, name, id, token, isAdmin };
      localStorage.setItem("doctorsAppointmentUser", JSON.stringify(user));
      this.props.setUser(user);
      this.setState({ toAppointments: true });
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  render() {
    if (this.state.toAppointments) {
      return <Redirect to="/appointments" />;
    }
    return (
      <form className="container mt-4" onSubmit={this.submitLoginForm}>
        <div
          className="alert alert-danger d-none"
          id="alert"
          ref="alert"
          role="alert"
        >
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
            value={this.state.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
            value={this.state.password}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember Me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
