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
    //

    // Displaying rows
    extendTableHeight = () => {
        let height = this.state.tableHeight;
        let rows = this.state.rowsDisplayed;
        let results = this.state.resultsShown;

        if (this.props.totalTasks > 5) {
            this.setState({
                tableHeight: height + 400,
                rowsDisplayed: rows + 5,
                resultsShown: results + 5
            });
        }
    };

    reduceTableHeight = () => {
        let height = this.state.tableHeight;
        let rows = this.state.rowsDisplayed;
        let results = this.state.resultsShown;

        if (this.props.totalTasks > 5) {
            this.setState({
                tableHeight: height - 400,
                rowsDisplayed: rows - 5,
                resultsShown: results - 5
            });
        }
    };
    //

    // Switching pages
    addPage = (resultsToAdd, pagesToAdd, incrementValue) => {
        let results = this.state.resultsShown;
        let page = this.state.currentPage;
        let start = this.state.pageFirstElement;
        let index = this.state.pageFirstElementIndex;

        this.setState({
            resultsShown: results + resultsToAdd,
            currentPage: page + pagesToAdd,
            pageFirstElement: start + incrementValue,
            pageFirstElementIndex: index + incrementValue
        });
    };

    cutPage = (resultsToCut, pagesToCut, decrementValue) => {
        let results = this.state.resultsShown;
        let page = this.state.currentPage;
        let start = this.state.pageFirstElement;
        let index = this.state.pageFirstElementIndex;

        this.setState({
            resultsShown: results - resultsToCut,
            currentPage: page - pagesToCut,
            pageFirstElement: start - decrementValue,
            pageFirstElementIndex: index - decrementValue
        });
    };

    nextPage = () => {
        let height = this.state.tableHeight; //const
        let rows = this.state.rowsDisplayed; //const
        let results = this.state.resultsShown;
        let index = this.state.pageFirstElementIndex;
        let totalTasks = this.props.totalTasks;
        let page = this.state.currentPage;

        if (page !== 0) {
            this.props.isSwitching(true);
        }
        if (rows === 5 && height === 400 && results < totalTasks) {
            this.addPage(5, 1, 5);
            this.props.switchPage(index + 5, results + 5);
        } else if (rows === 10 && height === 800 && results < totalTasks) {
            this.addPage(10, 1, 10);
            this.props.switchPage(index + 10, results + 10);
        } else if (rows === 15 && height === 1200 && results < totalTasks) {
            this.addPage(15, 1, 15);
            this.props.switchPage(index + 15, results + 15);
        }
    };

    previousPage = () => {
        let height = this.state.tableHeight; //const
        let rows = this.state.rowsDisplayed; //const
        let results = this.state.resultsShown;
        let start = this.state.pageFirstElement;
        let index = this.state.pageFirstElementIndex;
        let totalTasks = this.props.totalTasks;
        let page = this.state.currentPage;

        if (page === 2) {
            this.props.isSwitching(false);
        }
        if (
            rows === 5 &&
            height === 400 &&
            totalTasks >= start &&
            start !== 1
        ) {
            this.cutPage(5, 1, 5);
            this.props.switchPage(index - 5, results - 5);
        } else if (
            rows === 10 &&
            height === 800 &&
            totalTasks >= start &&
            start !== 1
        ) {
            this.cutPage(10, 1, 10);
            this.props.switchPage(index - 10, results - 10);
        } else if (
            rows === 15 &&
            height === 1200 &&
            totalTasks >= start &&
            start !== 1
        ) {
            this.cutPage(15, 1, 15);
            this.props.switchPage(index - 15, results - 15);
        }
    };
    //

    renderTasks = () => {
        if (this.props.isSwitchingPages === true) {
            let tasks = this.props.tasksDisplayed.map((task, index) => {
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
                        updateStorage={this.props.updateStorage}
                    />
                )
            })
            return tasks;
        } else {
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
                        updateStorage={this.props.updateStorage}
                    />
                );
            });
            return tasks;
        }
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
