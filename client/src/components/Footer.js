import React from "react";
import { NavbarBrand } from "reactstrap";

const Footer = () => {
  return (
    <footer className="p-2">
      <NavbarBrand color="dark" style={{ color: "#fff" }}>
        &copy; Copyright Doctors Appointment App {new Date().getFullYear()}
      </NavbarBrand>
    </footer>
  );
};

export default Footer;
