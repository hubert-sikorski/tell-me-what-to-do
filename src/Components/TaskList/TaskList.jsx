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
            rowsDisplayed: 5,
            tableHeight: 400,
            currentPage: 1,
            pageFirstElement: 1,
            pageFirstElementIndex: 0
        };
    }

    // Sorting functions
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
        if (element === 1 && this.props.taskList.length > 0) {
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
        if (element === 1 && this.props.taskList.length > 0) {
            this.shiftType(tasks);
        }
    };
    //

    // Displaying rows
    extendTableHeight = () => {
        this.height = this.state.tableHeight;
        this.rows = this.state.rowsDisplayed;
        this.results = this.state.resultsShown;

        if (
            this.props.totalTasks > 5 &&
            this.props.isSwitchingPages === false
        ) {
            this.setState({
                tableHeight: this.height + 400,
                rowsDisplayed: this.rows + 5,
                resultsShown: this.results + 5
            });
        }
    };

    reduceTableHeight = () => {
        this.height = this.state.tableHeight;
        this.rows = this.state.rowsDisplayed;
        this.results = this.state.resultsShown;

        if (
            this.props.totalTasks >= 0 &&
            this.props.isSwitchingPages === false
        ) {
            this.setState({
                tableHeight: this.height - 400,
                rowsDisplayed: this.rows - 5,
                resultsShown: this.results - 5
            });
        }
    };
    //

    // Switching pages
    addPage = (resultsToAdd, pagesToAdd, incrementValue) => {
        this.results = this.state.resultsShown;
        this.page = this.state.currentPage;
        this.start = this.state.pageFirstElement;
        this.index = this.state.pageFirstElementIndex;

        this.setState({
            resultsShown: this.results + resultsToAdd,
            currentPage: this.page + pagesToAdd,
            pageFirstElement: this.start + incrementValue,
            pageFirstElementIndex: this.index + incrementValue
        });
    };

    cutPage = (resultsToCut, pagesToCut, decrementValue) => {
        this.results = this.state.resultsShown;
        this.page = this.state.currentPage;
        this.start = this.state.pageFirstElement;
        this.index = this.state.pageFirstElementIndex;

        this.setState({
            resultsShown: this.results - resultsToCut,
            currentPage: this.page - pagesToCut,
            pageFirstElement: this.start - decrementValue,
            pageFirstElementIndex: this.index - decrementValue
        });
    };

    nextPage = () => {
        this.height = this.state.tableHeight;
        this.rows = this.state.rowsDisplayed;
        this.results = this.state.resultsShown;
        this.index = this.state.pageFirstElementIndex;
        this.totalTasks = this.props.totalTasks;
        this.page = this.state.currentPage;

        if (this.page !== 0) {
            this.props.isSwitching(true);
        }
        if (
            this.rows === 5 &&
            this.height === 400 &&
            this.results < this.totalTasks
        ) {
            this.addPage(5, 1, 5);
            this.props.switchPage(this.index + 5, this.results + 5);
        } else if (
            this.rows === 10 &&
            this.height === 800 &&
            this.results < this.totalTasks
        ) {
            this.addPage(10, 1, 10);
            this.props.switchPage(this.index + 10, this.results + 10);
        } else if (
            this.rows === 15 &&
            this.height === 1200 &&
            this.results < this.totalTasks
        ) {
            this.addPage(15, 1, 15);
            this.props.switchPage(this.index + 15, this.results + 15);
        }
    };

    previousPage = () => {
        this.height = this.state.tableHeight;
        this.rows = this.state.rowsDisplayed;
        this.results = this.state.resultsShown;
        this.start = this.state.pageFirstElement;
        this.index = this.state.pageFirstElementIndex;
        this.totalTasks = this.props.totalTasks;
        this.page = this.state.currentPage;

        if (this.page === 2) {
            this.props.isSwitching(false);
        }
        if (
            this.rows === 5 &&
            this.height === 400 &&
            this.totalTasks >= this.start &&
            this.start !== 1
        ) {
            this.cutPage(5, 1, 5);
            this.props.switchPage(this.index - 5, this.results - 5);
        } else if (
            this.rows === 10 &&
            this.height === 800 &&
            this.totalTasks >= this.start &&
            this.start !== 1
        ) {
            this.cutPage(10, 1, 10);
            this.props.switchPage(this.index - 10, this.results - 10);
        } else if (
            this.rows === 15 &&
            this.height === 1200 &&
            this.totalTasks >= this.start &&
            this.start !== 1
        ) {
            this.cutPage(15, 1, 15);
            this.props.switchPage(this.index - 15, this.results - 15);
        }
    };
    //

    renderTasks = () => {
        if (this.props.isSwitchingPages === true && this.props.totalTasks > 5) {
            this.tasks = this.props.tasksDisplayed.map((task, index) => {
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
            return this.tasks;
        } else {
            this.tasks = this.props.taskList.map((task, index) => {
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
            return this.tasks;
        }
    };

    render() {
        return (
            <div className="ListContainer">
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
                    rowsDisplayed={this.state.rowsDisplayed}
                    resultsShown={this.state.resultsShown}
                    extendTable={this.extendTableHeight}
                    reduceTable={this.reduceTableHeight}
                    nextPage={this.nextPage}
                    previousPage={this.previousPage}
                    pageFirstElement={this.state.pageFirstElement}
                />
            </div>
        );
    }
}

export default TaskList;
