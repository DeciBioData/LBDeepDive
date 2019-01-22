import { FETCH_COMPANY, UPDATE_DATA } from './types'

export const fetchCompany = () => dispatch => {
	fetch('https://sheetlabs.com/DECI/lbnews')
		.then(response => response.json())
		.then(companies => {
        let companyData = companies.map((dataSet) => ({
          "newsid": dataSet["newsid"],
          "uuid": dataSet["uuid"],
          "companyid": dataSet["companyid"],
          "title": dataSet["title"],
          "abstract": dataSet["abstract"],
          "date": new Date(dataSet["date"]),
          "type": dataSet["type"],
          "link": dataSet["link"],
          "logourl": dataSet["logourl"]
        })) || []

        return dispatch({
          type: FETCH_COMPANY,
          payload: companyData
        })})
}

export const updateData = (companies, filters) => dispatch => {
    const matchPrefix = (prefix, str) => {
      if(!prefix.match(/^[a-zA-Z0-9\s]+$/)) return false
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

      if(filters.context !== "" && !matchPrefix(filters.context, `${data.title} ${data.abstract}`)) continue
      if(filters.date[0] > data.date || filters.date[1] < data.date) continue
      if(filters.companyid.length !== 0 && filters.companyid.indexOf(data.companyid) === -1) continue
      if(filters.type.length !== 0 && filters.type.indexOf(data.type) === -1) continue

      processedData.push(data)
    }

	dispatch({
		type: UPDATE_DATA,
		payload: processedData
	})
}