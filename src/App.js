import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'

import Header from './components/header/Header'
import Feed from './components/feed/Feed'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      	<div>
      		<Header/>
          <div className="fixHeight">
      		  <Feed />
          </div>
      	</div>
      </Provider>
    )
  }
}

export default App
