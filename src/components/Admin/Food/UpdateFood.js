import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const UpdateFood = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const history = useHistory();

  useEffect(() => {
    const url = `https://evening-stream-09071.herokuapp.com/allFoods/${foodId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, []);

  const handleName = (e) => {
    const updateName = e.target.value;
    const updatedUser = { name: updateName, price: food.price };
    setFood(updatedUser);
  };

  const handlePrice = (e) => {
    const updatePrice = e.target.value;
    const updatedUser = { name: food.name, price: updatePrice };
    setFood(updatedUser);
  };

  const handleUpdate = (e) => {
    const url = `https://evening-stream-09071.herokuapp.com/allFoods/${foodId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(food),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Updated Successfully");
          setFood({});
          history.push("/food");
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h1>Update Food: {food.name}</h1>
      <form onSubmit={handleUpdate}>
        <input onChange={handleName} type="text" value={food.name || ""} />
        <input onChange={handlePrice} type="number" value={food.price || ""} />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateFood;
