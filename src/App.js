import React, { Component } from 'react'
import { Route, Switch, withRouter } from "react-router-dom"

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Feed from './components/feed/Feed'
import Company from './components/company/home/Home'
import CompanyPage from './components/company/individual/Individual'
import Product from './components/product/home/Home'
import ProductPage from './components/product/individual/Individual'
import auth0Client from './components/auth/Auth'
import Callback from './components/auth/Callback'
import NoMatch from './components/others/NotFoundPage'
import LoadingSpinner from './components/others/LoadingSpinner'


const SecureRoute = (props) => {
  const {component: Component, path, checkingSession} = props;
  return (
    <Route path={path} render={() => {
        if (checkingSession) return <div className="spinner"><LoadingSpinner /></div>
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div></div>;
        }
        return <Component />
    }} />
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false})
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false})
  }

  render() {
    return (
      <div className="fixHeight">
          <Header/>
          <Switch>
              <SecureRoute exact path="/" component={Feed} checkingSession={this.state.checkingSession}/>
              <SecureRoute exact path="/company" component={Company} checkingSession={this.state.checkingSession}/>
              <SecureRoute path="/company/info/:id" component={CompanyPage} checkingSession={this.state.checkingSession}/>
              <SecureRoute exact path="/product" component={Product} checkingSession={this.state.checkingSession}/>
              <SecureRoute path="/product/info/:id1/:id2" component={ProductPage} checkingSession={this.state.checkingSession}/>
              <Route exact path='/callback' component={Callback}/>
              <Route component={NoMatch} />
          </Switch>
          <Footer/>
      </div>
    )
  }
}

export default withRouter(App)
