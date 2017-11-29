import React, {Component} from 'react';
import * as cf from './../functions';



export default class EventAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventAddDur: 10,
			eventAddIdea: null
		}
	}

	componentDidMount() {
		this.textarea.focus();
	}

	changeHandler = e => {
		let name = e.target.name;
		let value = e.target.value;

		if(name === 'eventAddDur2') {
			name = 'eventAddDur';
			this.select1.value = value;
		}
		if(name === 'eventAddDur') {
			this.select2.value = value;
		}

		this.setState({[name]: value});
	}

	submitEventAdd = e => {
		e.preventDefault();
		if(this.state.eventAddIdea) {
			this.props.submitEventAdd({
				i: this.props.i,
				start: this.props.event.time / 1000,
				dur: this.state.eventAddDur,
				idea: this.state.eventAddIdea
			});
		}
	}

	render() {

		const {i, day} = this.props;
		const {hours, minutes, start, idea, dur} = this.props.event;
		let options = [];
		let options2 = [];
		let nextEventIndex = 144;

		for(let index = i + 1; index < 144; index++) {
			if(day[index].id) {
				nextEventIndex = index;
				break;
			}
		}

		for(let d = 0, index = i + 1; index <= nextEventIndex; index++) {
			let indexDur = ++d * 10;

			let hours2 = Math.floor(indexDur / 60);
			let minutes2 = indexDur - hours2 * 60
			let time2 = `${hours2 > 9 ? hours2 : '0'+hours2}:${minutes2 === 0? '00' : minutes2}`;

			if(index !== 144) {
				options.push(<option key={index} value={indexDur}>{cf.formatHoursMinutes(day[index].hours, day[index].minutes)}</option>);
				options2.push(<option key={index} value={indexDur}>{time2}</option>);
			} else {
				options.push(<option key={index} value={indexDur}>{cf.formatHoursMinutes(0, 0)}</option>);
				options2.push(<option key={index} value={indexDur}>{time2}</option>);
			}
		}

		return (
			<div className="add-event-form">
				<form onSubmit={this.submitEventAdd}>
					<textarea
						name="eventAddIdea"
						onChange={this.changeHandler}
						ref={textarea => this.textarea = textarea}
					></textarea>
					<div className="buttons">
						<button className="button" onClick={this.props.cancelEventAdd}><i className="icon-cross"></i></button>
						<div className="time">
							<div className="field">{cf.formatHoursMinutes(hours, minutes)}</div>
							<div className="hyphen">-</div>
							<div className="field">
								<select
									name="eventAddDur"
									onChange={this.changeHandler}
									ref={select1 => this.select1 = select1}
								>
									{options}
								</select>
							</div>
							<div className="hyphen">-</div>
							<div className="field">
								<select
									name="eventAddDur2"
									onChange={this.changeHandler}
									ref={select2 => this.select2 = select2}
								>
									{options2}
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