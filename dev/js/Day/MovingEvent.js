import React, {Component} from 'react';
import * as cf from './../functions';

export default class MovingEvent extends Component {
	render() {
		const {hours, minutes, idea} = this.props.movingEvent.event;
		return (
			<div className="moving-event">
				<p>Moving event:</p>
				<p>{cf.formatHoursMinutes(hours, minutes)} - {idea}</p>
			</div>
		)
	}
}