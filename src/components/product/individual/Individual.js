import React, { Component } from 'react'
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { fetchCompany, fetchProduct } from "../../../actions/dataActions"

import Overview from "./Overview"
import Technical from "./Technical"
import ExpertFeedback from "./ExpertFeedback"
import SideNavBar from "./SideNavBar"
import LoadingSpinner from '../../others/LoadingSpinner'

class Individual extends Component {

	componentDidMount() {
		this.props.fetchCompany(this.props.match.params.id1)
		this.props.fetchProduct(this.props.match.params.id2)
	}

	render() {
		function isEmpty(obj) {
		    for(var prop in obj) {
		        if(obj.hasOwnProperty(prop))
		            return false
		    }

		    return true
		}
		if(isEmpty(this.props.productInfo) || isEmpty(this.props.companyInfo)) return (<div className="spinner"><LoadingSpinner /></div>)
		return(
			<div>
				<div className="container-fluid row main">
					<div className="col-md-3 sidenav-section">
						<SideNavBar productInfo={this.props.productInfo} companyInfo={this.props.companyInfo}/>
					</div>
					<div className="col-md-9 mainInfo-section">
						<div className="companyInfo-section">
							<Router>
								<Switch>
										<Route exact path={`${this.props.match.url}`} render={(props) => <Overview productInfo={this.props.productInfo} {...props}/>}/>
										<Route exact path={`${this.props.match.url}/technical_specification`} render={(props) => <Technical productInfo={this.props.productInfo} {...props}/>}/>
										<Route exact path={`${this.props.match.url}/expert_feedback`} render={(props) => <ExpertFeedback productInfo={this.props.productInfo} {...props}/>}/>
								</Switch>
							</Router>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companyInfo: state.data.companyInfo,
	productInfo: state.data.productInfo
})

export default connect(mapStateToProps, { fetchCompany, fetchProduct })(Individual)