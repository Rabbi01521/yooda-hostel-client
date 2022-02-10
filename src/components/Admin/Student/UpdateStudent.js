import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const { id } = useParams();
  const [students, setStudents] = useState({});
  const history = useHistory();

  useEffect(() => {
    const url = `https://evening-stream-09071.herokuapp.com/student/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [id]);

  const handleName = (e) => {
    const updateName = e.target.value;
    const updatedStudent = {
      name: updateName,
      age: students.age,
      roll: students.roll,
      class: students.class,
      hall: students.hall,
      status: students.status,
    };
    setStudents(updatedStudent);
  };

  const handleAge = (e) => {
    const updateAge = e.target.value;
    const updatedStudent = {
      name: students.name,
      age: updateAge,
      roll: students.roll,
      class: students.class,
      hall: students.hall,
      status: students.status,
    };
    setStudents(updatedStudent);
  };

  const handleRoll = (e) => {
    const updateRoll = e.target.value;
    const updatedStudent = {
      name: students.name,
      age: students.age,
      roll: updateRoll,
      class: students.class,
      hall: students.hall,
      status: students.status,
    };
    setStudents(updatedStudent);
  };

  const handleClass = (e) => {
    const updateClass = e.target.value;
    const updatedStudent = {
      name: students.name,
      age: students.age,
      roll: students.roll,
      class: updateClass,
      hall: students.hall,
      status: students.status,
    };
    setStudents(updatedStudent);
  };

  const handleHall = (e) => {
    const updateHall = e.target.value;
    const updateStudent = {
      name: students.name,
      age: students.age,
      roll: students.roll,
      class: students.class,
      hall: updateHall,
      status: students.status,
    };
    setStudents(updateStudent);
  };

  const handleStatus = (e) => {
    const updateStatus = e.target.value;
    const updateStudent = {
      name: students.name,
      age: students.age,
      roll: students.roll,
      class: students.class,
      hall: students.hall,
      status: updateStatus,
    };
    setStudents(updateStudent);
  };

  const handleUpdate = (e) => {
    const url = `https://evening-stream-09071.herokuapp.com/student/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(students),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Updated Successfully");
          setStudents({});
          history.push("/student");
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h1>Update student : {id}</h1>
      <form onSubmit={handleUpdate}>
        <label htmlFor="">Student Name: </label>
        <br />
        <input onChange={handleName} type="text" value={students.name || ""} />
        <br />
        <label htmlFor="">Student Age: </label>
        <br />
        <input
          max={20}
          min={8}
          onChange={handleAge}
          type="number"
          value={students.age || ""}
        />
        <br />
        <br />
        <label htmlFor="">Student Roll: </label>
        <br />

        <input
          type="number"
          max={100}
          min={1}
          onChange={handleRoll}
          value={students.roll || ""}
        />
        <br />
        <br />
        <label htmlFor="">Student Class: </label>
        <br />
        <input
          type="number"
          max={12}
          min={1}
          onChange={handleClass}
          value={students.class || ""}
        />
        <br />
        <br />
        <label htmlFor="">Student Hall: </label>
        <br />
        <input type="text" onChange={handleHall} value={students.hall || ""} />
        <br />
        <label htmlFor="">Student Status: </label>
        <br />
        <select onChange={handleStatus} defaultValue={students.status || ""}>
          <option value="active">Active</option>
          <option value="inactive">inActive</option>
        </select>
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateStudent;
