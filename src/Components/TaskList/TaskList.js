import React from 'react';
import './TaskList.css';

import SortingBar from '../SortingBar/SortingBar';
import Task from '../Task/Task';
import NavigationBar from '../NavigationBar/NavigationBar';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.renderTasks = this.renderTasks.bind(this);
    }

    renderTasks() {
        let tasks = this.props.taskList.map((task, index) => {
            return (
                <Task
                    task={task}
                    taskName={task[0]}
                    key={index}
                    priority={task[1]}
                    completed={task[2]}
                    completeTask={this.props.completeTask}
                    isRemoval={true}
                    onRemove={this.props.onRemove}
                />
            );
        });
        return tasks;
    }

    render() {
        return (
            <div>
                <SortingBar
                    sort={this.props.sort}
                    isSortedByName={this.props.isSortedByName}
                    isSortedByPriority={this.props.isSortedByPriority}
                    isSortedByCompleted={this.props.isSortedByCompleted}
                    renderTasks={this.renderTasks}
                />
                <div className="TaskList">{this.renderTasks()}</div>
                <NavigationBar />
            </div>
        );
    }
}

export default TaskList;
