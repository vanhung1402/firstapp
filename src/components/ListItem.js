import React, {Component} from 'react';

class ListItem extends Component{

	render(){
		return (
			<div className="panel panel-success">
				<div className="panel-heading">List Items</div>
				<table className="table table-hover">
					<thead>
						<tr>
							<th style={{width: '10%'}} className="text-center">#</th>
							<th>Name</th>
							<th style={{width: '15%'}} className="text-center">Level</th>
							<th style={{width: '15%'}}>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.listRenderItem()}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ListItem;