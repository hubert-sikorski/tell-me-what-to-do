import React from 'react';
import './App.css';

import TaskInputBar from '../TaskInputBar/TaskInputBar';
import TaskList from '../TaskList/TaskList';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskList: [],
            totalTasks: 0,
            switchingPages: false,
            tasksDisplayed: []
        };
    }

    saveToLocalStorage = () => {
        localStorage.setItem('taskList', JSON.stringify(this.state));
    };

    componentDidMount = () => {
        this.data = JSON.parse(localStorage.getItem('taskList'));

        if (localStorage.getItem('taskList')) {
            this.setState({
                taskList: this.data.taskList,
                totalTasks: this.data.totalTasks,
                switchingPages: this.data.switchingPages,
                tasksDisplayed: this.data.tasksDisplayed
            });
        } else {
            this.setState({
                taskList: [],
                totalTasks: 0,
                switchingPages: false,
                tasksDisplayed: []
            });
        }
    };

    enterTask = (...task) => {
        this.tasks = this.state.taskList;
        this.totalTasks = this.state.totalTasks;

        this.tasks.push(task);
        this.totalTasks += 1;

        this.setState({
            taskList: this.tasks,
            totalTasks: this.totalTasks
        });
        this.saveToLocalStorage();
    };

    completeTask = task => {
        this.tasks = this.state.taskList;

        if (task[2] === 1) {
            this.tasks = this.tasks.map(currentTask => {
                if (currentTask === task) {
                    task[2] = 0;
                }
                return currentTask;
            });
        } else {
            this.tasks = this.tasks.map(currentTask => {
                if (currentTask === task) {
                    task[2] = 1;
                }
                return currentTask;
            });
        }
        this.setState({
            taskList: this.tasks
        });
    };

    removeTask = task => {
        this.tasks = this.state.taskList;
        this.totalTasks = this.state.totalTasks;

        this.tasks = this.tasks.filter(currentTask => currentTask !== task);
        this.totalTasks -= 1;

        this.setState({
            taskList: this.tasks,
            totalTasks: this.totalTasks
        });
        this.saveToLocalStorage();
    };

    isSwitching = state => {
        this.setState({
            switchingPages: state
        });
    };

    switchPage = (pageStart, pageEnd) => {
        this.tasks = this.state.taskList;
        this.page = this.tasks.slice(pageStart, pageEnd);
        console.log(this.tasks);
        console.log(this.page);
        if (this.state.switchingPages === true) {
            this.setState({
                tasksDisplayed: this.page
            });
        } else {
            this.setState({
                taskList: this.tasks
            });
        }
    };

    render() {
        return (
            <div>
                <h1>Tell me what To Do</h1>
                <div className="App">
                    <TaskInputBar enterTask={this.enterTask} />
                    <div className="List">
                        <TaskList
                            taskList={this.state.taskList}
                            totalTasks={this.state.totalTasks}
                            completeTask={this.completeTask}
                            onRemove={this.removeTask}
                            switchPage={this.switchPage}
                            isSwitching={this.isSwitching}
                            isSwitchingPages={this.state.switchingPages}
                            tasksDisplayed={this.state.tasksDisplayed}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
