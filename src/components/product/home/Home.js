import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProductData } from '../../../actions/dataActions'

import Table from './table/Table'
import Filter from './filters/Filter'
import TableInfo from './table_info/TableInfo'
import Pagination from '../../pagination/Pagination'
import LoadingSpinner from '../../others/LoadingSpinner'

class Home extends Component {

	componentDidMount() {
		this.props.fetchProductData()
	}

	render() {
		if(this.props.onLoad) return <div className="spinner"><LoadingSpinner/></div>
		return (
			<div>
				<div className="container-fluid row main">
					<div className="col-md-3">
						<div className="side-section">
							<Filter />
						</div>
					</div>
					<div className="col-md-9">
						<div className="data-table">
							<TableInfo />
							<Table products={this.props.products}/>
							<Pagination dataLength={this.props.products.length}/>
						</div>
					</div>
				</div>
			</div>
		)		
	}
}

const mapStateToProps = state => ({
	products: state.data.processedProducts,
	onLoad: state.data.product_onLoad
})

export default connect(mapStateToProps, { fetchProductData })(Home)