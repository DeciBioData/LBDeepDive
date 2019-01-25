/* eslint-disable */
import React from 'react'

class Product extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			productList: []
		}
	}

	componentDidMount() {
		const productList = this.props.products.filter((product) => {
			if(product.uuid === this.props.uuid) {
				return true
			}
			return false
		}).map((product) => {
			return {
				productName: product.productname,
				description: product.description,
				clinicalApp: product.clinicalapplication,
				indication: product.indication,
				productid: product.productid
			}
		})
		this.setState({ productList })
	}

	render() {
		console.log(this.state.productList)
		return (
			<div>
				<div className="description-header">
					<span className="customize-h3">Company Products</span>
				</div>
				{
					this.state.productList.length == 0 ? <p className="description-body">(No content)</p> :
					(
						<table className="table">
						  <thead className="table-heading">
						    <tr>
						      <th scope="col">Product Name</th>
						      <th scope="col">Description</th>
						      <th scope="col">Clinical Application</th>
						      <th scope="col">Indication</th>
						    </tr>
						  </thead>
						  <tbody>
						  	{
						  		this.state.productList.map((product, index) => {
						  			return(
									    <tr key={index}>
									      <td><a href={`/product/info/${this.props.uuid}/${product.productid}`}>{product.productName}</a></td>
									      <td>{product.description ? product.description : '(None)'}</td>
									      <td>{product.clinicalApp ? product.clinicalApp : '(None)'}</td>
									      <td>{product.indication ? product.indication : '(None)'}</td>
									    </tr>
						  			)
						  		})
						  	}
						  </tbody>
						</table>
					)
				}
			</div>
		)
	}
}

export default Product