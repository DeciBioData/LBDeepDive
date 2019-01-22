import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
	filterCompanyName, filterCompanyDescription, filterCompanyDropdownOptions, clearCompanyDropdownOptions, fillCompanyColumn
} from "../../../../actions/filterActions"
import { updateCompanyData } from "../../../../actions/dataActions"
import { formatDollar } from "../../../../actions/otherActions"

import FilterInstruction from "./FilterInstruction"
import DropdownOptions from "./DropdownOptions"
import Slider from "./Slider"
import RankCalculator from "./RankCalculator"

class Filter extends Component {

	constructor(props) {
		super(props)
		this.tableList = "(All),Rank,Company Name,Description,Founded,Employee Count,Last Funding,Category,Country,Region,Status,Rounds,Total Funding,Reported Valuation,Publication Count,Investor Count,Rank Score"
		this.categoryList = "(All),Screening,Early Detection,Monitoring,Tx Selection,Risk Assessment,Diagnosis,Translational Research"
		this.diseaseList = "(All),Lung,Breast,Prostate,Colorectal,Leukemia/Lymphoma,Gastric,Melanoma,Pan-Cancer,Others/NA"
		this.countryList= "(All),United States of America,Canada,United Kingdom,India,Netherlands,Spain,Israel,Germany,Ireland,Belize,Australia,China,Italy,Lithuania,Portugal,Turkey,Belgium,Switzerland,France,Bulgaria,Poland,Austria,Sweden,Finland,Singapore,Sudan,Korea (Republic of),Mexico,Malaysia,South Africa,Japan,Latvia,Luxembourg,Colombia,Greece,Uruguay,United Arab Emirates,Brazil,Hong Kong,Myanmar,Slovakia,Saudi Arabia,Chile,Hungary,Iceland,Russian Federation,Norway,Algeria,Slovenia,Argentina,Croatia,Ghana,New Zealand,Bangladesh,Taiwan,Indonesia,Rwanda,Czechia,Thailand,Viet Nam,Ukraine,Bermuda,Trinidad and Tobago,Jordan,Kazakhstan,Kenya,Lebanon,Kuwait,Estonia,Nigeria,Morocco,Cyprus,Iran (Islamic Republic of),Costa Rica,Uganda,Pakistan,Philippines,Qatar,Seychelles,Egypt,Panama,Nepal,Jamaica,Côte d'Ivoire,Zambia,Botswana,Mauritius,Peru,Angola,Tunisia,Malta,Ethiopia,Liechtenstein,Namibia,El Salvador,Sri Lanka,Puerto Rico,Ecuador,Cayman Islands,Cameroon,Belarus,Yemen,Senegal,Bolivia (Plurinational State of),Georgia,Gibraltar,Venezuela (Bolivarian Republic of),Paraguay,Armenia,Macedonia (the former Yugoslav Republic of),Saint Kitts and Nevis,Lesotho,Jersey,Honduras,Oman,Barbados,Grenada,Serbia,Cuba,Congo (Democratic Republic of the),Albania,Isle of Man,Togo,Zimbabwe,Cambodia,Bahrain,Afghanistan,Burkina Faso,Guatemala,Andorra,Azerbaijan,Madagascar,Denmark,Other/NA"
		this.statusList= "(All),operating,acquired,ipo,closed,Other/NA"
		this.tableList = "(All),Rank,Company Name,Description,Founded,Employee Count,Last Funding,Category,Country,Region,Status,Rounds,Total Funding,Reported Valuation,Publication Count,Investor Count,Rank Score"
		this.employeeCountList = [
			'(All)', '1 to 10', '11 to 50', '51 to 100', '101 to 250', 
			'251 to 500', '501 to 1000', '1001 to 5000', '5001 to 10000',
			'10000+', 'unknown'
		]
	}

	componentDidMount() {
		this.props.columns.forEach((col) => {
			document.getElementById(`column-${col}`).checked = true
		})
	}

	updateData() {
		this.props.updateCompanyData(this.props.companies, this.props.filters)
	}

	handleSearchName(e) { 
		this.props.filterCompanyName(e.target.value)
		this.updateData()
	}

	handleSearchDescription(e) {
		this.props.filterCompanyDescription(e.target.value)
		this.updateData()
	}

	handleDropdownOptions(type, item) {
		this.props.filterCompanyDropdownOptions(type, item)
	}

	clearDropdownOptions(type) {
		this.props.clearCompanyDropdownOptions(type)
	}

	fillColumn() {
	    let inputs = document.querySelectorAll('.columnCheckbox')
	    for (let i = 0; i < inputs.length; i++) {
	      inputs[i].checked = true;
	    }
		this.props.fillCompanyColumn()
	}

