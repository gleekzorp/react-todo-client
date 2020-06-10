import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            done: props.todoData.done
        }
    }

    toggleDone = () => {
        fetch(`http://localhost:5000/todo/${this.props.todoData.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                done: !this.state.done
            })
        })
        .then(() => {
            this.setState({
                done: !this.state.done
            })
        })
        .catch(err => {
            console.log("toggleDone Error: ", err)
        })
    }

    render() {
        return (
            <div className="todo-item">
                <input
                    type="checkbox"
                    defaultChecked={this.state.done}
                    onClick={this.toggleDone}
                />
                <p className={this.state.done ? "done" : null}>
                    {this.props.todoData.title}
                </p>
                <button onClick={() => this.props.deleteTodo(this.props.todoData.id)}>X</button>
            </div>
        )
    }
}

export default TodoItem