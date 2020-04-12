import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {
    addRows = () => {
        this.rows = this.props.rowsDisplayed;

        if (this.rows >= 5 && this.rows < 15) {
            this.props.extendTable();
        }
    };

    cutRows = () => {
        this.rows = this.props.rowsDisplayed;

        if (this.rows > 5 && this.rows <= 15) {
            this.props.reduceTable();
        }
    };

    renderIndicators = () => {
        this.rows = this.props.rowsDisplayed;

        if (this.rows === 5) {
            return (
                <i
                    className="fa fa-caret-down Indicator"
                    onClick={this.addRows}
                ></i>
            );
        } else if (this.rows > 5 && this.rows < 15) {
            return (
                <div className="Indicators">
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
        } else if (this.rows === 15) {
            return (
                <i
                    className="fa fa-caret-up Indicator"
                    onClick={this.cutRows}
                ></i>
            );
        }
    };

    render() {
        return (
            <div className="NavigationBar">
                <div className="RowsToDisplay">
                    Rows per page: {this.props.rowsDisplayed}
                </div>
                <div className="RowsAdjustment">{this.renderIndicators()}</div>
                <div className="ResultsNumber">
                    {this.props.pageFirstElement} - {this.props.resultsShown} of{' '}
                    {this.props.totalTasks}
                </div>
                <div className="NavigationArrowLeft">
                    <i
                        className="fa fa-angle-left"
                        onClick={this.props.previousPage}
                    ></i>
                </div>
                <div className="NavigationArrowRight">
                    <i
                        className="fa fa-angle-right"
                        onClick={this.props.nextPage}
                    ></i>
                </div>
            </div>
        );
    }
}

export default NavigationBar;
