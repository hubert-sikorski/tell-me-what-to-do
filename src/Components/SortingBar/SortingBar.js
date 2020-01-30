import React from 'react';
import './SortingBar.css';

class SortingBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortType: ''
        };
    }

    renderIndicatorName = () => {
        if (
            this.props.sorted === 'ascending' &&
            this.state.sortType === 'name'
        ) {
            return <i className="fa fa-caret-up"></i>;
        }
        if (
            this.props.sorted === 'descending' &&
            this.state.sortType === 'name'
        ) {
            return <i className="fa fa-caret-down"></i>;
        }
    };

    renderIndicatorPriority = () => {
        if (
            this.props.sorted === 'ascending' &&
            this.state.sortType === 'priority'
        ) {
            return <i className="fa fa-caret-up"></i>;
        }
        if (
            this.props.sorted === 'descending' &&
            this.state.sortType === 'priority'
        ) {
            return <i className="fa fa-caret-down"></i>;
        }
    };
    renderIndicatorCompleted = () => {
        if (
            this.props.sorted === 'ascending' &&
            this.state.sortType === 'completed'
        ) {
            return <i className="fa fa-caret-up"></i>;
        }
        if (
            this.props.sorted === 'descending' &&
            this.state.sortType === 'completed'
        ) {
            return <i className="fa fa-caret-down"></i>;
        }
    };

    sortByName = () => {
        this.props.sortByName(this.props.taskList, this.props.sorted);
        this.setState({
            sortType: 'name'
        });
    };

    sortByPriority = () => {
        this.props.sortByOtherOption(this.props.taskList, this.props.sorted, 1);
        this.setState({
            sortType: 'priority'
        });
    };

    sortByCompleted = () => {
        this.props.sortByOtherOption(this.props.taskList, this.props.sorted, 2);
        this.setState({
            sortType: 'completed'
        });
    };

    render() {
        return (
            <div className="SortingBar">
                <div className="TaskNameSort" onClick={this.sortByName}>
                    Task name
                    {this.renderIndicatorName()}
                </div>
                <div className="PrioritySort" onClick={this.sortByPriority}>
                    Priority
                    {this.renderIndicatorPriority()}
                </div>
                <div className="DoneSort" onClick={this.sortByCompleted}>
                    Done
                    {this.renderIndicatorCompleted()}
                </div>
                <div className="FillerDiv">x</div>
            </div>
        );
    }
}

export default SortingBar;