import React, { Component } from "react"
import { connect } from "react-redux"
import DatePicker from "react-datepicker"
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css"

import { updateData } from "../../actions/dataActions"
import { filterFeedDate } from "../../actions/filterActions"
 
 
class DateFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date('2010-1-1'),
      endDate: new Date(),
      openDatePickers: false
    }
  }
 
  handleChangeStart(date) {
    this.setState({
      startDate: date
    })
    this.props.filterFeedDate([date, this.state.endDate])
    this.props.updateData(this.props.companies, this.props.feedFilters)    
  }

  handleChangeEnd(date) {
    this.setState({
        endDate: date
    })
    this.props.filterFeedDate([this.state.startDate, date])
    this.props.updateData(this.props.companies, this.props.feedFilters) 
  }

  toggleDatePicker() {
    this.setState({ openDatePickers: !this.state.openDatePickers })
  }

  render() {
    return (
        <div>
            <a className="nav-link" href="#" id="navbarDropdown" role="button" id="date-pickers"
                aria-haspopup="true" aria-expanded="false">
                Date
            </a>
            <Popover placement="bottom" isOpen={this.state.openDatePickers} target="date-pickers" toggle={this.toggleDatePicker.bind(this)}>
              <PopoverHeader>Select Date Range</PopoverHeader>
              <PopoverBody>
                <div className="date-selector" aria-labelledby="navbarDropdown">
                    <span>Start Date</span>
                    <DatePicker
                        inline
                        selected={this.state.startDate}
                        selectsStart
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart.bind(this)}
                        shouldCloseOnSelect={false}
                        placeholderText="Start Date"
                    />
                    <div className="dropdown-divider"></div>
                    <span>End Date</span>
                    <DatePicker
                        inline
                        selected={this.state.endDate}
                        selectsEnd
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd.bind(this)}
                        shouldCloseOnSelect={false}
                        placeholderText="End Date"
                    />
                </div>
                <button className="buttons info-buttons" onClick={this.toggleDatePicker.bind(this)}>Close</button>            
              </PopoverBody>
            </Popover> 
        </div>
    )
  }
}

const mapStateToProps = state => ({
    companies: state.data.companies,
    feedFilters: state.filter.feedFilters,
    date: state.filter.feedFilters.date
})

export default connect(mapStateToProps, { updateData, filterFeedDate })(DateFilter)


