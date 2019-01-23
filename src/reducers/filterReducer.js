/* eslint-disable */
import { FILTER_FEED_SEARCH, FILTER_FEED_DROPDOWN, FILTER_FEED_DATE, CLEAR_FEED_DROPDOWN,
		FILTER_COMPANY_NAME, FILTER_COMPANY_DESCRIPTION, FILTER_COMPANY_DROPDOWNOPTIONS, CLEAR_COMPANY_ALL,
		CLEAR_COMPANY_DROPDOWNOPTIONS, CLEAR_COMPANY_SLIDERS, FILL_COMPANY_COLUMN, FILTER_COMPANY_SLIDERS, CHANGE_RANK_WEIGHTS,
		FILTER_PRODUCT_NAME, FILTER_PRODUCT_DROPDOWNOPTIONS, FILL_PRODUCT_COLUMN, CLEAR_PRODUCT_DROPDOWNOPTIONS, CLEAR_PRODUCT_ALL
} from '../actions/types'

const initialState = {
	feedFilters: {
		context: "",
	    companyid: [],
	    type: [],
	    date: [null, new Date()]
	},
	filters: {
	    name: "",
	    description: "",
	    employeeCount: [],
	    category: [],
	    country: [],
	    status: [],
	    diseases:[],
	    totalFunding: [0, 3000000000],
	    rounds: [0, 20],
	    reportedValuation: [0, 10000000000],
	    yearFounded: [2000, 2018],
	    publicationCount: [0, 5000]
	},
	columns: [
		"Rank","Company Name", "Country","Founded","Last Funding",
		"Employee Count", "Rounds", "Total Funding"
	],
	rankWeights: {
		totalFunding: 3,
		timeSinceLastFunding: 0,
		timeSinceFounding:3,
		valuation: 0,
		investorCount: 3,
		teamRank: 2,
		employeeCount: 0,
		publicationCount: 0,
		products: 1
	},
	productFilters: {
	    name: "",
	    company: [],
	    indication: [],
	    clinical: [],
	    biomarker: [],
	    analyte:[],
	    sample: []
	},
	productColumns: [
		"Product","Company", "Status","Clinical Application","Indication", "Technology"
	]
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FILTER_FEED_SEARCH:
			state.feedFilters.context = action.payload
			return {
				...state,
				feedFilters: state.feedFilters
			}
			break
		case FILTER_FEED_DROPDOWN:
			let typeIndex = state.feedFilters[action.payload.type].indexOf(action.payload.item)
		    if(typeIndex === -1) state.feedFilters[action.payload.type].push(action.payload.item)
		    else {
		      state.feedFilters[action.payload.type].splice(typeIndex, 1)
		    }
			return {
				...state,
				feedFilters: state.feedFilters
			}
			break

		case FILTER_FEED_DATE:
			state.feedFilters.date = action.payload
			return {
				...state,
				feedFilters: state.feedFilters
			} 
			break
		case CLEAR_FEED_DROPDOWN:
			state.feedFilters[action.payload] = []
			return {
				...state,
				feedFilters: state.feedFilters
			}
			break
		case FILTER_COMPANY_NAME:
			state.filters.name = action.payload
			return {
				...state,
				filters: state.filters
			}
			break

		case FILTER_COMPANY_DESCRIPTION:
			state.filters.description = action.payload
			return {
				...state,
				filters: state.filters
			}
			break

		case FILTER_COMPANY_DROPDOWNOPTIONS:
			switch(action.payload.type) {
				case 'column':
				    let typeIndex = state.columns.indexOf(action.payload.item)
				    if(typeIndex === -1) state.columns.push(action.payload.item)
				    else {
				      state.columns.splice(typeIndex, 1)
				    }
				    return {
				    	...state,
				    	columns: state.columns
				    }
					break
				default:
				    typeIndex = state.filters[action.payload.type].indexOf(action.payload.item)
				    if(typeIndex === -1) state.filters[action.payload.type].push(action.payload.item)
				    else {
				      state.filters[action.payload.type].splice(typeIndex, 1)
				    }
					return {
						...state,
						filters: state.filters
					}
					break
			}
			break

		case CLEAR_COMPANY_DROPDOWNOPTIONS:
			switch(action.payload) {
				case 'column':
			    return {
			    	...state,
			    	columns: ["Rank","Company Name", "Country","Founded","Last Funding","Employee Count", "Rounds", "Total Funding"]
			    }
					break
				default:
					state.filters[action.payload] = []
					return {
						...state,
						filters: state.filters
					}
					break
			}
			break

		case CLEAR_COMPANY_SLIDERS:
			let defaultRange = {
			    totalFunding: [0, 3000000000],
			    rounds: [0, 20],
			    reportedValuation: [0, 10000000000],
			    yearFounded: [2000, 2018],
			    publicationCount: [0, 5000]				
			}			
			state.filters[action.payload] = defaultRange[action.payload]
			return {
				...state,
				filters: state.filters
			}
			break

		case CLEAR_COMPANY_ALL:
			let { filters } = state
			filters.employeeCount = []
			filters.category = []
			filters.status = []
			filters.country = []
			filters.totalFunding = [0, 3000000000]
			filters.rounds = [0, 20]
			filters.reportedValuation = [0, 10000000000]
			filters.yearFounded = [2000, 2018]
			filters.publicationCount = [0, 5000]
			return {
				...state,
				filters: state.filters
			}
			break

		case FILL_COMPANY_COLUMN:
			return {
				...state,
				columns: [
			        "(All)", "Rank","Company Name","Description","Founded","Employee Count","Last Funding","Category","Country",
					"Status","Rounds","Total Funding","Reported Valuation","Publication Count","Investor Count", "Rank Score"
		    	]
			}
			break

		case FILTER_COMPANY_SLIDERS:
			switch(action.payload.type) {
				case "TotalFunding":
					state.filters.totalFunding = action.payload.newRange
					break
				case "Rounds":
					state.filters.rounds = action.payload.newRange
					break
				case "ReportedValuation":
					state.filters.reportedValuation = action.payload.newRange
					break
				case "YearFounded":
					state.filters.yearFounded = action.payload.newRange
					break
				case "Publication":
					state.filters.publicationCount = action.payload.newRange
					break
				default: break
			}
			return {
				...state,
				filters: state.filters
			}
			break

		case CHANGE_RANK_WEIGHTS:
			state.rankWeights[action.payload.type] = action.payload.value
			return {
				...state,
				rankWeights: state.rankWeights
			}
			break

		case FILTER_PRODUCT_NAME:
			state.productFilters.name = action.payload
			return {
				...state,
				productFilters: state.productFilters
			}
			break
		case FILTER_PRODUCT_DROPDOWNOPTIONS:
			switch(action.payload.type) {
				case 'productColumn':
				    let typeIndex = state.productColumns.indexOf(action.payload.item)
				    if(typeIndex === -1) state.productColumns.push(action.payload.item)
				    else {
				      state.productColumns.splice(typeIndex, 1)
				    }
				    return {
				    	...state,
				    	productColumns: state.productColumns
				    }
					break
				default:
				    typeIndex = state.productFilters[action.payload.type].indexOf(action.payload.item)
				    if(typeIndex === -1) state.productFilters[action.payload.type].push(action.payload.item)
				    else {
				      state.productFilters[action.payload.type].splice(typeIndex, 1)
				    }
					return {
						...state,
						productFilters: state.productFilters
					}
					break
			}
			break
		case CLEAR_PRODUCT_DROPDOWNOPTIONS:
			switch(action.payload) {
				case 'productColumn':
			    return {
			    	...state,
			    		productColumns: [
							"Product","Company", "Status","Clinical Application","Indication", "Technology"
						]
			    }
					break
				default:
					state.productFilters[action.payload] = []
					return {
						...state,
						productFilters: state.productFilters
					}
					break
			}
			break
		case CLEAR_PRODUCT_ALL:
			let { productFilters } = state
		    productFilters.company = []
		    productFilters.indication = []
		    productFilters.clinical = []
		    productFilters.biomarker = []
		    productFilters.analyte =[]
		    productFilters.sample = []
			return {
				...state,
				productFilters: state.productFilters
			}
			break
		case FILL_PRODUCT_COLUMN:
			return {
				...state,
				productColumns: [
					"(All)","Product","Company","Description","Status","Indication","Clinical Application",
					"Technology","Analyte","Biomarker Group","Biomarker List","Sample Type","Sensitivity",
					"Specificity","Sample Volume","TAT","Price","References","Decibio Analysis","Panel Size","Website"
		    	]
			}
			break
		default:
			return state
			break
	}
}