import { FILTER_FEED_DROPDOWN, CLEAR_FEED_DROPDOWN } from './types'

export const filterFeedDropdown = (type, item) => dispatch => {
	dispatch({
		type: FILTER_FEED_DROPDOWN,
		payload: { type, item }
	})
}

export const clearFeedDropdown = (type) => dispatch => {
	dispatch({
		type: CLEAR_FEED_DROPDOWN,
		payload: type
	})
}

















