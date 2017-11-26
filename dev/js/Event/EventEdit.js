import React, {Component} from 'react';
import * as cf from './../functions';

export default class EventEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventEditId: this.props.event.id,
			eventEditIdea: this.props.event.idea,
			eventEditDur: this.props.event.dur
		}
	}

	changeHandler = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}

	submitEventEdit = e => {
		e.preventDefault();
		this.props.submitEventEdit({
			id: this.state.eventEditId,
			idea: this.state.eventEditIdea,
			dur: this.state.eventEditDur
		});
	}

	render() {

		const {i, day} = this.props;
		const {hours, minutes, start, idea, dur} = this.props.event;
		let options = [];
		let nextEventIndex = 144;

		for(let index = i + 1; index < 144; index++) {
			if(day[index].id) {
				nextEventIndex = index;
				break;
			}
		}

		for(let d = 0, index = i + 1; index <= nextEventIndex; index++) {
			let indexDur = ++d * 10;
			if(index !== 144) {
				options.push(<option key={index} value={indexDur}>{cf.formatHoursMinutes(day[index].hours, day[index].minutes)}</option>);
			} else {
				options.push(<option key={index} value={indexDur}>{cf.formatHoursMinutes(0, 0)}</option>);
			}
		}

		return (
			<div className="edit-event-form">
				<form onSubmit={this.submitEventEdit}>
					<textarea name="eventEditIdea" onChange={this.changeHandler} defaultValue={idea}></textarea>
					<div className="buttons">
						<button className="button" onClick={this.props.cancelEventEdit} type="button"><i className="icon-cross"></i></button>
						<div className="time">
							<div className="start">{cf.formatHoursMinutes(hours, minutes)}</div>
							<div className="hyphen">-</div>
							<div className="finish">
								<select name="eventEditDur" onChange={this.changeHandler} defaultValue={dur}>
									{options}
								</select>
							</div>
						</div>
						<button className="submit" type="submit"><i className="icon-plus"></i></button>
					</div>
				</form>
			</div>
		)
	}
}