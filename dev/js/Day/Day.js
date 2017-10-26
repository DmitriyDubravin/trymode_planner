import React, {Component} from 'react';
import {getDay} from './../serverInteractions';
import * as cf from './../functions';
import Event from './Event';

export default class Day extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addingEventId: null,
			addingEventDur: 10
		}
	}

	getAndSetDay() {
		const handleDayData = (data) => {
			if(data.response === 'no events was found') {
				this.props.setDay(null);
			} else {
				let day = cf.buildInitialDayCells(this.props.date.selected);
				for(let i = 0; i < data.data.length; i++) {
					let date = new Date(data.data[i].start * 1000);
					let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
					day[index] = {...day[index], ...data.data[i]};
				}
				this.props.setDay(day);
			}
		}
		getDay(
			Math.floor(this.props.date.selected / 1000),
			this.props.user.token,
			handleDayData
		);
	}

	componentDidMount() {
		this.getAndSetDay();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.date.selected !== this.props.date.selected) {
			this.getAndSetDay();
		}
	}

	startAddingEvent = key => {
		this.setState({addingEventId: key});
	}
	cancelAddingEvent = () => {
		this.setState({addingEvent: null});
	}
	addEvent = e => {
		e.preventDefault();
		let event = {
			start: this.eventTime.defaultValue,
			dur: this.state.addingEventDur,
			idea: this.state.addingEventText,
			status: ""
		};
		console.log(event);
	}
	changeHandler = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}

	render() {
		if(!this.props.data.day) return <div>loading...</div>;

		let dayCells = [];
		let gap = 0;

		for(let i = 0; i < 144; i++) {
			let {hours, minutes, time} = this.props.data.day[i];
			let cell = this.props.data.day[i];



			if(cell.id) {
				dayCells[i] = <Event key={i} event={cell}/>;
				i += +cell.dur / 10 - 1;

				let endMinutes = hours * 60 + minutes + +cell.dur;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;
				
			} else if(this.state.addingEventId === i) {
				let endMinutes = hours * 60 + minutes + 10;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;

				let options = [];
				for(let o = i + 1; o < 144; o++) {
					let startingMinutes = hours * 60 + minutes;
					let endingMinutes = this.props.data.day[o].hours * 60 + this.props.data.day[o].minutes;
					let dur = endingMinutes - startingMinutes;
					options.push(<option key={o} value={dur}>{cf.formatHoursMinutes(this.props.data.day[o].hours, this.props.data.day[o].minutes)}</option>);
					if(this.props.data.day[o].id) break;
				}

				dayCells[i] = (
					<div key={i} className="add-event-form">
						<form onSubmit={this.addEvent}>
							<textarea name="addingEventText" onChange={this.changeHandler}></textarea>
							<div className="buttons">
								<button className="button" onClick={this.cancelAddingEvent}><i className="icon-cross"></i></button>
								<div className="time">
									<div className="start">{cf.formatHoursMinutes(hours, minutes)}</div>
									<div className="hyphen">-</div>
									<div className="finish">
										<select name="addingEventDur" onChange={this.changeHandler}>
											{options}
										</select>
									</div>
								</div>
								<input type="hidden" name="time" value={time} ref={eventTime => this.eventTime = eventTime} />
								<button className="submit"><i className="icon-plus"></i></button>
							</div>
						</form>
					</div>
				)
			} else {
				let cls = gap === 0 ? 'cell' : `cell gap${gap}`;
				dayCells[i] = (
					<div
						key={i}
						className={cls}
						onClick={() => this.startAddingEvent(i)}
						>
						{cf.formatHoursMinutes(hours, minutes)}
					</div>
				)
				gap = 0;
			}

		}

		return (
			<div className='day'>
				<div className="days-cells">
					{dayCells}
				</div>
			</div>
		);
	}
};