import React from 'react';
import './TaskList.css';

import SortingBar from '../SortingBar/SortingBar';
import Task from '../Task/Task';
import NavigationBar from '../NavigationBar/NavigationBar';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sorted: '',
            resultsShown: 5,
            tableHeight: 400,
            currentPage: 1,
            startingIndex: 1
        };
    }

    sortStrings = (tasks, state) => {
        if (state === '' || state === 'descending') {
            tasks.sort((a, b) => {
                if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
                if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
                return 0;
            });
            this.setState({
                sorted: 'ascending'
            });
        } else if (state === 'ascending') {
            tasks.sort((a, b) => {
                if (a[0].toLowerCase() < b[0].toLowerCase()) return 1;
                if (a[0].toLowerCase() > b[0].toLowerCase()) return -1;
                return 0;
            });
            this.setState({
                sorted: 'descending'
            });
        }
    };

    shiftType = array => {
        if (typeof array[0][1] === 'string') {
            array.map(task => {
                if (task[1] === 'Low') {
                    task[1] = 1;
                } else if (task[1] === 'Medium') {
                    task[1] = 2;
                } else if (task[1] === 'High') {
                    task[1] = 3;
                }
                return task;
            });
        } else if (typeof array[0][1] === 'number') {
            array.map(task => {
                if (task[1] === 1) {
                    task[1] = 'Low';
                } else if (task[1] === 2) {
                    task[1] = 'Medium';
                } else if (task[1] === 3) {
                    task[1] = 'High';
                }
                return task;
            });
        }
        return array;
    };

    sortNumbers = (tasks, state, element) => {
        if (element === 1) {
            this.shiftType(tasks);
        }
        if (state === '' || state === 'descending') {
            tasks.sort((a, b) => {
                if (a[element] < b[element]) return -1;
                if (a[element] > b[element]) return 1;
                return 0;
            });
            this.setState({
                sorted: 'ascending'
            });
        } else if (state === 'ascending') {
            tasks.sort((a, b) => {
                if (a[element] < b[element]) return 1;
                if (a[element] > b[element]) return -1;
                return 0;
            });
            this.setState({
                sorted: 'descending'
            });
        }
        if (element === 1) {
            this.shiftType(tasks);
        }
    };

    extendTableHeight = () => {
        let height = this.state.tableHeight;
        let rows = this.state.resultsShown;
        if (this.props.totalTasks > 5 && this.props.totalTasks < 15) {
            this.setState({
                tableHeight: height + 400,
                resultsShown: rows + 5
            });
        }
    };

    reduceTableHeight = () => {
        let height = this.state.tableHeight;
        let rows = this.state.resultsShown;
        if (this.props.totalTasks > 5 && this.props.totalTasks <= 15) {
            this.setState({
                tableHeight: height - 400,
                resultsShown: rows - 5
            });
        }
    };

    showNextPage = () => {
        let tasks = this.props.taskList;
        let totalTasks = this.props.totalTasks;
        let rows = this.state.resultsShown;
        let page = this.state.currentPage;
        let startingIndex = this.state.startingIndex;
        if (
            this.props.totalTasks >= 5 &&
            page * rows < totalTasks &&
            this.state.tableHeight === 400
        ) {
            let nextPage = tasks.slice(4);
            console.log(nextPage);
            nextPage.map(task => task);
            this.setState({
                currentPage: page + 1,
                startingIndex: startingIndex + 5
            });
            return nextPage;
        }
    };

    renderTasks = () => {
        let tasks = this.props.taskList.map((task, index) => {
            return (
                <Task
                    task={task}
                    key={index}
                    taskName={task[0]}
                    priority={task[1]}
                    completed={task[2]}
                    completeTask={this.props.completeTask}
                    isRemoval={true}
                    onRemove={this.props.onRemove}
                />
            );
        });
        return tasks;
    };

    render() {
        return (
            <div>
                <SortingBar
                    sortByName={this.sortStrings}
                    sortByOtherOption={this.sortNumbers}
                    sorted={this.state.sorted}
                    taskList={this.props.taskList}
                />
                <div
                    className="TaskList"
                    style={{ maxHeight: this.state.tableHeight }}
                >
                    {this.renderTasks()}
                </div>
                <NavigationBar
                    totalTasks={this.props.totalTasks}
                    resultsShown={this.state.resultsShown}
                    extendTable={this.extendTableHeight}
                    reduceTable={this.reduceTableHeight}
                    nextPage={this.showNextPage}
                    startingIndex={this.state.startingIndex}
                />
            </div>
        );
    }
}

export default TaskList;
