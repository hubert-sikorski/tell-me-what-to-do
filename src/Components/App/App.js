import React from 'react';
import './App.css';

import TaskInputBar from '../TaskInputBar/TaskInputBar';
import TaskList from '../TaskList/TaskList';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskList: [
                ['Take out the trash', 'High', 0],
                ['Go for a walk', 'Low', 0],
                ['Do the dishes', 'Medium', 0],
                ['Cook dinner', 'High', 0],
                [
                    'Meet up with my absolutely gorgeous friends whom i love',
                    'Medium',
                    0,
                ],
            ],
            isSortedByName: '',
            isSortedByPriority: '',
            isSortedByCompleted: '',
        };

        this.enterTask = this.enterTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.sortStringAscending = this.sortStringAscending.bind(this);
        this.sortStringDescending = this.sortStringDescending.bind(this);
        this.shiftType = this.shiftType.bind(this);
        this.sortNumberAscending = this.sortNumberAscending.bind(this);
        this.sortNumberDescending = this.sortNumberDescending.bind(this);
    }

    enterTask(...task) {
        let tasks = this.state.taskList;
        tasks.push(task);

        this.setState({
            taskList: tasks,
        });
    }

    completeTask(task) {
        let tasks = this.state.taskList;
        tasks = tasks.map(currentTask => {
            if (currentTask === task) {
                return (currentTask[2] = 1);
            }
            console.log(currentTask);
            return currentTask;
        });

        this.setState({
            taskList: tasks,
        });
    }

    removeTask(task) {
        let tasks = this.state.taskList;
        tasks = tasks.filter(currentTask => currentTask !== task);

        this.setState({
            taskList: tasks,
        });
    }

    sortStringAscending(array) {
        array.sort((a, b) => {
            if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
            if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
            return 0;
        });
    }

    sortStringDescending(array) {
        array.sort((a, b) => {
            if (a[0].toLowerCase() < b[0].toLowerCase()) return 1;
            if (a[0].toLowerCase() > b[0].toLowerCase()) return -1;
            return 0;
        });
    }

    shiftType(array) {
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
    }

    sortNumberAscending(array, element) {
        this.shiftType(array);
        array.sort((a, b) => {
            if (a[element] < b[element]) return -1;
            if (a[element] > b[element]) return 1;
            return 0;
        });
        this.shiftType(array);
    }

    sortNumberDescending(array, element) {
        this.shiftType(array);
        array.sort((a, b) => {
            if (a[element] < b[element]) return 1;
            if (a[element] > b[element]) return -1;
            return 0;
        });
        this.shiftType(array);
    }

    sort(event) {
        let tasks = this.state.taskList;
        if (event.target.value === 'TaskNameSort') {
            let isSorted = this.state.isSortedByName;
            if (!isSorted || isSorted === 'descending') {
                this.sortStringAscending(tasks);
                this.setState({
                    taskList: tasks,
                    isSortedByName: 'ascending',
                });
            } else if (isSorted === 'ascending') {
                this.sortStringDescending(tasks);
                this.setState({
                    taskList: tasks,
                    isSortedByName: 'descending',
                });
            }
        }

        if (event.target.value === 'PrioritySort') {
            let isSorted = this.state.isSortedByPriority;
            if (!isSorted || isSorted === 'descending') {
                this.sortNumberAscending(tasks, 1);
                this.setState({
                    taskList: tasks,
                    isSortedByPriority: 'ascending',
                });
            } else if (isSorted === 'ascending') {
                this.sortNumberDescending(tasks, 1);
                this.setState({
                    taskList: tasks,
                    isSortedByPriority: 'descending',
                });
            }
        }

        if (event.target.value === 'DoneSort') {
            let isSorted = this.state.isSortedByCompleted;
            if (!isSorted || isSorted === 'descending') {
                this.sortNumberAscending(tasks, 2);
                this.setState({
                    taskList: tasks,
                    isSortedByCompleted: 'ascending',
                });
            } else if (isSorted === 'ascending') {
                this.sortNumberDescending(tasks, 2);
                this.setState({
                    taskList: tasks,
                    isSortedByCompleted: 'descending',
                });
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Tell me what To Do</h1>
                <div className="App">
                    <TaskInputBar enterTask={this.enterTask} />
                    <div className="List">
                        <TaskList
                            taskList={this.state.taskList}
                            completeTask={this.completeTask}
                            onRemove={this.removeTask}
                            sort={this.sort}
                            isSortedByName={this.state.isSortedByName}
                            isSortedByPriority={this.state.isSortedByPriority}
                            isSortedByCompleted={this.state.isSortedByCompleted}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
