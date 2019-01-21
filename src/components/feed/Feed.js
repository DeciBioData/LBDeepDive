import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCompany } from '../../actions/dataActions'

import DropdownFilter from './DropdownFilter'
import FeedCard from './FeedCard'
import FeedSummary from './FeedSummary'
import Pagination from '../pagination/Pagination'
import LoadingSpinner from '../others/LoadingSpinner'

class Feed extends Component {

	componentDidMount() {
		this.props.fetchCompany()
	}

	render() {
		let endEntry = this.props.currentPage * this.props.numberOfShowPerPage
  		let startEntry = endEntry - this.props.numberOfShowPerPage
  		let partialData = this.props.processedCompanies.slice(startEntry, endEntry)

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
				    	<li className="nav-item dropdown">
					    	<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					        	Date
					        </a>
					        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
					        	<a className="dropdown-item" href="#">Action</a>
					        	<a className="dropdown-item" href="#">Another action</a>
					        	<div className="dropdown-divider"></div>
					        	<a className="dropdown-item" href="#">Something else here</a>
					        </div>
				    	</li>
				    </ul>
				    <form className="form-inline my-2 my-lg-0">
				      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
				    </form>
				</nav>
				<div className="feedContent row">
					<div className="feedCards col-7 col-md-7 col-sm-7">
						{
							partialData.map((company, index) => {
								return (<div key={index}><FeedCard companyInfo={company}/></div>)
							})
						}
						<Pagination />
					</div>
					<div className="feedSummary with-shadow col-4 col-md-4 col-sm-4">
						Summary
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
	numberOfShowPerPage: state.pagination.numberOfShowPerPage,
	currentPage: state.pagination.currentPage,
	lastPage: state.pagination.lastPage
})

export default connect(mapStateToProps, { fetchCompany })(Feed)

