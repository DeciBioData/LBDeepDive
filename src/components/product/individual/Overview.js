/* eslint-disable */
import React from 'react'

const Overview = ({productInfo}) => {
	return (
		<div>
			<div className="description-header">
				<span className="customize-h3">Product Overview</span>
			</div>
			<div className="description-body">
				<p>{productInfo.description ? productInfo.description : <span>(No Company Overview)</span>}</p>
			</div>
			<hr />
			<div className="row">
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Indication Focus</span>
					<p>{productInfo.indication ? productInfo.indication : <span>(No content)</span>}</p>
				</div>
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Clinical Application</span>
					<p>{productInfo.clinicalapplication ? productInfo.clinicalapplication : <span>(No content)</span>}</p>
				</div>
			</div>
			<div className="row">
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Technology</span>
					<p>{productInfo.technology ? productInfo.technology : <span>(No content)</span>}</p>
				</div>
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Analyte</span>
					<p>{productInfo.analyte ? productInfo.analyte : <span>(No content)</span>}</p>
				</div>
			</div>
			<div className="row">
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Biomarker Group</span>
					<p>{productInfo.biomarkergroup ? productInfo.biomarkergroup : <span>(No content)</span>}</p>
				</div>
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Sample Type</span>
					<p>{productInfo.sampletype ? productInfo.sampletype : <span>(No content)</span>}</p>
				</div>
			</div>
		</div>
	)
}

export default Overview