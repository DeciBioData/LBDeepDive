import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const processedDate = (date) => {
	return date.toLocaleDateString()
}

export const formatDollar = (num) => {
	num = parseInt(num)
	if(num >= 1000000000) return `$${Math.round(num / 1000000000)}B`
	else if(num >= 1000000) return `$${Math.round(num / 1000000)}M`
	else if(num >= 1000) return `$${Math.round(num / 1000)}K`
	return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
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

export const exportExcel = (companies, columns) => {
	let dataSheets = []
	let titles = []

	columns.forEach((col) => {
		if(col !== "(All)") titles.push(col)
	})
	dataSheets.push(titles)

	companies.forEach((company) => {
		let content = []
		columns.forEach((col) => {
			let key = ""
			switch(col) {
				case "Company Name":
					key = "name"; break
				case "Description":
					key = "description"; break
				case "Employee Count":
					key = "employeeCount"; break
				case "Founded":
					key = "yearOfFound"; break
				case "Rank":
					key = "rank"; break
				case "Last Funding":
					key = "yearOfLastFund"; break
				case "Category":
					key = "categories"; break
				case "Country":
					key = "country"; break
				case "Region":
					key = "region"; break
				case "Status":
					key = "status"; break
				case "Rounds":
					key = "rounds"; break
				case "Total Funding":
					key = "totalFunding"; break
				case "Reported Valuation":
					key = "reportedValuation"; break
				case "Publication Count":
					key = "publicationCount"; break
				case "Investor Count":
					key = "investorCount"; break
				case "Rank Score":
					key = "score"; break
				default: break
			}
			content.push(company[key])
		})
		dataSheets.push(content)
	})

	let wb = XLSX.utils.book_new()
	wb.SheetNames.push("Test Sheet")
	let ws_data = dataSheets
	console.log(dataSheets)
	var ws = XLSX.utils.aoa_to_sheet(ws_data)
	wb.Sheets["Test Sheet"] = ws
	let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'})

	function s2ab(s) {
          var buf = new ArrayBuffer(s.length)
          var view = new Uint8Array(buf)
          for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
          return buf;
    }
	saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Company Data.xlsx')
}

