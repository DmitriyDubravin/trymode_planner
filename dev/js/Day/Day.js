import React, {Component} from 'react';
import {getDay} from './../serverInteractions';
import * as cf from './../functions';
import Event from './Event';

export default class Day extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addingEvent: null,
			addingEventDur: 0
		}
	}

	getAndSetDay() {
		const handleDayData = (data) => {
			if(data.response === 'no events was found') {
				this.props.setDay(null);
			} else {
				let day = cf.buildInitialDayCells();
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

	addEvent = key => {
		this.setState({addingEvent: key});
		console.log(this.state.addingEvent);
	}

	render() {
		if(!this.props.data.day) return <div>loading...</div>;

		let dayCells = [];
		let gap = 0;

		for(let i = 0; i < 144; i++) {
			let {hours, minutes} = this.props.data.day[i];
			let cell = this.props.data.day[i];



			if(cell.id) {
				dayCells[i] = <Event key={i} event={cell}/>;
				i += +cell.dur / 10 - 1;

				let endMinutes = hours * 60 + minutes + +cell.dur;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;
				
			} else if(this.state.addingEvent === i) {
				let endMinutes = hours * 60 + minutes + 10;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;

				dayCells[i] = (
					<div key={i} className="add-event-form">
						<form>
							<textarea></textarea>
							<div className="buttons">
								<button className="button">Delete</button>
								<div className="start">00:00</div>
								<div className="finish">
									<select>
										<option>00:00</option>
									</select>
								</div>
								<button className="button">Add</button>
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
						onClick={() => this.addEvent(i)}
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