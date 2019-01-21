/* eslint-disable */
import { FILTER_FEED_DROPDOWN, CLEAR_FEED_DROPDOWN } from '../actions/types'

const initialState = {
	feedFilters: {
	    title: "",
	    abstract: "",
	    companyid: [],
	    type: []
	}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FILTER_FEED_DROPDOWN:
			let typeIndex = state.feedFilters[action.payload.type].indexOf(action.payload.item)
		    if(typeIndex === -1) state.feedFilters[action.payload.type].push(action.payload.item)
		    else {
		      state.feedFilters[action.payload.type].splice(typeIndex, 1)
		    }
			return {
				...state,
				feedFilters: state.feedFilters
			}
			break
		case CLEAR_FEED_DROPDOWN:
			state.feedFilters[action.payload] = []
			return {
				...state,
				feedFilters: state.feedFilters
			}
			break
		default:
			return state
			break
	}
}