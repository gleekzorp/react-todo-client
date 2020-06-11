import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            done: props.todoData.done
        }
    }

    toggleDone = () => {
        // fetch(`http://localhost:5000/todo/${this.props.todoData.id}`, {
        fetch(`https://df-flask-todo-api-class.herokuapp.com/todo/${this.props.todoData.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                done: !this.props.todoData.done
            })
        })
        .then(() => {
            this.props.handleSuccessfulDone(this.props.todoData.id)
        })
        .catch(err => {
            console.log("toggleDone Error: ", err)
        })
    }

    render() {
        return (
            <div className="todo-item">
                <div className="todo-item-left">
                    <input
                        type="checkbox"
                        defaultChecked={this.state.done}
                        onClick={this.toggleDone}
                        className="checkbox"
                    />
                    <p className={this.props.todoData.done ? "done" : null}>
                        {this.props.todoData.title}
                    </p>
                </div>
                <div onClick={() => this.props.deleteTodo(this.props.todoData.id)} className="delete-btn">
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        )
    }
}

export default TodoItem