/* eslint-disable */
import { FETCH_FEED_COMPANY, UPDATE_FEED_DATA, 
		FETCH_COMPANY_DATA, UPDATE_COMPANY_DATA, SORT_COMPANY_DATA, FETCH_COMPANY
} from '../actions/types'

const initialState = {
	feed_companies: [],
	feed_processedCompanies: [],
	feed_onLoad: true,
	companies: [],
	processedCompanies: [],
	companyInfo: {},
	company_onLoad: true
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_FEED_COMPANY:
			return {
				...state,
				feed_companies: action.payload,
				feed_processedCompanies: action.payload,
				feed_onLoad: false
			}
			break
		case UPDATE_FEED_DATA:
			return {
				...state,
				feed_processedCompanies: action.payload
			}
			break

		case FETCH_COMPANY_DATA:
			return {
				...state,
				companies: action.payload,
				processedCompanies: action.payload,
				company_onLoad: false
			}
			break
		case UPDATE_COMPANY_DATA:
			return {
				...state,
				processedCompanies: action.payload
			}
			break
		case SORT_COMPANY_DATA:
			return {
				...state,
				companies: action.payload
			}
			break
		case FETCH_COMPANY:
			return {
				...state,
				companyInfo: action.payload
			}
		default:
			return state
			break
	}
}