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
				<h6 className="feedSummary-title"><strong>Summary</strong></h6>
				<div className="feedSummary-types">
			        <HorizontalBar
							height={270}
			          data={
			          	{
				          	labels: typeList,
					        datasets:[
					          {
					            data: Array.from(countTypes(data).values()),
					            backgroundColor: 'rgba(44, 130, 201, 1)',
      								borderColor: 'rgba(107, 185, 240, 1)',
      								borderWidth: 1,
      								hoverBackgroundColor: 'rgba(34, 167, 240, 1)',
      								hoverBorderColor: 'rgba(34, 167, 240, 1)'
					          }
					        ]
			            }
			      	  }
			          options={{
									legend:{ display: false },
									scales: {
										xAxes: [{
												gridLines: {
														color: "rgba(0, 0, 0, 0)",
												}
										}],
										yAxes: [{
												gridLines: {
														color: "rgba(0, 0, 0, 0)",
														display: false
												}   
										}]
								}
			          }}
			        />
				</div>
			</div>
			<div><br></br></div>
			<div className="feedSummary-trendingCompany">
				<h6 className="feedSummary-title"><strong>Trending Companies</strong></h6>
				<div className="feedSummary-companyLogos">
					<ul>
					{
						companyList.map((logo, index) => {
							return (
								<li key={index}><img src={logo} width="65" className="d-inline-block align-top logo-img"/></li>
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