import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Distributions = () => {
  const [displayStudents, setDisplayStudents] = useState([]);
  const [distribution, setDistribution] = useState([]);

  const [registerData, setRegisterData] = useState({});
  const [students, setStudents] = useState(...displayStudents);

  useEffect(() => {
    fetch("https://evening-stream-09071.herokuapp.com/students")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDisplayStudents(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://evening-stream-09071.herokuapp.com/distribution")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDistribution(data);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(registerData);
    const toServed = distribution.find(
      (data) =>
        data.studentId === registerData.studentId &&
        data.date === registerData.date &&
        data.shift === registerData.shift &&
        data.status === registerData.status
    );
    console.log(toServed);
    if (toServed) {
      alert("Already Served");
      return;
    } else {
      fetch("https://evening-stream-09071.herokuapp.com/distribution", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(registerData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            alert("Successfully added The distribution");
          }
        });
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newRegisterData = { ...registerData };
    newRegisterData[field] = value;
    console.log(newRegisterData);
    setRegisterData(newRegisterData);
  };

  // search
  const handleOnChange = (e) => {
    const temp = [];
    const searchText = e.target.value;
    for (let i = 0; i < displayStudents.length; i++) {
      if (displayStudents[i].roll.includes(searchText)) {
        temp.push(displayStudents[i]);
      }
    }
    setStudents(temp);
  };

  console.log(students);

  return (
    <div>
      <h1>Distribution</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div>
          <span>Search by Roll</span>
          <br />
          <TextField
            type="number"
            aria-label="Min"
            aria-describedby="basic-addon1"
            min={8}
            max={30}
            onChange={(e) => handleOnChange(e)}
          />

          <div>
            {students?.map((student) => {
              return (
                <div
                  key={student._id}
                  style={{ textAlign: "left", margin: "10px" }}
                >
                  <span>Student ID : {student._id}</span>
                  <br />
                  <span>Student name : {student.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <label htmlFor="">Student Id: </label>
          <br />
          <input
            onChange={handleChange}
            name="studentId"
            type="text"
            required
          />
          <br />
          <label htmlFor="">Date: </label>
          <br />
          <input
            type="date"
            name="date"
            //   onChange={handleAge}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="">Shift: </label>
          <br />
          <select
            // onChange={handleStatus}
            name="shift"
            onChange={handleChange}
            required
          >
            <option value="morning">Morning</option>
            <option value="day">Day</option>
          </select>
          <br />
          <br />
          <label htmlFor="">Status: </label>
          <br />
          <select
            name="status"
            onChange={handleChange}
            required
            // onChange={handleStatus}
          >
            <option value="served">Served</option>
            <option value="notServed">Not Served</option>
          </select>
          <br />
          <br />
          <label htmlFor="">FootList Items: </label>
          <br />
          <textarea
            name="foodItems"
            onChange={handleChange}
            rows={2}
            column={3}
            type="text"
            required
            //   onChange={handleClass}
          />
          <br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Distributions;
