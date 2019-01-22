import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { getLastestTrending, countTypes } from '../../actions/otherActions'

const FeedSummary = ({ data }) => {
	const typeList = Array.from(countTypes(data).keys())
	const lastestCompanies = getLastestTrending(data)
	const companyList = lastestCompanies.map((entry) => entry.logourl)
	return (
		<div>
			<div className="feedSummary-typeRank">
				<h6 className="feedSummary-title"><strong>Feed Summary</strong></h6>
				<div className="feedSummary-types">
			        <HorizontalBar
			          data={
			          	{
				          	labels: typeList,
					        datasets:[
					          {
					            data: Array.from(countTypes(data).values()),
					            backgroundColor: 'blue'
					          }
					        ]
			            }
			      	  }
			          options={{
			            legend:{ display: false }
			          }}
			        />
				</div>
			</div>
			<div className="feedSummary-trendingCompany">
				<h6 className="feedSummary-title"><strong>Trending Companies</strong></h6>
				<div className="feedSummary-companyLogos">
					<ul>
					{
						companyList.map((logo, index) => {
							return (
								<li key={index}><img src={logo} width="75" className="d-inline-block align-top logo-img"/></li>
							)
						})
					}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default FeedSummary