import React from "react";
import logo from "../logo.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";

const NavBar = ({ user, setUser }) => {
  const logout = async () => {
    try {
      const config = {
        headers: {
          Authorization: user.token,
        },
      };
      const res = await axios.get("/auth/logout", config);
      if (!res.data.success) {
        return;
      }
      setUser({});
      localStorage.removeItem("doctorsAppointmentUser");
    } catch (error) {}
  };
  const guestLinks = (
    <React.Fragment>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            SignUp
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );

  const userLinks = (
    <React.Fragment>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/doctors">
            Doctors
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/appointments">
            Appointments
          </NavLink>
        </li>
        {user.isAdmin ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/adddoctor">
              Add doctor
            </NavLink>
          </li>
        ) : (
          ""
        )}
        <li className="nav-item">
          <NavLink className="nav-link" to="#">
            Welcome {user.name}
          </NavLink>
        </li>
      </ul>
      <NavLink
        className="btn btn-danger ml-auto mr-4"
        type="button"
        onClick={logout}
        to="/"
      >
        Logout
      </NavLink>
    </React.Fragment>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        <img
          src={logo}
          width="50"
          height="50"
          className="d-inline-block mr-2"
          alt=""
        />
        Doctors Appointment
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {user.email ? userLinks : guestLinks}
      </div>
    </nav>
  );
};

export default NavBar;
