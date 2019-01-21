import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import paginationReducer from './paginationReducer'


export default combineReducers({
	data: dataReducer,
	pagination: paginationReducer
})