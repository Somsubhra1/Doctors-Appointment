import React from "react";
import logo from "../logo.svg";
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "reactstrap";

const NavBar = () => {
  return (
    <header>
      <Navbar color="dark">
        <NavbarBrand href="/" className="text-white">
          <img
            src={logo}
            height="48"
            className="d-inline-block align-center"
            alt="logo"
          />{" "}
          Doctor Appointments
        </NavbarBrand>
        <Nav className="mr-auto">
          <NavItem>
            <NavLink href="/login/">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/appointments">Appointments</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;
