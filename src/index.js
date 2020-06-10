import React from 'react';
import ReactDOM from 'react-dom';

import './style.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todo: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value
    })
  }

  addTodo = (e) => {
    e.preventDefault()
    console.log(this.state, "Form submitted")
  }

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
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));