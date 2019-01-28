import { FILTER_FEED_SEARCH, FILTER_FEED_DROPDOWN, FILTER_FEED_DATE, CLEAR_FEED_DROPDOWN,
		FILTER_COMPANY_NAME, FILTER_COMPANY_DESCRIPTION, FILTER_COMPANY_DROPDOWNOPTIONS, CLEAR_COMPANY_ALL,
		CLEAR_COMPANY_DROPDOWNOPTIONS, CLEAR_COMPANY_SLIDERS, FILL_COMPANY_COLUMN, FILTER_COMPANY_SLIDERS, CHANGE_RANK_WEIGHTS,
		FILTER_PRODUCT_NAME, FILTER_PRODUCT_DROPDOWNOPTIONS, FILL_PRODUCT_COLUMN, CLEAR_PRODUCT_DROPDOWNOPTIONS, CLEAR_PRODUCT_ALL
} from './types'

export const filterFeedSearch = (text) => dispatch => {
	dispatch({
		type: FILTER_FEED_SEARCH,
		payload: text,
		meta: {
			mixpanel: {
			  event: 'Search Feed',
			  props: {
			  	input: text
			  }
			}
		}
	})
}

export const filterFeedDropdown = (type, item) => dispatch => {
	dispatch({
		type: FILTER_FEED_DROPDOWN,
		payload: { type, item },
		meta: {
			mixpanel: {
			  event: 'Dropdown Feed',
			  props: {
			  	type,
			  	tags: item
			  }
			}
		}
	})
}

export const filterFeedDate = (dateRange) => dispatch => {
	dispatch({
		type: FILTER_FEED_DATE,
		payload: dateRange,
		meta: {
			mixpanel: {
			  event: 'Date Feed',
			  props: {
			  	range: dateRange
			  }
			}
		}
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
		payload: name,
		meta: {
			mixpanel: {
			  event: 'Search company',
			  props: {
			  	input: name
			  }
			}
		}
	})
}

export const filterCompanyDescription = (description) => dispatch => {
	dispatch({
		type: FILTER_COMPANY_DESCRIPTION,
		payload: description,
		meta: {
			mixpanel: {
			  event: 'Search company description',
			  props: {
			  	input: description
			  }
			}
		}
	})
}

export const filterCompanyDropdownOptions = (type, item) => dispatch => {
	dispatch({
		type: FILTER_COMPANY_DROPDOWNOPTIONS,
		payload: {
			type,
			item
		},
		meta: {
			mixpanel: {
			  event: 'Dropdown company',
			  props: {
			  	type,
			  	tags: item
			  }
			}
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
		},
		meta: {
			mixpanel: {
			  event: 'Slider company',
			  props: {
			  	type,
			  	range: newRange
			  }
			}
		}
	})
}

export const changeRankWeights = (type, value) => dispatch => {
	dispatch({
		type: CHANGE_RANK_WEIGHTS,
		payload: {
			type,
			value
		},
		meta: {
			mixpanel: {
			  event: 'Change Rank Weight',
			  props: {
			  	type,
			  	value
			  }
			}
		}
	})
}

export const filterProductName = (name) => dispatch => {
	dispatch({
		type: FILTER_PRODUCT_NAME,
		payload: name,
		meta: {
			mixpanel: {
			  event: 'Search Product',
			  props: {
			  	input: name
			  }
			}
		}
	})
}

export const filterProductDropdownOptions = (type, item) => dispatch => {
	dispatch({
		type: FILTER_PRODUCT_DROPDOWNOPTIONS,
		payload: {
			type,
			item
		},
		meta: {
			mixpanel: {
			  event: 'Dropdown Product',
			  props: {
			  	type,
			  	tags: item
			  }
			}
		}
	})
}

export const clearProductDropdownOptions = (type) => dispatch => {
	dispatch({
		type: CLEAR_PRODUCT_DROPDOWNOPTIONS,
		payload: type
	})
}

export const clearProductAll = () => dispatch => {
	dispatch({
		type: CLEAR_PRODUCT_ALL,
		payload: null
	})
}

export const fillProductColumn = () => dispatch => {
	dispatch({
		type: FILL_PRODUCT_COLUMN,
		payload: null
	})
}













