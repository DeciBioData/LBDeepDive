import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFeedData } from '../../actions/dataActions'
import { filterFeedDropdown, clearFeedDropdown } from '../../actions/filterActions'

class DropdownFilter extends Component {

	constructor(props) {
		super(props)
		this.name = props.name
		this.type = props.type
		this.list = Array.from(new Set(props.data.map((entry) => entry[this.props.type])))
	}

	searchItem(e) {
	    const matchPrefix = (prefix, str) => {
	      prefix = prefix.toLowerCase()
	      str = str.toLowerCase()

	      if(prefix.length > str.length) return false
	      for(let i = 0; i < prefix.length; i++) {
	        if(prefix[i] !== str[i]) return false
	      }
	      return true
	    }

	    let tag = e.target.value
	    let items = document.getElementsByClassName(`${this.type}-items`)
		for(let i = 0; i < items.length; i++) {
			let value = items[i].getElementsByClassName(`${this.type}Checkbox`)[0].value
			if(tag !== "" && !matchPrefix(tag, value)) {
				items[i].style.display = "none"
			}else {
				items[i].style.display = ""
			}
		}
	}

	handleItem(item) {
		this.props.filterFeedDropdown(this.type, item)  
		this.props.updateFeedData(this.props.companies, this.props.feedFilters)	
	}

	selectAll() {
	    let inputs = document.querySelectorAll(`.${this.type}Checkbox`)
	    for (let i = 0; i < inputs.length; i++) {
	      inputs[i].checked = false;
	    }
	    this.props.clearFeedDropdown(this.type)
	    this.props.updateFeedData(this.props.companies, this.props.feedFilters) 
	}

	render() {
		return (
			<div>
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		        	{ this.name }
		        </a>
		        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
				  	<input className="tagSearchInput" type="text" placeholder="Search..." onChange={this.searchItem.bind(this)} />
				  	<div className="dropdown-divider"></div>
				  	<a className="dropdown-item" href="#" onClick={this.selectAll.bind(this)}>All</a>
					{
						this.list.map((item, index) => {
							return (
								<div className={`form-check dropdown-item ${this.type}-items`} key={index}>
								  <input className={`form-check-input ${this.type}Checkbox`} type="checkbox" value={item} id={`${this.type}-${item}`} onChange={this.handleItem.bind(this, item)}/>
								  <label className="form-check-label" htmlFor={item}>
								   	{item}
								  </label>
								</div>								
							)
						})
					}
		        </div>
	        </div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.data.feed_companies,
	feedFilters: state.filter.feedFilters
})

export default connect(mapStateToProps, { updateFeedData, filterFeedDropdown, clearFeedDropdown })(DropdownFilter)

