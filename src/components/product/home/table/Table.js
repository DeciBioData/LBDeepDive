import React, { Component } from "react"
import { connect } from "react-redux"
import { formatDollar } from "../../../../actions/otherActions"

class Table extends Component {
	render() {
		const table = new Set(this.props.columns)

		let endEntry = this.props.currentPage * this.props.numberOfShowPerPage
  		let startEntry = endEntry - this.props.numberOfShowPerPage
  		let partialData = this.props.products.slice(startEntry, endEntry)

		return(
			<div className="table-responsive">
				<table className="table table-sm" id="tableData">
				  	<thead className="table-heading">
					    <tr>
					    	{table.has('Product') ? (<th className="text-left">Product</th>) : null}
					    	{table.has('Company') ? (<th className= "text-left">Company</th>) : null}
					    	{table.has('Status') ? <th className="text-left">Status</th> : null}
							{table.has('Clinical Application') ? <th className="text-left">Clinical Application</th> : null}
					      	{table.has('Indication') ? <th className="text-left">Indication</th> : null}
							{table.has('Technology') ? <th className="text-left">Technology</th> : null}
					      	{table.has('Analyte') ? <th className= "text-left">Analyte</th> : null}
					    	{table.has('Biomarker Group') ? <th className="text-left">Biomarker Group</th> : null}
					    	{table.has('Biomarker List') ? <th className="text-left">Biomarker List</th> : null}
					    	{table.has('Sample Type') ? <th className="text-left">Sample Type</th> : null} 

					    	{table.has('Sensitivity') ? <th className="text-left">Sensitivity</th> : null}
							{table.has('Specificity') ? <th className="text-left">Specificity</th> : null}
					      	
							{table.has('Sample Volume') ? <th className="text-left">Sample Volume</th> : null}
					      	{table.has('TAT') ? <th className="text-left">TAT</th> : null}
					      	{table.has('Description') ? <th className="text-left">Description</th> : null}
					    	{table.has('Price') ? <th className="text-left">Price</th> : null}
					    	{table.has('References') ? <th className="text-left">References</th> : null}
					    	{table.has('Decibio Analysis') ? <th className="text-left">Decibio Analysis</th> : null}
					    	{table.has('Panel Size') ? <th className="text-left">Panel Size</th> : null}
					    	{table.has('Website') ? <th className="text-left">Website</th> : null}
					    </tr>
				    </thead>
				    <tbody>
				    	{
				    		partialData.map((data, index) => {
				    			return (
							    	<tr key={index}>
							    		{table.has("Product") ? <th className="text-left"><a href={`/product/info/${data.uuid}/${data.productid}`} className="companyName">{data.productname}</a></th> : null}
							    		{table.has('Company') ? <td className="text-left"><a href={`/company/info/${data.uuid}`} rel="noopener noreferrer" className="companyName">{data.companyname}</a></td> : null}
										{table.has('Status') ? <td className="text-left">{data.status}</td> : null}
							    		{table.has('Clinical Application') ? <td className="text-left">{data.clinicalapplication}</td> : null}
							    		
							    		{table.has('Indication') ? <td className="text-left">{data.indication}</td> : null}
							    		{table.has('Technology') ? <td className="text-left">{data.technology}</td> : null}
										{table.has('Analyte') ? <td className="text-left">{data.analyte}</td> : null}
							    		{table.has('Biomarker Group') ? <td className="text-left">{data.biomarkergroup}</td> : null}
							    		{table.has('Biomarker List') ? <td className="text-left">{data.biomarkerlist}</td> : null}
								    	
								    	{table.has('Sample Type') ? <td className="text-left">{data.sampletype}</td> : null}
										{table.has('Sensitivity') ? <td className="text-left">{data.sensitivity}</td> : null}
								      	{table.has('Specificity') ? <td className="text-left">{data.specificity}</td> : null}
										{table.has('Sample Volume') ? <td className="text-left">{data.samplevolume}</td> : null}
								      	{table.has('TAT') ? <td className="text-left">{data.tat}</td> : null}
								      	{table.has('Description') ? <td className="text-left">{data.description}</td> : null}
								    	{table.has('Price') ? <td className="text-left">{data.price}</td> : null}
								      	{table.has('References') ? <td className="text-left">{data.references}</td> : null}
								      	{table.has('Decibio Analysis') ? <td className="text-left">{data.decibioanalysis}</td> : null}
								    	{table.has('Panel Size') ? <td className="text-left">{data.panelsize}</td> : null}
								    	{table.has('Website') ? <td className="text-left">{data.website}</td> : null}
							    	</tr>
				    			)
				    		})
				    	}
					</tbody>
				</table>
			</div>
		)
	}
} 

const mapStateToProps = state => ({
	columns: state.filter.productColumns,
	numberOfShowPerPage: state.pagination.numberOfShowPerPage,
	currentPage: state.pagination.currentPage,
	lastPage: state.pagination.lastPage
})

export default connect(mapStateToProps)(Table)

