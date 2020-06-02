import React, { useState } from "react";
import axios from "axios";

export default function Profile(props) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const profileFormSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Passwords don't match";
      return;
    }
    const data = { password: password1 };
    const config = {
      headers: {
        Authorization: props.user.token,
      },
    };
    try {
      const res = await axios.patch(
        "/auth/profile/updatepassword",
        data,
        config
      );
      console.log(res.data);
      if (!res.data.success) {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Couldn't update password";
        return;
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  return (
    <div className="container">
      <form className="mt-4" onSubmit={profileFormSubmit}>
        <div
          className="alert alert-danger d-none"
          id="alert"
          role="alert"
        ></div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={props.user.email}
            disabled
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="name"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Name"
            value={props.user.name}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update Profile
        </button>
      </form>
    </div>
  );
}
