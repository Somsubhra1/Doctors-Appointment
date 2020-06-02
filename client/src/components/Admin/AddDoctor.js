import React, { useState } from "react";
import axios from "axios";

export default function AddDoctor(props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [disease, setDisease] = useState("");

  const addDoctorFormSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: props.token,
      },
    };

    const data = { name, gender, disease };

    try {
      const res = await axios.post("/admin/doctors/add", data, config);
      if (Object.keys(res.data).length !== 0) {
        document.getElementById("alert").classList.add("alert-success");
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Added doctor";
        setName("");
        setDisease("");
        setGender("Select Gender");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form className="container mt-4" onSubmit={addDoctorFormSubmit}>
      <h1>Add Doctor</h1>
      <hr />
      <div className="alert d-none" id="alert" role="alert"></div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
        <label htmlFor="exampleFormControlTextarea1">Disease</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Disease speciality"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success">
        Add Doctor
      </button>
    </form>
  );
}
