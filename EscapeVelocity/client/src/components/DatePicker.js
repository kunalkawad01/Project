import React, { Component } from 'react';
import { DateRange } from 'react-date-range';

class DatePicker extends Component {
    // handleSelect(range) {

    // }

    render() {
        return (
            <div>

                <DateRange
                    onInit={this.props.handleSelect}
                    onChange={this.props.handleSelect}
                />
            </div>
        )
    }
}

export default DatePicker