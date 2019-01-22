import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCompany, updateData } from '../../actions/dataActions'
import { filterFeedSearch } from '../../actions/filterActions'
import { getLastestTrending } from '../../actions/otherActions'

import DropdownFilter from './DropdownFilter'
import DateFilter from './DateFilter'
import FeedCard from './FeedCard'
import FeedSummary from './FeedSummary'
import LoadingSpinner from '../others/LoadingSpinner'

class Feed extends Component {

	componentDidMount() {
		this.props.fetchCompany()
	}

	handleSearch(e) {
		e.preventDefault()
		this.props.filterFeedSearch(e.target.value)
		this.props.updateData(this.props.companies, this.props.feedFilters)
	}

	render() {

		if(this.props.onLoad) return <div className="spinner"><LoadingSpinner /></div>
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light with-shadow feedFilters">
				    <ul className="navbar-nav mr-auto">
				    	<li className="nav-item dropdown">
					        <DropdownFilter name="Company" data={this.props.processedCompanies} type="companyid"/>
				    	</li>
				    	<li className="nav-item dropdown">
					        <DropdownFilter name="News Type" data={this.props.processedCompanies} type="type"/>
				    	</li>
				    	<li className="nav-item dropdown date-selector">
				    		<DateFilter name="Date" date={this.props.processedCompanies.date}/>
				    	</li>
				    </ul>
				    <form className="form-inline my-2 my-lg-0">
				      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearch.bind(this)}/>
				    </form>
				</nav>
				<div className="feedContent row">
					<div className="feedCards col-7 col-md-7 col-sm-7">
						{
							this.props.processedCompanies.map((company, index) => {
								return (<div key={index}><FeedCard companyInfo={company}/></div>)
							})
						}
					</div>
					<div className="feedSummary with-shadow col-4 col-md-4 col-sm-4">
						<FeedSummary data={this.props.processedCompanies}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	processedCompanies: state.data.processedCompanies,
	onLoad: state.data.onLoad,
	feedFilters: state.filter.feedFilters
})

export default connect(mapStateToProps, { fetchCompany, updateData, filterFeedSearch, getLastestTrending })(Feed)

