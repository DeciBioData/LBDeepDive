import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const transformKey = (data) => {
	return data.map((entry) => {
		switch(entry) {
			case "Company Name": return "name"; break
			case "Description": return "description"; break
			case "Employee Count": return "employeeCount"; break
			case "Founded": return "yearOfFound"; break
			case "Rank": return "rank"; break
			case "Last Funding": return "yearOfLastFund"; break
			case "Category": return "categories"; break
			case "Country": return "country"; break
			case "Region": return "region"; break
			case "Status": return "status"; break
			case "Rounds": return "rounds"; break
			case "Total Funding": return "totalFunding"; break
			case "Reported Valuation": return "reportedValuation"; break
			case "Publication Count": return "publicationCount"; break
			case "Investor Count": return "investorCount"; break
			case "Rank Score": return "score"; break

			case "Product": return "productname"; break
			case "Company": return "companyname"; break
			case "Description": return "description"; break
			case "Status": return "status"; break
			case "Indication": return "indication"; break
			case "Clinical Application": return "clinicalapplication"; break
			case "Technology": return "technology"; break
			case "Analyte": return "analyte"; break
			case "Biomarker Group": return "biomarkergroup"; break
			case "Biomarker List": return "biomarkerlist"; break
			case "Sample Type": return "sampletype"; break
			case "Sensitivity": return "sensitivity"; break
			case "Specificity": return "specificity"; break
			case "Sample Volume": return "samplevolume"; break
			case "TAT": return "tat"; break
			case "Price": return "price"; break
			case "References": return "references"; break
			case "Decibio Analysis": return "decibioanalysis"; break
			case "Panel Size": return "panelsize"; break
			case "Website": return "website"; break

			default: return entry; break
		}
	})
}

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

export const exportExcel = (data, columns, type) => {
	console.log(type)
	let dataSheets = []
	let titles = []

	columns.forEach((col) => {
		if(col !== "(All)") titles.push(col)
	})
	dataSheets.push(titles)

	data.forEach((item) => {
		let content = []
		transformKey(columns).forEach((key) => {
			content.push(item[key])
		})
		dataSheets.push(content)
	})

	let wb = XLSX.utils.book_new()
	wb.SheetNames.push("Test Sheet")
	let ws_data = dataSheets
	var ws = XLSX.utils.aoa_to_sheet(ws_data)
	wb.Sheets["Test Sheet"] = ws
	let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'})

	function s2ab(s) {
          var buf = new ArrayBuffer(s.length)
          var view = new Uint8Array(buf)
          for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
          return buf;
    }
	saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Data.xlsx')
}

