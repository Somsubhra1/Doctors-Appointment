import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      toLogin: false,
    };
  }

  submitSignupForm = (e) => {
    e.preventDefault();
    // console.log("Login submitted", this.props.test);
    // this.props.setUsername(this.state.email);
    this.setState({ toLogin: true });
  };

  render() {
    if (this.state.toLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <form className="container mt-4" onSubmit={this.submitSignupForm}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="name"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Name"
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
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
            onChange={(e) => this.setState({ password1: e.target.value })}
            value={this.state.password1}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={(e) => this.setState({ password2: e.target.value })}
            value={this.state.password2}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
