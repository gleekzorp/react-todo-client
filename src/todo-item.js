import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="todo-item">
                <input type="checkbox"/>
                <p>{this.props.item.title}</p>
            </div>
        )
    }
}

export default TodoItem;