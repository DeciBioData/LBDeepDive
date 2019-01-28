import { FETCH_FEED_COMPANY, UPDATE_FEED_DATA, 
        FETCH_COMPANY_DATA, UPDATE_COMPANY_DATA, SORT_COMPANY_DATA, FETCH_COMPANY,
        FETCH_PRODUCT_DATA, UPDATE_PRODUCT_DATA, FETCH_PRODUCT,
} from './types'

const getScore = (company, rankWeights = {
    totalFunding: 3,
    timeSinceLastFunding: 0,
    timeSinceFounding:3,
    valuation: 0,
    investorCount: 3,
    teamRank: 2,
    employeeCount: 0,
    publicationCount: 0,
    products: 1
}) => {

  const { 
    totalFundingPercentile, timeSinceLastFundingPercentile, valuationPercentile, 
    investorCountPercentile, teamRankPercentile, employeeCountPercentile, publicationCountPercentile,
    timeSinceFoundingPercentile, productsPercentile
  } = company

  const {
      totalFunding, timeSinceLastFunding, valuation, products,
      investorCount, teamRank, employeeCount, publicationCount, timeSinceFounding
  } = rankWeights

  let result = (totalFunding * parseFloat(totalFundingPercentile)) + (timeSinceLastFunding * parseFloat(timeSinceLastFundingPercentile)) +
          (valuation * parseFloat(valuationPercentile)) + (investorCount * parseFloat(investorCountPercentile)) + (teamRank * parseFloat(teamRankPercentile)) + 
          (employeeCount * parseFloat(employeeCountPercentile)) + (publicationCount * parseFloat(publicationCountPercentile)) +
          (timeSinceFounding * parseFloat(timeSinceFoundingPercentile)) + (products * parseFloat(productsPercentile))

  return result
}

export const fetchFeedCompany = () => dispatch => {
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
          type: FETCH_FEED_COMPANY,
          payload: companyData
        })
    })
}

export const updateFeedData = (companies, filters) => dispatch => {
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
      type: UPDATE_FEED_DATA,
      payload: processedData
    })
}

export const fetchCompanyData = () => dispatch => {
    fetch('https://sheetlabs.com/DECI/companyfeedLB')
        .then(response => response.json())
        .then(companies => {
            let companyData = companies.map((dataSet, index) => ({
                name: dataSet["companyname"],
                description: dataSet["shortdescription"],
                yearOfFound: dataSet["yearoffounded"],
                employeeCount: dataSet["employeecount"],
                yearOfLastFund: dataSet["yearoflastfunding"],
                categories: dataSet["categorylist"],
                country: dataSet["country"],
                status: dataSet["status"],
                rank: dataSet["rank"],
                rounds: dataSet["rounds"],
                diseases: dataSet["diseases"],
                products: dataSet["products"],
                totalFunding: dataSet["totalfunding"],
                reportedValuation: dataSet["reportedvaluation"],
                publicationCount: dataSet["publicationcount"],
                investorCount: dataSet["investorcount"],
                teamRank: dataSet["avgteamrank"],
                totalFundingPercentile: dataSet["totalfundingpercentile"],
                timeSinceLastFundingPercentile: dataSet["timesincelastfundingpercentile"],
                timeSinceFoundingPercentile: dataSet["timesincefoundingpercentile"],
                valuationPercentile: dataSet["valuationpercentile"],
                investorCountPercentile: dataSet["investorcountpercentile"],
                teamRankPercentile: dataSet["avgteamrankpercentile"],
                employeeCountPercentile: dataSet["avgemployeecountpercentile"],
                publicationCountPercentile: dataSet["publicationcountpercentile"],
                productsPercentile: dataSet["productspercentile"],
                uuid: dataSet["uuid"]
            })) || []
          
            companyData.sort((a, b) => getScore(b) - getScore(a))
            companyData.forEach((company, index) => company.rank = index + 1)
            companyData.forEach((company) => company.score = getScore(company))

            return dispatch({
                type: FETCH_COMPANY_DATA,
                payload: companyData
            })
        })
}

export const updateCompanyData = (companies, filters) => dispatch => {

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

      if(filters.yearFounded[0] === 2000) { filters.yearFounded[0] = 0 }
      if(filters.name !== "" && !matchPrefix(filters.name, data.name)) continue
      if(filters.description !== "" && !matchPrefix(filters.description, data.description)) continue
      if(filters.employeeCount.length !== 0 && filters.employeeCount.indexOf(data.employeeCount) === -1) continue
      if(filters.category.length !== 0 && !includeInArray(filters.category, data.categories.split(','))) continue
      if(filters.diseases.length !== 0 && !includeInArray(filters.diseases, data.diseases.split(','))) continue
      if(filters.country.length !== 0 && !includeInArray(filters.country, data.country.split(','))) continue
      if(filters.status.length !== 0 && !includeInArray(filters.status, data.status.split(','))) continue
      if(filters.totalFunding[0] > parseInt(data.totalFunding) || filters.totalFunding[1] < parseInt(data.totalFunding)) continue
      if(filters.rounds[0] > parseInt(data.rounds) || filters.rounds[1] < parseInt(data.rounds)) continue
      if(filters.reportedValuation[0] > parseInt(data.reportedValuation) || filters.reportedValuation[1] < parseInt(data.reportedValuation)) continue
      if(filters.yearFounded[0] > parseInt(data.yearOfFound) || filters.yearFounded[1] < parseInt(data.yearOfFound)) continue
      if(filters.publicationCount[0] > parseInt(data.publicationCount) || filters.publicationCount[1] < parseInt(data.publicationCount)) continue

      processedData.push(data)
    }

    dispatch({
        type: UPDATE_COMPANY_DATA,
        payload: processedData
    })
}

