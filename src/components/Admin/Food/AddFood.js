import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const AddFood = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:5000/foods", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Successfully added The User");
          history.push("/food");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <div>
      <h1>ADD Food</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="">Food Name: </label>
        <br />
        <input {...register("name", { required: true })} />

        <br />
        {errors.name && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        {/* include validation with required or other standard HTML validation rules */}
        <label htmlFor="">Food Price: </label>
        <br />
        <input type="number" {...register("price", { required: true })} />
        <br />
        {/* errors will return when field validation fails  */}
        {errors.price && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddFood;
