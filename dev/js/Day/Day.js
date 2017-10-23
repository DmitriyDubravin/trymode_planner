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
	}
	cancelAddingEvent = () => {
		this.setState({addingEvent: null});
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

				let options = [];
				for(let o = i + 1; o < 144; o++) {
					options.push(<option key={o}>{cf.formatHoursMinutes(this.props.data.day[o].hours, this.props.data.day[o].minutes)}</option>);
					if(this.props.data.day[o].id) break;
				}

				dayCells[i] = (
					<div key={i} className="add-event-form">
						<form>
							<textarea></textarea>
							<div className="buttons">
								<button className="button" onClick={() => this.cancelAddingEvent()}><i className="icon-cross"></i></button>
								<div className="time">
									<div className="start">{cf.formatHoursMinutes(hours, minutes)}</div>
									<div className="hyphen">-</div>
									<div className="finish">
										<select>
											{options}
										</select>
									</div>
								</div>
								<button className="button"><i className="icon-plus"></i></button>
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