export const sortCompanyData = (companies, rankWeights) => dispatch => {

    companies.sort((a, b) => getScore(b, rankWeights) - getScore(a, rankWeights))
    companies.forEach((company) => company.score = getScore(company, rankWeights))

    dispatch({
        type: SORT_COMPANY_DATA,
        payload: companies
    })
}

export const fetchCompany = (id) => dispatch => {
  const apiPath = 'https://api.crunchbase.com/v3.1/organizations'
  const apiKey = `${process.env.REACT_APP_CRUNCHBASE_API_KEY}`
  fetch(`${apiPath}/${id}?user_key=${apiKey}`)
   .then(response => response.json())
   .then(dataSet => {
        const properties = dataSet.data.properties
        const relationships = dataSet.data.relationships

        const name = properties.name
        const imageURL = properties.profile_image_url
        const description = properties.description
        const foundedOn = properties.founded_on ? properties.founded_on.split('-')[0] : 'Unknown'
        const employeeCount = properties.num_employees_min && properties.num_employees_max ? `${properties.num_employees_min}-${properties.num_employees_max}` : 'Unknown'
        const totalFunding = properties.total_funding_usd

        const location = relationships.offices.item ? relationships.offices.item.properties : null
        const news = relationships.news.items
        const websites = relationships.websites.items
        const funding = relationships.funding_rounds.items
        const teams = relationships.featured_team.items
        const categoriesList = relationships.categories.items //inside the "category_group"
        const lastFunding = funding.length === 0 ? 'None' : funding[0].properties.announced_on ? funding[0].properties.announced_on.split('-')[0] : 'None'
        const reportedValuation = funding.length === 0 ? 'None' : funding[0].properties.pre_money_valuation_usd ? funding[0].properties.pre_money_valuation_usd : 'None'

        const categories = categoriesList.map((category) => {
            let list = category.properties.category_groups
            let mySet = new Set(list)
            let array = Array.from(mySet)
            return array
        })

        let companyInfo = {
            id, name, imageURL, description, foundedOn, employeeCount, totalFunding, websites,
            location: location ? `${location.region}, ${location.country}` : '', news, funding, 
            teams, categories, lastFunding, reportedValuation            
        }

        dispatch({
          type: FETCH_COMPANY,
          payload: companyInfo
       })    
    })
}


export const fetchProductData = () => dispatch => {
    fetch("https://sheetlabs.com/DECI/lbproducts")
        .then(response => response.json())
        .then(products => {
            let data = products.map((dataSet) => ({
                "productid": dataSet["productid"],
                "productname": dataSet["productname"],
                "companyname": dataSet["companyname"],
                "uuid": dataSet["uuid"],
                "description": dataSet["description"],
                "status": dataSet["status"],
                "indication": dataSet["indication"],
                "clinicalapplication": dataSet["clinicalapplication"],
                "technology": dataSet["technology"],
                "analyte": dataSet["analyte"],
                "biomarkergroup": dataSet["biomarkergroup"],
                "biomarkerlist": dataSet["biomarkerlist"],
                "sampletype": dataSet["sampletype"],
                "sensitivity": dataSet["sensitivity"],
                "specificity": dataSet["specificity"],
                "samplevolume": dataSet["samplevolume"],
                "tat": dataSet["tat"],
                "price": dataSet["price"],
                "references": dataSet["references"],
                "decibioanalysis": dataSet["decibioanalysis"],
                "panelsize": dataSet["panelsize"],
                "website": dataSet["website"]
            })) || []
            return dispatch({
              type: FETCH_PRODUCT_DATA,
              payload: data
            })
        })
}

export const updateProductData = (products, filters) => dispatch => {
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
      list2 = list2 ? list2.split(',') : []
      let set = new Set(list1)
      for(let i = 0; i < list2.length; i++) {
        if(set.has(list2[i])) return true
      }
      return false
    }

    let processedData = []
    for(let i = 0; i < products.length; i++) {
      let data = products[i]

      if(filters.name !== "" && !matchPrefix(filters.name, data.productname)) continue
      if(filters.company.length !== 0 && !includeInArray(filters.company, data.companyname)) continue
      if(filters.indication.length !== 0 && !includeInArray(filters.indication, data.indication)) continue
      if(filters.clinical.length !== 0 && !includeInArray(filters.clinical, data.clinicalapplication)) continue
      if(filters.biomarker.length !== 0 && !includeInArray(filters.biomarker, data.biomarkergroup)) continue
      if(filters.analyte.length !== 0 && !includeInArray(filters.analyte, data.analyte)) continue
      if(filters.sample.length !== 0 && !includeInArray(filters.sample, data.sampletype)) continue


      processedData.push(data)
    }

    dispatch({
        type: UPDATE_PRODUCT_DATA,
        payload: processedData
    })
}

export const fetchProduct = (id) => dispatch => {
  fetch(`https://sheetlabs.com/DECI/lbproducts?productid=${id}`)
    .then(response => response.json())
    .then(dataSet => {
        dispatch({
          type: FETCH_PRODUCT,
          payload: dataSet[0]
       })    
    })
}

























