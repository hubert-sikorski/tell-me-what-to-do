import React from 'react';
import './SortingBar.css';

class SortingBar extends React.Component {
    constructor(props) {
        super(props);

        this.renderIndicator = this.renderIndicator.bind(this);
    }

    renderIndicator(sortOption) {
        if (sortOption === 'ascending') {
            return <i className="fa fa-caret-up"></i>;
        }
        if (sortOption === 'descending') {
            return <i className="fa fa-caret-down"></i>;
        }
    }

    render() {
        return (
            <div className="SortingBar">
                <div className="TaskNameSort" onClick={this.props.sort}>
                    Task name
                    {this.renderIndicator(this.props.isSortedByName)}
                </div>
                <div className="PrioritySort" onClick={this.props.sort}>
                    Priority
                    {this.renderIndicator(this.props.isSortedByPriority)}
                </div>
                <div className="DoneSort" onClick={this.props.sort}>
                    Done
                    {this.renderIndicator(this.props.isSortedByCompleted)}
                </div>
                <div className="FillerDiv">x</div>
            </div>
        );
    }
}

export default SortingBar;
