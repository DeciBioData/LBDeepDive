import React, { Component } from 'react'
import { connect } from "react-redux"
import { 
	filterProductName, filterProductDropdownOptions, clearProductDropdownOptions, fillProductColumn
} from "../../../../actions/filterActions"
import { updateProductData } from "../../../../actions/dataActions"
import { formatDollar } from "../../../../actions/otherActions"

import FilterInstruction from "./FilterInstruction"
import DropdownOptions from "./DropdownOptions"

class Filter extends Component {

	constructor(props) {
		super(props)
		this.productColumns = [
			"(All)","Product","Company","Description","Status","Indication","Clinical Application",
			"Technology","Analyte","Biomarker Group","Biomarker List","Sample Type","Sensitivity",
			"Specificity","Sample Volume","TAT","Price","References","Decibio Analysis","Panel Size","Website"
		]
		this.companyList = "(All),Biodesix,Integrated Diagnostics,Cynvenio Biosystems,NeoGenomics Laboratories,LabCorp,OTraces,Veracyte,Biofluidica,Epigenomics AG,Exosome Diagnostics,MDxHealth,AnchorDx,MDNA Life Sciences,Oncocyte,VolitionRx,OncoDNA,Precipio Diagnostics,Quest Diagnostics,Thermo Fisher Scientific,Anpac,Datar Genetics,Apostle Inc,Guardant Health,Bellwether Bio,Singlera Genomics,CellMax Life,Grail,Freenome,Angle plc,Boreal Genomics,Exact Sciences,Fluxion Biosciences,Pathway Genomics,Rosetta Genomics,CreatV Microtech,AcuaMark Diagnostics,Torpedo Diagnostics,Roche,ACT Genomics,Natera,Codiak Biosciences,Liquid Biotech,Qiagen,NanoString Technologies,Quantgene,Predicine (Huidu Medical Technology),Adaptive Biotechnologies,TOMA Biosciences,Novogene Corporation,Hologic,Myriad Genetics,Vermillion,BGI,Genoptix,NantHealth,Foundation Medicine,Navican,Personal Genome Diagnostics (PGD),Tempus,Genomic Health,Biocept,Resolution Biomedical,Illumina,NEO New Oncology AG,Admera,Biocartis,Genetron Health,Sysmex Corporation,Trovagene,ArcherDX,Amoy Diagnostic,AccuraGen Holdings,Burning Rock Biotech,Inivata,Menarini,RainDance Technologies,Caris Life Sciences,Sophia Genetics,MedGenome Inc.,HaploX Biotechnology,Cambridge Cancer Genomics"
		this.indicationList="(All),Lung,Breast,Prostate,Colorectal,Leukemia/Lymphoma,Gastric,Melanoma,Pan-Cancer,Others/NA"
		this.clinicalList = "(All),Screening,Early Detection,Monitoring,Tx Selection,Risk Assessment,Diagnosis,Translational Research"
		this.technologyList = "(All),NGS,RT-PCR/qPCR,ddPCR,Microarray,Immunoassay,Sanger Sequencing,Flow Cytometry,Mass Spec,Other Technology"
		this.statusList= "(All),Commercialized,In-development,Other"
		this.analyteList= "(All),DNA,RNA,Protein,Cells"
		this.biomarkerList = "(All),ctDNA,cfDNA,CTC,RNA,methylated DNA,DNA,Other"
		this.sampleList = "(All),Blood,Tissue,Saliva,Stool,Other"
	}

	componentDidMount() {
		this.props.columns.forEach((col) => {
			document.getElementById(`productColumn-${col}`).checked = true
		})
	}

	updateData() {
		this.props.updateProductData(this.props.products, this.props.filters)
	}

	handleSearchName(e) { 
		this.props.filterProductName(e.target.value)
		this.updateData()
	}

	handleDropdownOptions(type, item) {
		this.props.filterProductDropdownOptions(type, item)
	}

	clearDropdownOptions(type) {
		this.props.clearProductDropdownOptions(type)
	}

	fillColumn() {
	    let inputs = document.querySelectorAll('.productColumnCheckbox')
	    for (let i = 0; i < inputs.length; i++) {
	      inputs[i].checked = true;
	    }
		this.props.fillProductColumn()
	}

	render() {
		const { processedProducts, filters } = this.props
		return (
			<div className="side-nav with-shadow-light">
				<div className="company-count">
					<h6><strong>{processedProducts.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> Products</h6>
				</div>
				<div className="mr-auto company-search">
					<FilterInstruction name="Product Name" type="Product" content="Search for the exact name of the product"/>
					<input className="form-control mr-sm-2 search-companyInput" type="search" placeholder="Search Products.." aria-label="Search" onChange={this.handleSearchName.bind(this)}/>
			  	</div>
				<div className="category-filter">
					<FilterInstruction name="Company Name" type="Company" content="Filter down products by selecting one or more companies. Use the search bar to look up relevant companies"/>
					<DropdownOptions 
						name="Company" type="company" list={this.companyList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>			  	
				<div className="category-filter">
					<FilterInstruction name="Display Columns" type="Column" content="Select columns to display and export in the data table"/>
					<DropdownOptions 
						name="Columns" type="productColumn" list={this.productColumns} updateData={this.updateData.bind(this)} fillColumn={this.fillColumn.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>

				<div className="category-filter">
					<FilterInstruction name="Indication Focus" type="Indication" content='Filter down products by selecting their indication focus.'/>
					<DropdownOptions 
						name="Indication" type="indication" list={this.indicationList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Clinical Application" type="Clinical" content='Filter down products by clinical application'/>
					<DropdownOptions 
						name="Clinical" type="clinical" list={this.clinicalList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Analyte" type="Analyte" content='Filter down products by analyte'/>
					<DropdownOptions 
						name="Analyte" type="analyte" list={this.analyteList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Biomarker Group" type="Biomarker" content='Filter down products by biomarker group'/>
					<DropdownOptions 
						name="Biomarker" type="biomarker" list={this.biomarkerList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
				<div className="category-filter">
					<FilterInstruction name="Sample Type" type="Sample" content='Filter down products by sample types'/>
					<DropdownOptions 
						name="Sample" type="sample" list={this.sampleList.split(',')} updateData={this.updateData.bind(this)}
						handleDropdownOptions={this.handleDropdownOptions.bind(this)} clearDropdownOptions={this.clearDropdownOptions.bind(this)}/>
				</div>
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

export default connect(mapStateToProps, { 
	filterProductName, filterProductDropdownOptions, clearProductDropdownOptions, fillProductColumn, updateProductData 
})(Filter)