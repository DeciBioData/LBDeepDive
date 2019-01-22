import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"

import store from './store'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Feed from './components/feed/Feed'
import Company from './components/company/Company'
import Product from './components/product/Product'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div>
      		<Header/>
                <Router>
                    <div className="fixHeight">
                        <Route exact path="/" component={Feed}/>
                        <Route exact path="/company" component={Company}/>
                        <Route exact path="/product" component={Product}/>
                    </div>
                </Router>
            <Footer/>
      	</div>
      </Provider>
    )
  }
}

export default App
