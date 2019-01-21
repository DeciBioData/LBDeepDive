import { FETCH_COMPANY, UPDATE_DATA } from './types'

export const fetchCompany = () => dispatch => {
	fetch('https://sheetlabs.com/DECI/lbnews')
		.then(response => response.json())
		.then(companies => dispatch({
			type: FETCH_COMPANY,
			payload: companies
		}))
}

export const updateData = (companies, filters) => dispatch => {
    const matchPrefix = (prefix, str) => {
      if(!prefix.match(/^[a-zA-Z]+$/) && !prefix.match(/^[0-9]+$/)) return false
      prefix = prefix.toLowerCase()
      str = str.toLowerCase()

      let search = prefix.split(" ")

      for (let i = 0, len = search.length; i < len; i++) {
        let regex = new RegExp(search[i], 'i')
        if (regex.test(str) === false) {
          return false
        }
      }

      return true
    }

    const includeInArray = (list1, list2) => {
      let set = new Set(list1)
      for(let i = 0; i < list2.length; i++) {
        if(set.has(list2[i])) return true
      }
      return false
    }

	let processedData = []
    for(let i = 0; i < companies.length; i++) {
      let data = companies[i]

      if(filters.companyid.length !== 0 && filters.companyid.indexOf(data.companyid) === -1) continue
      if(filters.type.length !== 0 && filters.type.indexOf(data.type) === -1) continue

      processedData.push(data)
    }

	dispatch({
		type: UPDATE_DATA,
		payload: processedData
	})
}