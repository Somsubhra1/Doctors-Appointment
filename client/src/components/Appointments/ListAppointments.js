import React from "react";
import { Media, Button } from "reactstrap";

const ListAppointments = ({ appointments, onDelete }) => {
  const handleDelete = (event) => {
    onDelete(event.target.id);
  };
  return (
    <ul>
      {appointments.map((item) => {
        return (
          <li
            className="p-1 card-border shadow-sm p-3 mb-3 bg-white rounded"
            style={{ borderRadius: "0.25rem" }}
            key={item._id}
          >
            <Media>
              <Media left top>
                <Button color="danger" className="mr-3 delete-btn">
                  <i
                    id={item._id}
                    onClick={handleDelete}
                    className="fas fa-times"
                  ></i>
                </Button>
              </Media>
              <Media body>
                <Media heading className="m-0">
                  {item.doctorName}
                </Media>
                <p className="mt-4 mb-0">
                  <span className="font-weight-bold">Patient Name:</span>{" "}
                  {item.patientName} <br />
                  <span className="font-weight-bold">Age:</span> {item.age}{" "}
                  <br />
                  <span className="font-weight-bold">Gender:</span>{" "}
                  {item.gender}
                </p>
                <p>
                  <span className="font-weight-bold">Problem:</span>{" "}
                  {item.description}
                </p>
                <p className="mb-0">
                  <span className="font-weight-bold">Checkup time:</span>{" "}
                  {item.date}
                </p>
              </Media>
            </Media>
          </li>
        );
      })}
    </ul>
  );
};

export default ListAppointments;
