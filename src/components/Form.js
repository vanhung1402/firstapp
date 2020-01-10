import React, {Component} from 'react';

class Form extends Component{
	renderLevel() {
		const {arrayLevel} = this.props;

		return arrayLevel.map((level, index) => {
			let levelLabel = '';
			switch (level) {
				case 1:
					levelLabel = 'Low';
					break;
				case 2:
					levelLabel = 'Medium';
					break;
				case 3:
					levelLabel = 'High';
					break;
				default:
					levelLabel = 'Low';
					break;
			}
			return <option key={index} value={level}>{levelLabel}</option>;
		});
	}

	render() {
		if (this.props.showForm === false) {
			return null;
		}

		return (
			<form className="form-inline">
				<div className="form-group marginR5">
					<input
						type="text" className="form-control" placeholder="Item name" 
						defaultValue={this.props.valueItem}
						onChange={(event) => this.props.handleFormInputChange(event.target.value)}
					/>
				</div>
				<div className="form-group marginR5">
					<select
						className="form-control"
						defaultValue={this.props.levelItem}
						onChange={(event) => this.props.handleFormSelectChange(event.target.value)}
					>
						{this.renderLevel()}
					</select>
				</div>
				<button
					className="btn btn-primary form-control marginR5" type="button"
					onClick={() => this.props.handleFormSubmitClick()}
				>Submit</button>
				<button 
					className="btn btn-default form-control" type="button"
					onClick={() => this.props.handleFormCancelClick()}
				>Cancel</button>
			</form>
		);
	}
}

export default Form;
