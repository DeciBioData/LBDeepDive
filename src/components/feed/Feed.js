import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFeedCompany, updateFeedData } from '../../actions/dataActions'
import { filterFeedSearch } from '../../actions/filterActions'
import { getLastestTrending } from '../../actions/otherActions'

import DropdownFilter from './DropdownFilter'
import DateFilter from './DateFilter'
import FeedCard from './FeedCard'
import FeedSummary from './FeedSummary'
import LoadingSpinner from '../others/LoadingSpinner'

class Feed extends Component {

	componentDidMount() {
		this.props.fetchFeedCompany()
	}

	handleSearch(e) {
		e.preventDefault()
		this.props.filterFeedSearch(e.target.value)
		this.props.updateFeedData(this.props.companies, this.props.feedFilters)
	}

	render() {

		if(this.props.onLoad) return <div className="spinner"><LoadingSpinner /></div>
		return (
			<div>
				<div className="feedContentTop ">
				<nav className="navbar navbar-expand-lg navbar-light bg-light  ">
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
				</nav></div>
				<div className="feedContent row">
				
				<div className="feedSummary  col-4 col-md-4 col-sm-4">
					
						<FeedSummary data={this.props.processedCompanies}/>
					</div>
					<div className="feedCards col-7 col-md-7 col-sm-7">
											{
							this.props.processedCompanies.map((company, index) => {
								return (<div key={index}><FeedCard companyInfo={company}/></div>)
							})
						}
					</div>
					
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.feed_companies,
	processedCompanies: state.data.feed_processedCompanies,
	onLoad: state.data.feed_onLoad,
	feedFilters: state.filter.feedFilters
})

export default connect(mapStateToProps, { fetchFeedCompany, updateFeedData, filterFeedSearch, getLastestTrending })(Feed)

