import React, {Component} from 'react';
import {setEventDone} from './../serverInteractions';
import * as cf from './../functions';


export default class EventMove extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {id, hours, minutes, dur, idea} = this.props.event;

		let startTime = cf.formatHoursMinutes(hours, minutes);
		let totalEndMinutes = hours * 60 + minutes + +dur;
		let endHours = Math.floor(totalEndMinutes / 60);
		let endMinutes = totalEndMinutes - endHours * 60;
		let endTime = totalEndMinutes === 24 * 60 ? `00:00` : cf.formatHoursMinutes(endHours, endMinutes);

		return (
			<div className="event move">
				<span className="time">{startTime} - {endTime}</span> | {this.props.event.idea}
				<div className="settings">
					<button onClick={() => {this.props.cancelEventMove()}}><i className="icon-shuffle"></i></button>
				</div>
			</div>
		);
	}
}