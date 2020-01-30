import React from 'react';
import './Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    renderDeleteButton = () => {
        if (this.state.isShown) {
            return <i className="fa fa-trash" onClick={this.removeTask}></i>;
        }
    };

    showDeleteButton = () => {
        this.setState({
            isShown: true
        });
    };

    hideDeleteButton = () => {
        this.setState({
            isShown: false
        });
    };

    completeTask = () => {
        this.props.completeTask(this.props.task);
    };

    removeTask = () => {
        if (this.props.isRemoval) {
            this.props.onRemove(this.props.task);
        }
    };

    render() {
        return (
            <div
                className="Task"
                onMouseEnter={this.showDeleteButton}
                onMouseLeave={this.hideDeleteButton}
            >
                <div className="TaskName">{this.props.taskName}</div>
                <div className="Priority">{this.props.priority}</div>
                <label className="TaskStatus">
                    <input
                        label="checkbox"
                        type="checkbox"
                        onChange={this.completeTask}
                        checked={this.props.completed}
                    />
                    <span className="Checkbox"></span>
                </label>
                <div className="DeleteTask">{this.renderDeleteButton()}</div>
            </div>
        );
    }
}

export default Task;