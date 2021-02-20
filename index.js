const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json()); // allows us to access req.body
// app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
}

//routes

//create todos
app.post("/todos", async (req, res) => {
  try {
    const { description } = await req.body;
    const newtodo = await pool.query(
      "INSERT INTO todo (description) values ($1) returning *",
      [description]
    );
    res.json(newtodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo ORDER BY todo_id DESC");
    res.json(todos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update todos
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const todos = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    const orderedtodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id DESC"
    );
    res.json(orderedtodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//delete todos
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deltodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
