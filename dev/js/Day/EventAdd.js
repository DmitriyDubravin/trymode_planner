import React, {Component} from 'react';
import * as cf from './../functions';

export default class EventAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventAddDur: 10
		}
	}

	changeHandler = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}

	submitEventAdd = e => {
		e.preventDefault();
		this.props.submitEventAdd({
			start: this.props.event.time / 1000,
			dur: this.state.eventAddDur,
			idea: this.state.eventAddIdea
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
				options.push(<option key={index} value={indexDur+10}>{cf.formatHoursMinutes(0, 0)}</option>);
			}
		}

		return (
			<div className="add-event-form">
				<form onSubmit={this.submitEventAdd}>
					<textarea name="eventAddIdea" onChange={this.changeHandler}></textarea>
					<div className="buttons">
						<button className="button" onClick={this.props.cancelEventAdd}><i className="icon-cross"></i></button>
						<div className="time">
							<div className="start">{cf.formatHoursMinutes(hours, minutes)}</div>
							<div className="hyphen">-</div>
							<div className="finish">
								<select name="eventAddDur" onChange={this.changeHandler}>
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