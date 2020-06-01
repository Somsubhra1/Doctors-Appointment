import React, { Component } from "react";
import { Button } from "reactstrap";
import AppointmentModal from "./AppointmentModal";

export default class Doctors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      modal: false,
      selectedDoctor: "",
      filteredDoctors: [],
    };
  }

  componentDidMount() {
    this.getAllDoctors();
  }

  getAllDoctors = () => {
    fetch("./doctors.json")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          doctors: data,
          filteredDoctors: data,
        })
      )
      .catch((error) =>
        console.log("There has been a problem with fetching doctors.")
      );
  };

  searchDoctors = (search) => {
    let filteredDoctors = this.state.doctors.filter((doctor) =>
      doctor.disease.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ filteredDoctors });
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <div>
        <div className="container mt-4">
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
          <ul className="list-group mt-4">
            {this.state.filteredDoctors.map((doctor) => {
              return (
                <li className="list-group-item" key={doctor.id}>
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
                </li>
              );
            })}
          </ul>
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
