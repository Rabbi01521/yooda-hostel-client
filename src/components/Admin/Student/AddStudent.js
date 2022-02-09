// import Select from "";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const AddStudent = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Successfully added The student");
          history.push("/student");
        }
      });
  };
  return (
    <div>
      <h1>ADD Student</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register Student input into the hook by invoking the "register" function */}
        <label htmlFor="">Student Name: </label>
        <br />
        <input {...register("name", { required: true })} />

        <br />
        {errors.name && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        {/* include validation with required or other standard HTML validation rules */}
        <label htmlFor="">Student Age: </label>
        <br />
        <input
          type="number"
          {...register("age", { min: 18, max: 30, required: true })}
        />
        <br />
        {/* errors will return when field validation fails  */}
        {errors.age && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <label htmlFor="">Student Roll: </label>
        <br />

        <input
          type="number"
          {...register("roll", { min: 1, max: 50, required: true })}
        />
        <br />
        {/* errors will return when field validation fails  */}
        {errors.roll && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <label htmlFor="">Student Class: </label>
        <br />
        <input
          type="number"
          {...register("class", { min: 1, max: 12, required: true })}
        />
        <br />
        {/* errors will return when field validation fails  */}
        {errors.class && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <label htmlFor="">Student Hall: </label>
        <br />
        <input type="text" {...register("hall", { required: true })} />
        <br />
        {/* errors will return when field validation fails  */}
        {errors.hall && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <label htmlFor="">Student Status: </label>
        <br />
        <select {...register("status")}>
          <option value="active">Active</option>
          <option value="inactive">inActive</option>
        </select>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddStudent;
