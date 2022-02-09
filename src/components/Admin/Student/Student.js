import React from "react";
import BasicTable from "./BasicTable";
import "./Student.css";

const Student = () => {
  // const handleDeleteUser = (id) => {
  //   const proceed = window.confirm("Are you sure, you want to delete?");
  //   if (proceed) {
  //     const url = `http://localhost:5000/allFoods/${id}`;
  //     fetch(url, {
  //       method: "DELETE",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.deletedCount > 0) {
  //           alert("deleted Successfully");
  //           const remainingUsers = toRender.filter((user) => user._id !== id);
  //           setToRender(remainingUsers);
  //         }
  //       });
  //   }
  // };

  return (
    <div>
      {/* <h1>Total Foods: {toRender.length}</h1> */}
      <BasicTable></BasicTable>
    </div>
  );
};

export default Student;
