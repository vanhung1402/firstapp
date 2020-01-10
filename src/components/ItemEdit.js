import React, {Component} from 'react';

class ItemEdit extends Component{
	renderLevel = () => {
		const {arrayLevel} = this.props;

		return arrayLevel.map((level, index) => {
			let label_level = 'High';
			switch (level) {
				case 1:
					label_level = 'Low';
					break;
				case 2:
					label_level = 'Medium';
					break;
				case 3:
					label_level = 'High';
					break;
				default:
					label_level = 'Low';
					break;
			}
			return <option key={index} value={level}>{label_level}</option>
		});
	}

	render(){
		return (
			<tr>
				<td className="text-center">{this.props.indexEdit + 1}</td>
				<td>
					<input 
						type="text" className="form-control" 
						defaultValue={this.props.nameEdit}
						onChange={(event) => this.props.handleEditInputChange(event.target.value)}
					/>
				</td>
				<td className="text-center">
					<select 
						className="form-control"
						defaultValue={this.props.levelEdit}
						onChange={(event) => this.props.handleEditSelectChange(event.target.value)}
					>
						{this.renderLevel()}
					</select>
				</td>
				<td>
					<button 
						type="button" className="btn btn-default btn-sm marginR5"
						onClick={() => this.props.handleEditItemCancel()}
					>Cancel</button>
					<button 
						type="button" className="btn btn-success btn-sm"
						onClick={() => this.props.handleEditClickSubmit()}
					>Save</button>
				</td>
			</tr>
		);
	}
}

export default ItemEdit;