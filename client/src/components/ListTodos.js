import React, { useState, useEffect } from "react";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/todos");
      const data = await response.json();
      setTodos(data);
      //   console.log(todos);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteData = async id => {
    await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(
      todos.filter(todo => {
        return todo.todo_id !== id;
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(todos);
  return (
    <div>
      <ul className="list-group mt-5">
        {todos.map(todo => (
          <li key={todo.todo_id} className="list-group-item ">
            <span>{todo.description}</span>
            <div className="float-right">
              <EditTodo todo={todo} />
              <button
                onClick={() => deleteData(todo.todo_id)}
                className="btn btn-outline-secondary ml-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditTodo({ todo }) {
  const [description, setDescription] = useState(todo.description);

  const EditText = async id => {
    await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify({ description }),
    });
    console.log(description);
    // window.location.reload();
  };

  return (
    <>
      {/* button to open the modal */}
      <button
        type="button"
        className="btn btn-outline-secondary"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* the modal */}
      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* modal header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit item</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            {/* modal body */}
            <div className="modal-body">
              <form onSubmit={() => EditText(todo.todo_id)}>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="form-control"
                />
              </form>
            </div>

            {/* modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
                onClick={() => EditText(todo.todo_id)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListTodos;
