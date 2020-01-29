import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="NavigationBar">
                <div className="RowCount">Rows per page: 5b</div>
                <div className="ResultNumber">
                    <i className="fa fa-caret-down"></i>
                    1-5 of 11 |
                </div>
                <div className="NavigationArrows">
                    <i className="fa fa-angle-left"></i>
                    <i className="fa fa-angle-right"></i>
                </div>
            </div>
        );
    }
}

export default NavigationBar;
