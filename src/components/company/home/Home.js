import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCompanyData } from '../../../actions/dataActions'

import Filter from './filters/Filter'
import Table from './table/Table'
import TableInfo from './table_info/TableInfo'
import Pagination from '../../pagination/Pagination'
import LoadingSpinner from '../../others/LoadingSpinner'

class Home extends Component {
	
	componentDidMount() {
		this.props.fetchCompanyData()
	}

	render() {
		if(this.props.onLoad) {return <div className="spinner"><LoadingSpinner/></div>}
		return (
			<div className="container-fluid row fixed-Height">
				<div className="col-md-3">
					<div className="side-section">
						<Filter />
					</div>
				</div>
				<div className="col-md-9">
					<div className="data-table">
						<TableInfo />
						<Table companies={this.props.companies}/>
						<Pagination dataLength={this.props.companies.length}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.processedCompanies,
	onLoad: state.data.company_onLoad
})

export default connect(mapStateToProps, { fetchCompanyData })(Home)


