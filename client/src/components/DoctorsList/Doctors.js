import React, { Component } from "react";
import { Button, Container, Spinner } from "reactstrap";
import AppointmentModal from "./AppointmentModal";
import axios from "axios";
import _ from "lodash";

export default class Doctors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      modal: false,
      selectedDoctor: "",
      filteredDoctors: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getAllDoctors();
  }

  getAllDoctors = async () => {
    const config = {
      headers: {
        Authorization: this.props.token,
      },
    };

    try {
      const res = await axios.get("/doctors/list", config);
      this.setState({
        doctors: res.data,
        filteredDoctors: res.data,
        loaded: true,
      });
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText =
        "Error fetching doctors list";
    }
  };

  searchDoctors = (search) => {
    let filteredDoctors = this.state.doctors.filter((doctor) =>
      doctor.disease.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredDoctors });
  };

  deleteDoctor = async (id) => {
    const config = {
      headers: {
        Authorization: this.props.token,
      },
    };
    try {
      const res = await axios.delete(`/admin/doctors/delete/${id}`, config);
      const { success } = res.data;
      if (success) {
        let docts = this.state.doctors;
        let docToDelete = _.find(docts, _.matchesProperty("_id", id));
        const newDocts = _.without(docts, docToDelete);
        this.setState({
          doctors: newDocts,
          filteredDoctors: newDocts,
        });
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Error deleting doctor";
    }
  };

  toggle = () => this.setState({ modal: !this.state.modal });

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
          <h1>Doctors List</h1>
          <hr />
          <div
            className="alert alert-danger d-none"
            id="alert"
            role="alert"
          ></div>
          <form onSubmit={this.searchDoctors}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Search Doctors for the disease
              </label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter disease"
                onChange={(e) => this.searchDoctors(e.target.value)}
              />
            </div>
          </form>
          {this.state.doctors.length === 0 ? (
            <h3 className="mt-4">No doctors found</h3>
          ) : (
            <ul className="list-group mt-4">
              {this.state.filteredDoctors.map((doctor) => {
                return (
                  <li className="list-group-item" key={doctor._id}>
                    Name: {doctor.name} <br /> Gender: {doctor.gender} <br />
                    Specialization: {doctor.disease}
                    <br />
                    <Button
                      onClick={(e) => {
                        this.setState({
                          selectedDoctor: e.target.getAttribute("data-doctor"),
                        });
                        this.toggle();
                      }}
                      className="btn btn-success mt-2"
                      data-doctor={doctor.name}
                    >
                      Appoint
                    </Button>
                    {this.props.isAdmin ? (
                      <Button
                        onClick={(e) => this.deleteDoctor(doctor._id)}
                        className="btn btn-danger mt-2 ml-2"
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <AppointmentModal
          doctorName={this.state.selectedDoctor}
          modal={this.state.modal}
          toggle={this.toggle}
          email={this.props.email}
          token={this.props.token}
        />
      </div>
    );
  }
}
