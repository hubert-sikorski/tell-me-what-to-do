import React from 'react';
import './TaskInputBar.css';

class TaskInputBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: '',
            priority: '',
            completed: 0,
            warning: 'none'
        };
    }

    putTask = () => {
        if (this.state.task && this.state.priority) {
            this.props.enterTask(
                this.state.task,
                this.state.priority,
                this.state.completed
            );
            this.props.saveToStorage();
        } else if (!this.state.task || !this.state.priority) {
            this.setState({
                warning: 'flex'
            });
        }
    };

    handleTermChange = event => {
        this.setState({
            task: event.target.value,
            warning: 'none'
        });
    };

    handleOptionChange = event => {
        event.preventDefault();
        this.setState({
            priority: event.target.value,
            warning: 'none'
        });
    };

    handleEnterClick = event => {
        if (event.key === 'Enter') {
            this.putTask();
        }
    };

    render() {
        return (
            <div className="InputBar">
                <input
                    label="enter task"
                    placeholder="Enter Task"
                    onChange={this.handleTermChange}
                    onKeyPress={this.handleEnterClick}
                />
                <select
                    label="choose priority"
                    value={this.state.priority}
                    onChange={this.handleOptionChange}
                >
                    <option value="">Choose priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <div
                    className="Warning"
                    style={{ display: this.state.warning }}
                >
                    You must provide valid task and priority!
                </div>
                <button className="AddButton" onClick={this.putTask}>
                    Add
                </button>
            </div>
        );
    }
}

export default TaskInputBar;
