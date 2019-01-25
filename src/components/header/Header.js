/* eslint-disable */
import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'
import SignOutButton from './SignOutButton'
import Navbar from './Navbar'

class Header extends Component {

	constructor(props) {
		super(props)
		this.state = {
			authenticated: null
		}
	}

	async signOut() {
		this.props.auth.logout('/');
	}

	async checkAuthentication() {
		const authenticated = await this.props.auth.isAuthenticated();
		if (authenticated !== this.state.authenticated) {
		  this.setState({ authenticated })
		}
	}

	componentDidMount() {
		this.checkAuthentication()
	}

	componentDidUpdate() {
		this.checkAuthentication()
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark heading with-shadow-light">
				  <span className="navbar-brand">
				    <img src="/logos/DeciBio_Icon.png" width="40" className="d-inline-block align-top logo-img" />
				  </span>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>

				  <div className="collapse navbar-collapse" id="navbarSupportedContent">
				  	<div className="mr-auto align-items-center header-text">
						<h5><strong>DeciBio BioTrack</strong> | Liquid Biopsy</h5>
					</div>
				  	<div>
				  		{ this.state.authenticated ? <SignOutButton signOut={this.signOut.bind(this)}/> : null }
				  	</div>
				  </div>
				</nav>
				<Navbar />
			</div>
		)
	}
}

export default withAuth(Header)