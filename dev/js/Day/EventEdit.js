import React, {Component} from 'react';
import * as cf from './../functions';

export default class EventEdit extends Component {
	constructor(props) {
		super(props);
	}

	changeHandler = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}

	submitEventEdit = () => {
		this.props.submitEventEdit({
			idea: this.state.eventEditIdea,
			dur: this.state.eventEditDur
		});
	}

	render() {

		const {i, hours, minutes, start, idea, dur} = this.props.event;
		const {day} = this.props.day;

		let options = [];
		if(i === 143) {
			options.push(<option key={i} value={10}>{cf.formatHoursMinutes(0, 0)}</option>);
		}
		for(let o = i + 1; o < 144; o++) {
			let startingMinutes = hours * 60 + minutes;
			let endingMinutes = day[o].hours * 60 + day[o].minutes;
			let dur = endingMinutes - startingMinutes;
			options.push(<option key={o} value={dur}>{cf.formatHoursMinutes(day[o].hours, day[o].minutes)}</option>);
			if(o === 143) {
				options.push(<option key={o+1} value={dur+10}>{cf.formatHoursMinutes(0, 0)}</option>);
			}
			if(day[o].id) break;
		}

		return (
			<div className="edit-event-form">
				<form onSubmit={this.submitEventEdit}>
					<textarea name="eventEditIdea" onChange={this.changeHandler} defaultValue={idea}></textarea>
					<div className="buttons">
						<button className="button" onClick={this.props.cancelEventEdit}><i className="icon-cross"></i></button>
						<div className="time">
							<div className="start">{cf.formatHoursMinutes(hours, minutes)}</div>
							<div className="hyphen">-</div>
							<div className="finish">
								<select name="eventEditDur" onChange={this.changeHandler} defaultValue={dur}>
									{options}
								</select>
							</div>
						</div>
						<button className="submit"><i className="icon-plus"></i></button>
					</div>
				</form>
			</div>
		)
	}
}