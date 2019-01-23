import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDollar, exportExcel } from '../../../../actions/otherActions'
import { filterProductDropdownOptions, clearProductAll } from '../../../../actions/filterActions'
import { updateProductData } from "../../../../actions/dataActions"

class TableInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			company: props.filters.company.length === 0 ? null : props.filters.company,
			indication: props.filters.indication.length === 0 ? null : props.filters.indication,
			clinical: props.filters.clinical.length === 0 ? null : props.filters.clinical,
			biomarker: props.filters.biomarker.length === 0 ? null : props.filters.biomarker,
			analyte: props.filters.analyte.length === 0 ? null : props.filters.analyte,
			sample: props.filters.sample.length === 0 ? null : props.filters.sample,
		}
	}

	componentWillReceiveProps(nextProps) {
		const { filters } = nextProps
		this.setState({
			company: filters.company.length === 0 ? null : filters.company,
			indication: filters.indication.length === 0 ? null : filters.indication,
			clinical: filters.clinical.length === 0 ? null : filters.clinical,
			biomarker: filters.biomarker.length === 0 ? null : filters.biomarker,
			analyte: filters.analyte.length === 0 ? null : filters.analyte,
			sample: filters.sample.length === 0 ? null : filters.sample,
		})
	}

	clearFilters(name, type, content) {
		this.props.filterProductDropdownOptions(type, content)
		document.getElementById(`${type}-${content}`).checked = false
		this.props.updateProductData(this.props.products, this.props.filters)
	}

	clearAllFilter() {
		let inputs = document.querySelectorAll('input[type=checkbox]')
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].checked = false;
		}
		let columns = document.querySelectorAll('.productColumnCheckbox')
		const defaultList = ["Product","Company", "Status","Clinical Application","Indication", "Technology"]
		columns.forEach((input) => {
			if(defaultList.indexOf(input.value) !== -1) input.checked = true
		})
		this.props.clearProductAll()
		this.props.updateProductData(this.props.products, this.props.filters)
	}

	exportExcel(data, col) {
		exportExcel(data, col)
	}

	render() {
		const { company, indication, clinical, biomarker, analyte, sample } = this.state
		const showItems = []

		if(company) {
			company.forEach((data) => {
				showItems.push({ name: "Company", type:"company" ,content: data })
			})
		}

		if(indication) {
			indication.forEach((data) => {
				showItems.push({ name: "Indication", type:"indication" ,content: data })
			})
		}

		if(clinical) {
			clinical.forEach((data) => {
				showItems.push({ name: "Clinical Application", type:"clinical" ,content: data })
			})
		}

		if(biomarker) {
			biomarker.forEach((data) => {
				showItems.push({ name: "Biomarker", type:"biomarker" ,content: data })
			})
		}

		if(analyte) {
			analyte.forEach((data) => {
				showItems.push({ name: "Analyte", type:"analyte" ,content: data })
			})
		}

		if(sample) {
			sample.forEach((data) => {
				showItems.push({ name: "Sample", type:"sample" ,content: data })
			})
		}

		return(
			<div className="tags-section">
				<ul className="tags-list">
					{
						showItems.map((item, index) => {
							return (
								<li key={index} className="filterTags">
									<span className="badge badge-light">
									  	{item.name}: {item.content}
									  	<button type="button" className="btn btn-sm btn-light" onClick={this.clearFilters.bind(this, item.name, item.type, item.content)}>
								    		<span className="text-dark"><span aria-hidden="true">&times;</span></span>
								  		</button>
									</span>
								</li>
							)
						})
					}
					{ showItems.length === 0 ? '' : 
						<li className="filterTags">
							<button className="buttons info-buttons" onClick={this.clearAllFilter.bind(this)}>CLEAR ALL</button> 
						</li>
					}
					<li className="filterTags export-button"><button className="buttons success-buttons my-2 my-sm-0" onClick={this.exportExcel.bind(this, this.props.products, this.props.columns)}>Export Table</button></li>
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	products: state.data.products,
	processedProducts: state.data.processedProducts,
	columns: state.filter.productColumns,
	filters: state.filter.productFilters
})

export default connect(mapStateToProps, { filterProductDropdownOptions, clearProductAll, updateProductData })(TableInfo)

