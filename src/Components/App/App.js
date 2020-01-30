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
                ]
            ],
            totalTasks: 11
        };
    }

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
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;