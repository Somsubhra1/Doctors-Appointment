import React from "react";
import logo from "../logo.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home 
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
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
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
