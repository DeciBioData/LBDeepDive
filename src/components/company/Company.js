import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Home from './home/Home'
import Individual from './individual/Individual'

class Company extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path={`${this.props.match.url}`} component={Home}/>
						<Route exact path={`${this.props.match.url}/info/:id`} component={Individual}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default Company