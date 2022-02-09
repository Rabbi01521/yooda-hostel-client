import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Food = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [displayRiders, setDisplayFoods] = useState([]);

  const [toRender, setToRender] = useState([...displayRiders]);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allFoods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const size = 5;
  useEffect(() => {
    fetch(`http://localhost:5000/food?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setDisplayFoods(data.foods);
        setToRender(data.foods);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  //   DELETE an food
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

  return (
    <div>
      <h1>Total Foods: {toRender.length}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Food Id</TableCell>
              <TableCell align="right">Food Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toRender.map((data) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data._id}
                </TableCell>
                <TableCell align="right">{data.name}</TableCell>
                <TableCell align="right">{data.price}</TableCell>
                <TableCell align="right">
                  <Link to={`/food/${data._id}`}>Edit</Link>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDeleteUser(data._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Food;
