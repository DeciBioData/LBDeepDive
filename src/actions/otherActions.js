export const processedDate = (date) => {
	return date.toLocaleDateString()
}

export const getLastestTrending = (companies) => {
	companies.sort((a, b) => new Date(b.date) - new Date(a.date))
	let latestCompanies = companies.slice(0, 30)
	return latestCompanies
}

export const countTypes = (lastestCompanies) => {
	let map = new Map()
	lastestCompanies.forEach((company) => {
		if(map.has(company.type)) {
			let typeCount = map.get(company.type)
			map.set(company.type, ++typeCount)
		}else {
			map.set(company.type, 1)
		}
	})
	return map
}
