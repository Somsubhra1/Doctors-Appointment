import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AppointmentModal = (props) => {
  const { doctorName, modal, toggle, email } = props;
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Select Gender");
  const [illness, setIllness] = useState("");

  const submitAppointmentForm = (e) => {
    e.preventDefault();
    console.log("Works");
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Appointment for {doctorName}</ModalHeader>
        <ModalBody>
          <form onSubmit={submitAppointmentForm}>
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
