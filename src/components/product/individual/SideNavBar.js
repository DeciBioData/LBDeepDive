/* eslint-disable */
import React from 'react'

const SideNavBar = ({productInfo, companyInfo}) => {
	return (
		<div>
			<div className="side-nav with-shadow-light">
				<div className="company-count row">
					<h6 className="col-md-6 col-6 col-sm-6"><strong>{ productInfo.productname }</strong></h6>
					<div className="col-md-6 col-6 col-sm-6">{companyInfo.imageURL ? <img className="img-fluid rounded company-img" src={companyInfo.imageURL}/> : ''}</div>
				</div>
				<div className="company-search row">
				  	<div className="col-md-6 col-6 col-sm-6"><h6><strong>{companyInfo.name}</strong></h6></div>
				  	<div className="col-md-6 col-6 col-sm-6">
				  	{
				  		companyInfo.websites.map((website, index) => {
				  			let webInfo = website.properties
				  			let icon = webInfo.website_name.toLowerCase() == 'homepage' ? 'fa fa-share-alt' : `fa fa-${(webInfo.website_name).toLowerCase()}-square`
				  			return (
				  				<a key={index} href={webInfo.url} className="webLink" target="_blank">
				  					<i className={icon}></i>
				  				</a>
				  			)
				  		})
				  	}
				  	</div>					
				</div>
				<hr />
				<div className="sideMenu">
					<h6><strong>Products Details</strong></h6>		
				</div>
				<div className="list-group">
				  <a href={`/product/info/${companyInfo.id}/${productInfo.productid}`} className="list-group-item list-group-item-action border-0">Overview</a>
				  <a href={`/product/info/${companyInfo.id}/${productInfo.productid}/technical_specification`} className="list-group-item list-group-item-action border-0">Technical Specification</a>
				  <a href={`/product/info/${companyInfo.id}/${productInfo.productid}/expert_feedback`} className="list-group-item list-group-item-action border-0">Expert Feedback</a>
				</div>
			</div>
		</div>
	)
}

export default SideNavBar