import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {
    addRows = () => {
        let rows = this.props.resultsShown;
        if (rows >= 5 && rows < 15) {
            this.props.extendTable();
        }
    };

    cutRows = () => {
        let rows = this.props.resultsShown;
        if (rows > 5 && rows <= 15) {
            this.props.reduceTable();
        }
    };

    renderIndicators = () => {
        let rows = this.props.resultsShown;
        if (rows === 5) {
            return (
                <i
                    className="fa fa-caret-down Indicator"
                    onClick={this.addRows}
                ></i>
            );
        } else if (rows > 5 && rows < 15) {
            return (
                <div>
                    <i
                        className="fa fa-caret-down Indicator"
                        onClick={this.addRows}
                    ></i>
                    <i
                        className="fa fa-caret-up Indicator"
                        onClick={this.cutRows}
                    ></i>
                </div>
            );
        } else if (rows === 15) {
            return (
                <i
                    className="fa fa-caret-up Indicator"
                    onClick={this.cutRows}
                ></i>
            );
        }
    };

    navigatePages = () => {
        this.props.nextPage();
    };

    render() {
        return (
            <div className="NavigationBar">
                <div className="RowsToDisplay">
                    Rows per page: {this.props.resultsShown}
                </div>
                <div className="RowsAdjustment">{this.renderIndicators()}</div>
                <div className="ResultsNumber">
                    {this.props.startingIndex} - {this.props.resultsShown} of {this.props.totalTasks}
                </div>
                <div className="NavigationArrowLeft">
                    <i
                        className="fa fa-angle-left"
                        onClick={this.navigatePages}
                    ></i>
                </div>
                <div className="NavigationArrowRight">
                    <i
                        className="fa fa-angle-right"
                        onClick={this.navigatePages}
                    ></i>
                </div>
            </div>
        );
    }
}

export default NavigationBar;