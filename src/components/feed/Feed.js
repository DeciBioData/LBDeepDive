import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCompany } from '../../actions/dataActions'

import FeedCard from './FeedCard'
import FeedSummary from './FeedSummary'
import LoadingSpinner from '../others/LoadingSpinner'

class Feed extends Component {

	componentDidMount() {
		this.props.fetchCompany()
	}

	render() {
		if(this.props.onLoad) return <div className="spinner"><LoadingSpinner /></div>
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light with-shadow feedFilters">
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
					    <ul className="navbar-nav mr-auto">
					    	<li className="nav-item dropdown">
						    	<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						        	Company
						        </a>
						        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
						        	<a className="dropdown-item" href="#">Action</a>
						        	<a className="dropdown-item" href="#">Another action</a>
						        	<div className="dropdown-divider"></div>
						        	<a className="dropdown-item" href="#">Something else here</a>
						        </div>
					    	</li>
					    	<li className="nav-item dropdown">
						    	<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						        	News Type
						        </a>
						        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
						        	<a className="dropdown-item" href="#">Action</a>
						        	<a className="dropdown-item" href="#">Another action</a>
						        	<div className="dropdown-divider"></div>
						        	<a className="dropdown-item" href="#">Something else here</a>
						        </div>
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
					</div>
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
	onLoad: state.data.onLoad
})

export default connect(mapStateToProps, { fetchCompany })(Feed)

