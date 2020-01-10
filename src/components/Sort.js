import React, {Component} from 'react';

class Sort extends Component{
	renderSort = () => {
		let {sortType, sortOrder} = this.props;
		console.log(sortType, sortOrder);
		if (sortType !== '' && sortOrder !== '') {
			return (
				<span className="label label-success label-medium text-uppercase">
					{sortType} - {sortOrder}
				</span>
			);
		}	
	}

	renderOptionSort = () => {
		let arrayFieldSort = ['name', 'level'];
		return arrayFieldSort.map((field, index) => {
			return (
				<option value={field} key={index}>{field}</option>
			);
		});
	}

	render() {
		return (
			<div className="form-group form-inline">
				<select 
					className="form-control form-inline text-uppercase" style={{width: '50%'}}
					defaultValue={this.props.sortType}
					onChange={(event) => this.props.handleChangeFieldSort(event.target.value)}
				>
					{this.renderOptionSort()}
				</select>
				<select 
					className="form-control form-inline text-uppercase" style={{width: '50%'}}
					defaultValue={this.props.sortOrder}
					onChange={(event) => this.props.handleChangeTypeSort(event.target.value)}
				>
					<option value="asc">ASC</option>
					<option value="desc">DESC</option>
				</select>
			</div>
		);
	}
}

export default Sort;
