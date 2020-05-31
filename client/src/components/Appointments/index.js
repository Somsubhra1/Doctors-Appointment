import React, { Component } from "react";
import _ from "lodash";
import { Container } from "reactstrap";
// import AddAppointments from "./AddAppointments";
import SearchAppointments from "./SearchAppointments";
import ListAppointments from "./ListAppointments";
import axios from "axios";

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      showAddBody: false,
      orderBy: "patientName",
      orderDir: "asc",
      searchText: "",
    };
  }

  async componentDidMount() {
    try {
      const config = {
        headers: {
          Authorization: this.props.user.token,
        },
      };
      const res = await axios.get("/appointments/list", config);
      this.setState({ appointments: res.data });
    } catch (error) {}
  }

  saveAppointment = (newAppointment) => {
    let apts = this.state.appointments;
    apts.push(newAppointment);
    this.setState({
      appointments: apts,
    });
  };
  deleteAppointment = async (aptId) => {
    try {
      const config = {
        headers: {
          Authorization: this.props.user.token,
        },
      };
      const res = await axios.delete(`/appointments/delete/${aptId}`, config);

      const { success } = res.data;

      if (success) {
        let apts = this.state.appointments;
        let aptToDelete = _.find(apts, _.matchesProperty("_id", aptId));
        const newApts = _.without(apts, aptToDelete);
        this.setState({
          appointments: newApts,
        });
      }
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  sort = (orderBy, orderDir) => {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir,
    });
  };

  search = (query) => {
    this.setState({
      searchText: query,
    });
  };

  render() {
    let filteredApts = [];
    let { orderBy, orderDir, searchText, appointments } = this.state;

    appointments.forEach((item) => {
      if (item.doctorName.toLowerCase().indexOf(searchText) !== -1) {
        filteredApts.push(item);
      }
    });

    filteredApts = _.orderBy(filteredApts, orderBy, orderDir);

    return (
      <>
        <Container className="mt-4">
          <div
            className="alert alert-danger d-none"
            id="alert"
            ref="alert"
            role="alert"
          ></div>
          {/*<AddAppointments saveApt={this.saveAppointment} />*/}
          <SearchAppointments
            sort={this.sort}
            search={this.search}
            orderBy={this.state.orderBy}
            orderDir={this.state.orderDir}
          />
          {this.state.appointments.length === 0 ? (
            <h3 className="mt-4">No appointments found</h3>
          ) : (
            <ListAppointments
              appointments={filteredApts}
              onDelete={this.deleteAppointment}
            />
          )}
        </Container>
      </>
    );
  }
}

export default Appointments;
