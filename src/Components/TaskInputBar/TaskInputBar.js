import React from 'react';
import './TaskInputBar.css';

class TaskInputBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: '',
            priority: '',
            completed: 0,
        };

        this.putTask = this.putTask.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleEnterClick = this.handleEnterClick.bind(this);
    }

    putTask() {
        if (this.state.task && this.state.priority) {
            this.props.enterTask(
                this.state.task,
                this.state.priority,
                this.state.completed
            );
        }
    }

    handleTermChange(event) {
        this.setState({
            task: event.target.value,
        });
    }

    handleOptionChange(event) {
        event.preventDefault();
        this.setState({
            priority: event.target.value,
        });
    }

    handleEnterClick(event) {
        if (event.key === 'Enter') {
            this.putTask();
        }
    }

    render() {
        return (
            <div className="InputBar">
                <input
                    placeholder="Enter Task"
                    onChange={this.handleTermChange}
                    onKeyPress={this.handleEnterClick}
                />
                <select
                    value={this.state.priority}
                    onChange={this.handleOptionChange}
                >
                    <option value="">Choose priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button className="AddButton" onClick={this.putTask}>
                    Add
                </button>
            </div>
        );
    }
}

export default TaskInputBar;
