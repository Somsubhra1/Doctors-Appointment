import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const AppointmentModal = (props) => {
  const { doctorName, modal, toggle, email } = props;
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Select Gender");
  const [illness, setIllness] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    const data = {
      email,
      doctorName,
      patientName,
      age,
      gender,
      date: appointmentDate,
      description: illness,
    };
    const config = {
      headers: {
        Authorization: props.token,
      },
    };
    try {
      const res = await axios.post("/appointments/add", data, config);
      if (Object.keys(res.data).length === 0) {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Error adding appointment";
      } else {
        alert("Added appointment successfully");
      }
      toggle();
      setPatientName("Select Gender");
      setAge(0);
      setGender("Select Gender");
      setIllness("");
      setAppointmentDate("");
    } catch (error) {
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = error.response.data.error;
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Appointment for {doctorName}</ModalHeader>
        <ModalBody>
          <form onSubmit={submitAppointmentForm}>
            <div
              className="alert alert-danger d-none"
              id="alert"
              role="alert"
            ></div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                disabled
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Doctor Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Doctor Name"
                value={doctorName}
                disabled
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Patient name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter patient name"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                max="100"
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Gender</label>
              <select
                className="custom-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option defaultValue>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Date of Appointment</label>
              <input
                type="date"
                className="form-control"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Describe your illness
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={illness}
                onChange={(e) => setIllness(e.target.value)}
                placeholder="Describe your illness with symptoms"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Make Appointment
            </button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppointmentModal;
