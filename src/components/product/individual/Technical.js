/* eslint-disable */
import React from 'react'
import { formatDollar, toPercentage } from '../../../actions/otherActions'

const Technical = ({productInfo}) => {
	return (
		<div className="row">
			<div className="col-6 col-md-6 col-sm-6">
				<div className="description-header">
					<span className="customize-h3">Technical Specification</span>
				</div>
				<div className="description-body">
					<table className="table">
					  <tbody>
					    <tr>
					      <td>Sensitivity</td>
					      <td className="text-right">{productInfo.sensitivity ? toPercentage(productInfo.sensitivity) : '(none)'}</td>
					    </tr>
					    <tr>
					      <td>Specificity</td>
					      <td className="text-right">{productInfo.specificity ? toPercentage(productInfo.specificity) : '(none)'}</td>
					    </tr>
					    <tr>
					      <td>Min. Sample Volume</td>
					      <td className="text-right">{productInfo.samplevolume ? productInfo.samplevolume : '(none)'}</td>
					    </tr>
					    <tr>
					      <td>TAT</td>
					      <td className="text-right">{productInfo.tat ? productInfo.tat : '(none)'}</td>
					    </tr>
					    <tr>
					      <td>Panel Size</td>
					      <td className="text-right">{productInfo.panelsize ? productInfo.panelsize : '(none)'}</td>
					    </tr>
					    <tr>
					      <td>Price</td>
					      <td className="text-right">{productInfo.price ? formatDollar(productInfo.price) : '(none)'}</td>
					    </tr>
					  </tbody>
					</table>
				</div>
			</div>
			<div className="col-6 col-md-6 col-sm-6">
				<div className="description-header">
					<span className="customize-h3">Biomarker List</span>
				</div>
				<div className="description-body product-biomarkerlist">
					<ul>
					{
						productInfo.biomarkerlist ? productInfo.biomarkerlist.split(',').map((item, index) => {
							return (
								<li key={index}>{item}{index === productInfo.biomarkerlist.split(',').length - 1 ? '' : ', '}</li>
							)
						}) : <span>(No content)</span>
					}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Technical