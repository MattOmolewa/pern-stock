import "./App.scss";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <div className="container top">
      <h1 className="text-center mt-5">Stocker</h1>
      <InputTodo />
      <ListTodos />
    </div>
  );
}

export default App;
