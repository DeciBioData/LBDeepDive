/* eslint-disable */
import { FETCH_COMPANY, UPDATE_DATA } from '../actions/types'

const initialState = {
	companies: [],
	processedCompanies: [],
	onLoad: true
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_COMPANY:
			return {
				...state,
				companies: action.payload,
				processedCompanies: action.payload,
				onLoad: false
			}
			break
		case UPDATE_DATA:
			return {
				...state,
				processedCompanies: action.payload
			}
			break
		default:
			return state
			break
	}
}