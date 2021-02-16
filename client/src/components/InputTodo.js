import React, { useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("");
  // console.log(description);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      setDescription("");
      window.location.reload();
      // console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mt-5">
        <input
          type="text"
          onChange={handleChange}
          value={description}
          className="form-control"
          placeholder="Enter item"
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default InputTodo;
