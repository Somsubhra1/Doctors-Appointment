import React, { useState } from "react";
import axios from "axios";

export default function AddAdmin(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const submitNewAdminForm = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Passwords don't match";
      return;
    }
    try {
      const data = { name, email, password: password1 };
      const config = {
        headers: {
          Authorization: props.token,
        },
      };
      const res = await axios.post("/admin/add", data, config);
      // console.log(res.data);
      if (Object.keys(res.data).length !== 0) {
        alert("New Admin added");
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };
  return (
    <form className="container mt-4" onSubmit={submitNewAdminForm}>
      <h1>Add Admin</h1>
      <hr />
      <div className="alert alert-danger d-none" id="alert" role="alert"></div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="name"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Add Admin
      </button>
    </form>
  );
}
