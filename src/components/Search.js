import React, {Component} from 'react';

class Search extends Component{
	render() {
		return (
			<div className="form-group form-inline">
				<input
					value={this.props.nameSearch}
					type="text" className="form-control marginR5" placeholder="Search item name..." 
					onChange={(event) => this.props.handleChangeNameSearch(event.target.value)}
				/>
				<button 
					className="btn btn-info" type="reset"
					onClick={() => this.props.handleClearNameSearch()}
				>Clear</button>
			</div>
		);
	}
}

export default Search;