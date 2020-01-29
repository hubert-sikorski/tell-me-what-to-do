import React from 'react';
import './Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShown: false,
        };

        this.renderDeleteButton = this.renderDeleteButton.bind(this);
        this.showDeleteButton = this.showDeleteButton.bind(this);
        this.hideDeleteButton = this.hideDeleteButton.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    renderDeleteButton() {
        if (this.state.isShown) {
            return <i className="fa fa-trash" onClick={this.removeTask}></i>;
        }
    }

    showDeleteButton() {
        this.setState({
            isShown: true,
        });
    }

    hideDeleteButton() {
        this.setState({
            isShown: false,
        });
    }

    removeTask() {
        if (this.props.isRemoval) {
            this.props.onRemove(this.props.task);
        }
    }

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
                    <input type="checkbox" />
                    <span
                        className="Checkbox"
                        onClick={this.props.completeTask}
                    ></span>
                </label>
                <div className="DeleteTask">{this.renderDeleteButton()}</div>
            </div>
        );
    }
}

export default Task;
