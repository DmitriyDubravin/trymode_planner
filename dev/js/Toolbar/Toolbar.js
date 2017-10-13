import React, {Component} from 'react';
import * as cf from './../functions';

export default class Toolbar extends Component {

	selectToday = () => {
		this.props.setCurrentTime(cf.getUTCTimestamp());
		let date = new Date();
		this.props.setSelectedTime(cf.getLocalTimestamp(date.getFullYear(), date.getMonth(), date.getDate()));
		this.props.setShowingTime(cf.getUTCTimestamp());
		this.props.calendarOff();
	}
	selectPrevDay = () => {
		this.props.setSelectedTime(this.props.date.selected - 86400000);
	}
	selectNextDay = () => {
		this.props.setSelectedTime(this.props.date.selected + 86400000);
	}

	render() {
		const formattedDate = cf.formatDate(cf.convertLocalTimeToLocalDate(this.props.date.selected));

		return (
			<div>
				<div className="diary">
					<div className="date">
						<button className="btn btn-prev-day" onClick={() => this.selectPrevDay()}><i className="icon-arrow-left2"></i></button>
						<button className="btn btn-next-day" onClick={() => this.selectNextDay()}><i className="icon-arrow-right2"></i></button>
						<button className="btn btn-today" onClick={() => this.selectToday()}><i className="icon-target"></i></button>
						<button className="btn btn-calendar" onClick={() => this.props.calendarToggle()}><i className="icon-calendar"></i></button>
						{formattedDate}
					</div>
				</div>
			</div>
		)
	}
}