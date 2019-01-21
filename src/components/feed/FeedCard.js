import React from 'react'
import { processedDate } from '../../actions/otherActions'

const FeedCard = ({ companyInfo }) => {
	return (
		<div className="card with-shadow">
			<div className="card-body">
				<h5 className="card-title feed-title"><strong>{ companyInfo.title }</strong></h5>
				<div className="feed-type">{ companyInfo.type } | { processedDate(companyInfo.date) }</div>
				<p className="feed-abstract">
					{ companyInfo.abstract }
				</p>
				<div>
					<a className="readMore-link" href={ companyInfo.link } target="_blank">READ MORE</a>
					<a className="share-link" href={ companyInfo.link } target="_blank"><i className="fa fa-share-alt"></i></a>
				</div>
			</div>
		</div>
	)
}

export default FeedCard