	render() {
		const { processedCompanies, filters } = this.props
		return (
			<div className="side-nav with-shadow-light">
				<div className="company-count">
					<h6><strong>{processedCompanies.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</h6>
				</div>
				<div className="mr-auto company-search">
					<FilterInstruction name="Organization Name" type="Organization" content="Search for the exact name of the company or organization"/>
					<input className="form-control mr-sm-2 search-companyInput" type="search" placeholder="Search Companies.." aria-label="Search" onChange={this.handleSearchName.bind(this)}/>
			  	</div>
				<div className="mr-auto company-search">
					<FilterInstruction name="Company Description" type="Description" content="Filter down companies by words mentioned in their short description"/>
					<input className="form-control mr-sm-2 search-companyInput" type="search" placeholder="Search Description.." aria-label="Search" onChange={this.handleSearchDescription.bind(this)}/>
			  	</div>
				<div className="category-filter">
					<FilterInstruction name="Display Columns" type="Column" content="Select columns to display and export in the data table"/>
					<DropdownOptions 
						name="Columns" type="column" list={this.tableList.split(',')} updateData={this.updateData.bind(this)} fillColumn={this.fillColumn.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Category Tags" type="Tags" content="Filter down companies by selecting one or more category tags. Use the search bar to look up relevant tags"/>
					<DropdownOptions 
						name="Tags" type="category" list={this.categoryList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Disease Types" type="Diseases" content='Filter down diseases by selecting one or more disease tags. Use the search bar to look up relevant tags'/>
					<DropdownOptions 
						name="Diseases" type="diseases" list={this.diseaseList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Company Status" type="Status" content='Filter down companies by selecting their status. These are mutually exclusive categories, i.e an operating company will not have an "ipo" or and "acquired" tag'/>
					<DropdownOptions 
						name="Status" type="status" list={this.statusList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Country" type="Country" content='Filter down companies by country'/>
					<DropdownOptions 
						name="Country" type="country" list={this.countryList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Employee Count" type="Employee" content='Filter down companies by employee count'/>
					<DropdownOptions 
						name="Counts" type="employeeCount" list={this.employeeCountList} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>

				<div className="filter-slider">
					<FilterInstruction name="Total Funding" type="TotalFunding" result={`( ${formatDollar(filters.totalFunding[0])} - ${formatDollar(filters.totalFunding[1])} )`}
						content='Filter down companies by selecting their minimum and maximum funding ($USD)'/>
					<Slider type="TotalFunding" value={filters.totalFunding} range={{min: 0, max: 3000000000}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Rounds" type="Rounds" result={`( ${Math.round(filters.rounds[0])} - ${Math.round(filters.rounds[1])} )`}
						content='Filter down companies by selecting their minimum and maximum count of funding rounds'/>
					<Slider type="Rounds" value={filters.rounds} range={{min: 0, max: 20}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Reported Valuation" type="ReportedValuation" result={`( ${formatDollar(filters.reportedValuation[0])} - ${formatDollar(filters.reportedValuation[1])} )`}
						content='Filter down companies by selecting their minimum and maximum valuation ($USD)'/>
					<Slider type="ReportedValuation" value={filters.reportedValuation} range={{min: 0, max: 10000000000}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Year Founded" type="YearFounded" 
						result={`( ${filters.yearFounded[0] === 0 ? filters.yearFounded[1] === 2000 ? 0 : 2000 : filters.yearFounded[0]} - ${filters.yearFounded[1]} )`}
						content='Filter down companies by selecting their minimum and maximum founding year'/>
					<Slider type="YearFounded" value={filters.yearFounded} range={{min: 2000, max: 2018}}/>
				</div>
				<div className="filter-slider">
					<FilterInstruction name="Publication Count" type="Publication" result={`( ${Math.round(filters.publicationCount[0])} - ${Math.round(filters.publicationCount[1])} )`}
						content='Filter down companies by selecting their minimum and maximum publication count'/>
					<Slider type="Publication" value={filters.publicationCount} range={{min: 0, max: 5000}}/>
				</div>

				<div className="rank-calculator">
					<FilterInstruction name="Ranking Weights Calculator" type="RankWeight" 
						content={
							<ul>
								<li><b><u>Comapany Metrics</u></b></li>
								<li> <b> -Time Since Founding</b>: More recently founded companies are given a higher score</li>
								<li> <b> -Team Rank</b>: Aggregate score of team member ratings - higher score implies demonstrated achievements 
								launching and sustaining companies</li>
								<li> <b> -Employee Count</b>: Larger companies are given a higher score</li>
								<li> <b> -Publication Count (beta)</b>: Companies with higher count of publications are given a higher score</li>
								<br></br>

								<li><b><u>Funding Metrics</u></b></li>
								<li> <b> -Total Funding Amount</b>: Companies with higher total funding ($USD) are given a higher score</li>
								<li> <b> -Time since last Funding</b>: Companies with more recent funding rounds are given a higher score</li>
								<li> <b> -Valuation </b>: Companies with higher total reported valuation ($USD) are given a higher score</li>
								<li> <b> -Investor Amount</b>: Companies with higher total investor count are given a higher score</li>
							</ul>
						}
					/>
					<button className="buttons info-buttons rankCalculatorButton" type="button" data-toggle="collapse" data-target="#rank-calculator">
						Adjust Ranking Weights &#9660;
					</button>
					<div className="collapse" id="rank-calculator">
				        <p className="modal-header-text text-secondary">[0] represents de-activating a particular metric</p>
				       	<p className="modal-header-text text-secondary">[5] represents maximum weight for a metric</p>   
				        <RankCalculator />
			        </div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.companies,
	processedCompanies: state.data.processedCompanies,
	columns: state.filter.columns,
	filters: state.filter.filters
})

export default connect(mapStateToProps, { 
	filterCompanyName, filterCompanyDescription, filterCompanyDropdownOptions, 
	clearCompanyDropdownOptions, fillCompanyColumn, updateCompanyData 
})(Filter)