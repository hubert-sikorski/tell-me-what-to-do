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
                    0
                ],
                ['Make some tea', 'Low', 0],
                ['Let the dogs out', 'High', 0],
                ['Buy some new stuff', 'Low', 0],
                ['Pass the interview', 'High', 0],
                ['Ask mom for money', 'Medium', 0],
                [
                    'Finish this app and make sure it meets all the requirements, especially logic and RWD',
                    'High',
                    0
                ],
                ['Respond to an email', 'Medium', 0],
                ['Create readme', 'High', 0],
                ['Commit to GitHub', 'High', 0],
                ['Go on a date', 'Low', 0],
                ['Watch some YouTube', 'Low', 0],
                ['Fix this cursed Navigation Bar', 'High', 0]
            ],
            totalTasks: 17,
            switchingPages: false,
            tasksDisplayed: []
        };
    }

    saveToLocalStorage = () => {
        let data = this.state.taskList;

        localStorage.setItem('taskList', data);
    };

    getDataFromStorage = () => {
        const savedData = localStorage.getItem('taskList');

        this.setState({
            taskList: savedData
        });
    };

    enterTask = (...task) => {
        let tasks = this.state.taskList;
        let totalTasks = this.state.totalTasks;

        tasks.push(task);
        this.setState({
            taskList: tasks,
            totalTasks: totalTasks + 1
        });
    };

    completeTask = task => {
        let tasks = this.state.taskList;

        if (task[2] === 1) {
            tasks = tasks.map(currentTask => {
                if (currentTask === task) {
                    task[2] = 0;
                }
                return currentTask;
            });
        } else {
            tasks = tasks.map(currentTask => {
                if (currentTask === task) {
                    task[2] = 1;
                }
                return currentTask;
            });
        }
        this.setState({
            taskList: tasks
        });
    };

    removeTask = task => {
        let tasks = this.state.taskList;
        let totalTasks = this.state.totalTasks;

        tasks = tasks.filter(currentTask => currentTask !== task);

        this.setState({
            taskList: tasks,
            totalTasks: totalTasks - 1
        });
    };

    isSwitching = state => {
        this.setState({
            switchingPages: state
        })
    }

    switchPage = (pageStart, pageEnd) => {
        let tasks = this.state.taskList;
        let page = tasks.slice(pageStart, pageEnd);
        console.log(tasks)
        console.log(page)
        if (this.state.switchingPages === true) {
            this.setState({
                tasksDisplayed: page
            })
        } else {
            this.setState({
                taskList: tasks
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Tell me what To Do</h1>
                <div className="App">
                    <TaskInputBar
                        enterTask={this.enterTask}
                        saveToStorage={this.saveToLocalStorage}
                    />
                    <div className="List">
                        <TaskList
                            taskList={this.state.taskList}
                            totalTasks={this.state.totalTasks}
                            completeTask={this.completeTask}
                            onRemove={this.removeTask}
                            updateStorage={this.saveToLocalStorage}
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
