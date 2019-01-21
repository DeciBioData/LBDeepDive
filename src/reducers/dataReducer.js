/* eslint-disable */
import { FETCH_COMPANY } from '../actions/types'

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
		default:
			return state
			break
	}
}