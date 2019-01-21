import { FETCH_COMPANY } from './types'

export const fetchCompany = () => dispatch => {
	fetch('https://sheetlabs.com/DECI/lbnews')
		.then(response => response.json())
		.then(companies => dispatch({
			type: FETCH_COMPANY,
			payload: companies
		}))
}