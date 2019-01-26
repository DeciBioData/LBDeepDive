import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route, Switch, withRouter } from "react-router-dom"
import { fetchCompany, fetchProductData } from "../../../actions/dataActions"

import SideNavBar from './SideNavBar'
import Description from './Description'
import Funding from './Funding'
import Team from './Team'
import Publication from './Publication'
import Product from './Product'
import LoadingSpinner from '../../others/LoadingSpinner'

class Company extends Component {

	componentDidMount() {
		this.props.fetchCompany(this.props.match.params.id)	
		this.props.fetchProductData()
	}

	render() {
		const { companyInfo, products } = this.props

		function isEmpty(obj) {
		    for(var prop in obj) {
		        if(obj.hasOwnProperty(prop))
		            return false
		    }

		    return true
		}

		if(isEmpty(companyInfo)) return (<div className="spinner"><LoadingSpinner /></div>)
		return (
			<div>
				<div className="container-fluid row main">
					<div className="col-md-3 sidenav-section">
						<SideNavBar companyInfo={companyInfo}/>
					</div>
					<div className="col-md-9 mainInfo-section">
						<div className="companyInfo-section">
							<Switch>
									<Route exact path={`${this.props.match.url}`} render={(props) => <Description companyInfo={companyInfo} {...props}/>}/>
									<Route exact path={`${this.props.match.url}/funding`} render={(props) => <Funding companyInfo={companyInfo} {...props}/>}/>
									<Route exact path={`${this.props.match.url}/team`} render={(props) => <Team companyInfo={companyInfo} {...props}/>}/>
									<Route exact path={`${this.props.match.url}/publication`} render={(props) => <Publication companyInfo={companyInfo} {...props}/>}/>
									<Route exact path={`${this.props.match.url}/product`} render={(props) => <Product uuid={companyInfo.id} products={products} {...props}/>}/>	
							</Switch>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companyInfo: state.data.companyInfo,
	products: state.data.products
})

export default connect(mapStateToProps, { fetchCompany, fetchProductData })(withRouter(Company))