import { FILTER_FEED_SEARCH, FILTER_FEED_DROPDOWN, FILTER_FEED_DATE, CLEAR_FEED_DROPDOWN } from './types'

export const filterFeedSearch = (text) => dispatch => {
	dispatch({
		type: FILTER_FEED_SEARCH,
		payload: text
	})
}

export const filterFeedDropdown = (type, item) => dispatch => {
	dispatch({
		type: FILTER_FEED_DROPDOWN,
		payload: { type, item }
	})
}

export const filterFeedDate = (dateRange) => dispatch => {
	dispatch({
		type: FILTER_FEED_DATE,
		payload: dateRange
	})
}

export const clearFeedDropdown = (type) => dispatch => {
	dispatch({
		type: CLEAR_FEED_DROPDOWN,
		payload: type
	})
}

















