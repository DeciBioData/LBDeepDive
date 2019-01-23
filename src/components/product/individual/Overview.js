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
					<p>{productInfo.indication}</p>
				</div>
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Clinical Application</span>
					<p>{productInfo.clinicalapplication}</p>
				</div>
			</div>
			<div className="row">
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Technology</span>
					<p>{productInfo.technology}</p>
				</div>
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Analyte</span>
					<p>{productInfo.analyte}</p>
				</div>
			</div>
			<div className="row">
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Biomarker Group</span>
					<p>{productInfo.biomarkergroup}</p>
				</div>
				<div className="col-6 col-md-6 col-sm-6">
					<span className="customize-h3">Sample Type</span>
					<p>{productInfo.sampletype}</p>
				</div>
			</div>
		</div>
	)
}

export default Overview