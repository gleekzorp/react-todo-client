import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="todo-item">
                <input type="checkbox" />
                <p>{this.props.todoData.title}</p>
            </div>
        )
    }
}

export default TodoItem