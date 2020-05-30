import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      toAppointments: false,
    };
  }

  submitLoginForm = (e) => {
    e.preventDefault();
    // console.log("Login submitted", this.props.test);
    this.props.setUser({ email: this.state.email, name: "abs", id: 1 });
    this.setState({ toAppointments: true });
  };

  render() {
    if (this.state.toAppointments) {
      return <Redirect to="/appointments" />;
    }
    return (
      <form className="container mt-4" onSubmit={this.submitLoginForm}>
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
