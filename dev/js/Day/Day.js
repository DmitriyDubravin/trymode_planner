import React, {Component} from 'react';
import {getDay} from './../serverInteractions';
import * as cf from './../functions';
import Event from './Event';

export default class Day extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const sss = (data) => {
			this.props.saveDailyEvents(data.data)
		}
		getDay(
			Math.floor(this.props.date.selected / 1000),
			this.props.user.token,
			sss
		);
	}
	componentDidUpdate(prevProps) {
		if(prevProps.date.selected !== this.props.date.selected) {
			const sss = (data) => {
				this.props.saveDailyEvents(data.data)
			}
			getDay(
				Math.floor(this.props.date.selected / 1000),
				this.props.user.token,
				sss
			);
		}
	}

	render() {
		if(!this.props.data.dailyEvents) return <div>loading...</div>;

		let days = [];
		for(let i = 0; i < 144; i++) {
			let time = i * 10;
			let rawHours = Math.floor(time / 60);
			let hours = rawHours > 9 ? rawHours : '0' + rawHours;
			let rawMinutes = time - hours * 60;
			let minutes = rawMinutes > 9 ? rawMinutes : '0' + rawMinutes;
			days.push([hours, minutes]);
		}

		let daysCells = days.map((time,i) => {
			if(time) {
				return <div className="cell" key={i}>{time[0]}:{time[1]}</div>
			}
		});

		this.props.data.dailyEvents.forEach(event => {
			let date = new Date(event.start * 1000);
			let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
			let lastIndex = index + event.dur / 10;
			let startTime = `${days[index][0]}:${days[index][1]}`;
			let endTime = lastIndex === 144 ? `00:00` : `${days[lastIndex][0]}:${days[lastIndex][1]}`;
			let gap = lastIndex - Math.floor(lastIndex / 6) * 6;

			daysCells[index] = <Event event={event} start={startTime} end={endTime} key={index} />;

			for(let i = 1; i < event.dur / 10; i++) {
				daysCells[index + i] = null;
			}
			if(daysCells[lastIndex]) {
				let cls = gap !== 0 ? `cell gap${gap}` : `cell`;
				daysCells[lastIndex] = <div className={cls} key={lastIndex}>{days[lastIndex][0]}:{days[lastIndex][1]}</div>
			}
		});

		let filteredCells = daysCells.filter((time,i) => time !== null);

		return (
			<div className='day'>
				<div className="days-cells">
					{filteredCells}
				</div>
			</div>
		);
	}
};