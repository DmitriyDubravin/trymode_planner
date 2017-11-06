import React, {Component} from 'react';


export default class EventEdit extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="edit-event-form">
				<form onSubmit={this.submitEventEdit}>
					<textarea name="eventEditText" onChange={this.changeHandler} defaultValue={this.props.event.idea}></textarea>
					<div className="buttons">
						<button className="button" onClick={this.cancelEventEdit}><i className="icon-cross"></i></button>
						<div className="time">
							<div className="start">{cf.formatHoursMinutes(hours, minutes)}</div>
							<div className="hyphen">-</div>
							<div className="finish">
								<select name="eventEditDur" onChange={this.changeHandler} defaultValue={this.props.event.dur}>
									{options}
								</select>
							</div>
						</div>
						<input type="hidden" name="time" value={this.props.event.start} ref={eventEditTime => this.eventEditTime = eventEditTime} />
						<button className="submit"><i className="icon-plus"></i></button>
					</div>
				</form>
			</div>
		)
	}
}