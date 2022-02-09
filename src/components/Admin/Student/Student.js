// import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import "./Student.css";

const Student = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [displayStudents, setDisplayStudents] = useState([]);

  const [toRender, setToRender] = useState([...displayStudents]);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const size = 5;
  useEffect(() => {
    fetch(`http://localhost:5000/student?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setDisplayStudents(data.students);
        setToRender(data.students);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  const handleDeleteUser = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/allFoods/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted Successfully");
            const remainingUsers = toRender.filter((user) => user._id !== id);
            setToRender(remainingUsers);
          }
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "FullName", headerName: "Full name", width: 150 },
    { field: "Roll", headerName: "Roll", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 150,
    },
    {
      field: "Class",
      headerName: "Class",
      type: "number",
      width: 150,
    },
    {
      field: "Hall",
      headerName: "Hall",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },
  ];

  console.log(toRender);

  const rows = [
    {
      id: `${toRender?._id}`,
      FullName: `${toRender?.name}`,
      firstName: "Jon",
      age: 35,
    },
  ];

  return (
    <div>
      {/* <h1>Total Foods: {toRender.length}</h1> */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? "selected" : ""}
            key={number}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Student;
