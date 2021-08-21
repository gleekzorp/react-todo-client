import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./style.css";
import TodoItem from "./TodoItem";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };

  handleSuccessfulDone = (id) => {
    let todos = this.state.todos;
    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    });
    this.setState({
      todos: todos,
    });
  };

  addTodo = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      // url: "http://localhost:5000/todo",
      url: "https://df-flask-todo-api-class.herokuapp.com/todo",
      headers: { "content-type": "application/json" },
      data: {
        title: this.state.todo,
        done: false,
      },
    })
      .then((res) => {
        this.setState({
          todos: [...this.state.todos, res.data],
          todo: "",
        });
      })
      .catch((err) => {
        console.log("addTodo Error: ", err);
      });
  };

  deleteTodo = (id) => {
    // fetch(`http://localhost:5000/todo/${id}`, {
    fetch(`https://df-flask-todo-api-class.herokuapp.com/todo/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState({
          todos: this.state.todos.filter((todo) => {
            return todo.id !== id;
          }),
        });
      })
      .catch((err) => {
        console.log("DeleteItem Error: ", err);
      });
  };

  deleteFinishedTodos = () => {
    let finished_todos = this.state.todos.filter((todo) => {
      return todo.done === true;
    });
    axios.all(
      finished_todos.map((finished_todo) => {
        axios({
          // url: `http://localhost:5000/todo/${finished_todo.id}`,
          url: `https://df-flask-todo-api-class.herokuapp.com/todo/${finished_todo.id}`,
          method: "delete",
        })
          .then(() => {
            this.setState((prevState) => ({
              todos: prevState.todos.filter((todo) => {
                return todo.id !== finished_todo.id;
              }),
            }));
          })
          .catch((err) => {
            console.log("deleteFinishedTodos Error", err);
          });
      })
    );
  };

  componentDidMount() {
    // fetch("http://localhost:5000/todos")
    fetch("https://df-flask-todo-api-class.herokuapp.com/todos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          todos: data,
        });
      })
      .catch((err) => {
        console.log("FetchTodos Error: ", err);
      });
  }

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todoData={todo}
          deleteTodo={this.deleteTodo}
          handleSuccessfulDone={this.handleSuccessfulDone}
        />
      );
    });
  };

  render() {
    return (
      <div className="app">
        <h1>ToDo List</h1>
        <form className="add-todo" onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
        {this.state.todos.length > 1 ? (
          <button className="delete-all-btn" onClick={this.deleteFinishedTodos}>
            Delete Finished Todos
          </button>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
