import { FILTER_FEED_SEARCH, FILTER_FEED_DROPDOWN, FILTER_FEED_DATE, CLEAR_FEED_DROPDOWN,
		FILTER_COMPANY_NAME, FILTER_COMPANY_DESCRIPTION, FILTER_COMPANY_DROPDOWNOPTIONS, CLEAR_COMPANY_ALL,
		CLEAR_COMPANY_DROPDOWNOPTIONS, CLEAR_COMPANY_SLIDERS, FILL_COMPANY_COLUMN, FILTER_COMPANY_SLIDERS, CHANGE_RANK_WEIGHTS
} from './types'

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

export const filterCompanyName = (name) => dispatch => {
	dispatch({
		type: FILTER_COMPANY_NAME,
		payload: name
	})
}

export const filterCompanyDescription = (description) => dispatch => {
	dispatch({
		type: FILTER_COMPANY_DESCRIPTION,
		payload: description
	})
}

export const filterCompanyDropdownOptions = (type, item) => dispatch => {
	dispatch({
		type: FILTER_COMPANY_DROPDOWNOPTIONS,
		payload: {
			type,
			item
		}
	})
}

export const clearCompanyDropdownOptions = (type) => dispatch => {
	dispatch({
		type: CLEAR_COMPANY_DROPDOWNOPTIONS,
		payload: type
	})
}

export const clearCompanySliders = (type) => dispatch => {
	dispatch({
		type: CLEAR_COMPANY_SLIDERS,
		payload: type
	})
}

export const clearCompanyAll = () => dispatch => {
	dispatch({
		type: CLEAR_COMPANY_ALL,
		payload: null
	})
}

export const fillCompanyColumn = () => dispatch => {
	dispatch({
		type: FILL_COMPANY_COLUMN,
		payload: null
	})
}

export const filterCompanySliders = (type, newRange) => dispatch => {
	dispatch({
		type: FILTER_COMPANY_SLIDERS,
		payload: {
			type,
			newRange
		}
	})
}

export const changeRankWeights = (type, value) => dispatch => {
	dispatch({
		type: CHANGE_RANK_WEIGHTS,
		payload: {
			type,
			value
		}
	})
}















