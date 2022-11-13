import { useState } from "react";
import Todo from "./todo";
import '../Estilos/TodoApp.css';

export default function TodoApp() {
  const [title, setTitle] = useState("Tarea");
  const [todos, setTodos] = useState([]);

  /* Para actualizar el evento de forma automatica (esto lo que hace es escuchar si existe algun cambio en el estado de la app) */
  function handleChange(e) {
    const value = e.target.value;

    setTitle(value);
  }

  function handleSutmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const temp = [...todos];
    temp.unshift(newTodo);

    setTodos(temp);

    setTitle('')
  }

  function handleUpdate(id, value){
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id){
    const temp = todos.filter(item => item.id !== id);

    setTodos(temp);
  }

  return (
    <div className="todoContainer">
      <form className="todoCreateForm" onSubmit={handleSutmit}>
        <input onChange={handleChange} className="todoInput" value={title} />

        <input
          onClick={handleSutmit}
          type="submit"
          value="Create todo"
          className="buttonCreate"
        />
      </form>

      <div className="todosContainer">
        {todos.map((item) => (
          <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
