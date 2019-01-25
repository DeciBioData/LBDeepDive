import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { withAuth } from '@okta/okta-react'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'

import store from './store'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Feed from './components/feed/Feed'
import Company from './components/company/home/Home'
import CompanyPage from './components/company/individual/Individual'
import Product from './components/product/home/Home'
import ProductPage from './components/product/individual/Individual'
import Login from './components/auth/Login'
import NoMatch from './components/others/NotFoundPage'

const onAuthRequired = ({history}) => {
  history.push('/login')
}

const config = {
  issuer: 'https://dev-693935.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaj411mh8KILRUT10h7',
  onAuthRequired: onAuthRequired
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div>		
            <Router>
                <div className="fixHeight">
                    <Security issuer={config.issuer}
                              client_id={config.client_id}
                              redirect_uri={config.redirect_uri}
                              onAuthRequired={config.onAuthRequired}
                    >
                        <Header/>
                        <Switch>
                            <SecureRoute exact path="/" component={Feed}/>
                            <SecureRoute exact path="/company" component={Company}/>
                            <SecureRoute path="/company/info/:id" component={CompanyPage}/>
                            <SecureRoute exact path="/product" component={Product}/>
                            <SecureRoute path="/product/info/:id1/:id2" component={ProductPage}/>
                            <Route exact={true} path="/login" render={() => <Login baseUrl='https://dev-693935.oktapreview.com'/>}/>
                            <Route path='/implicit/callback' component={ImplicitCallback}/>
                            <Route component={NoMatch} />
                        </Switch>
                    </Security>
                </div>
            </Router>
            <Footer/>
      	</div>
      </Provider>
    )
  }
}

export default App
