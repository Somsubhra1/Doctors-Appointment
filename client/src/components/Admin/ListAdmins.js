import React, { Component } from "react";
import { Button, Container, Spinner } from "reactstrap";
import axios from "axios";
import _ from "lodash";

export default class ListAdmins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admins: [],
      loaded: false,
      filteredAdmins: [],
    };
  }

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: this.props.token,
      },
    };
    try {
      const res = await axios.get("/admin/list", config);
      this.setState({
        admins: res.data,
        filteredAdmins: res.data,
        loaded: true,
      });
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Error listing admins";
    }
  }

  searchAdmins = (search) => {
    let filteredAdmins = this.state.admins.filter((admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredAdmins });
  };

  deleteAdmin = async (id) => {
    const config = {
      headers: {
        Authorization: this.props.token,
      },
    };
    try {
      const res = await axios.delete(`/admin/delete/${id}`, config);
      const { success } = res.data;
      if (success) {
        let admins = this.state.admins;
        let adminToDelete = _.find(admins, _.matchesProperty("_id", id));
        const newAdmins = _.without(admins, adminToDelete);
        this.setState({
          admins: newAdmins,
          filteredAdmins: newAdmins,
        });
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Error deleting admin";
    }
  };

  render() {
    if (!this.state.loaded) {
      return (
        <React.Fragment>
          <Container
            className="mt-4"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "50vh",
              alignItems: "center",
            }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
        </React.Fragment>
      );
    }
    return (
      <div>
        <div className="container mt-4">
          <h1>Admins List</h1>
          <hr />
          <div
            className="alert alert-danger d-none"
            id="alert"
            role="alert"
          ></div>
          <form onSubmit={this.searchAdmins}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Search Admins</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter admin name"
                onChange={(e) => this.searchAdmins(e.target.value)}
              />
            </div>
          </form>
          {this.state.admins.length === 0 ? (
            <h3 className="mt-4">No Admins found</h3>
          ) : (
            <ul className="list-group mt-4">
              {this.state.filteredAdmins.map((admin) => {
                return (
                  <li className="list-group-item" key={admin._id}>
                    Name: {admin.name} <br /> Email:{" "}
                    <a style={{ color: "#00f" }} href={`mailto:${admin.email}`}>
                      {admin.email}
                    </a>{" "}
                    <br />
                    <Button
                      onClick={(e) => this.deleteAdmin(admin._id)}
                      className="btn btn-danger mt-2"
                      data-doctor={admin.name}
                    >
                      Delete
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
