import mixpanel from 'mixpanel-browser'
import MixpanelMiddleware from 'redux-mixpanel-middleware'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// init mixpanel and pass mixpanel client to middleware
mixpanel.init('f7d1c21221e0a4b8fbf0a26e4ce2a01b')
const mixpanelMiddleware = new MixpanelMiddleware(mixpanel)
const middleware = [thunk, mixpanelMiddleware]
const initialState = {}

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
)

export default store