import React, {Component} from 'react';
import {getDay} from './../serverInteractions';
import * as cf from './../functions';

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
			days.push(i);
		}
		let sss = days.map((day,i) => {
			let time = i * 10;
			let rawHours = Math.floor(time / 60);
			let hours = rawHours > 9 ? rawHours : '0' + rawHours;
			let rawMinutes = time - hours * 60;
			let minutes = rawMinutes > 9 ? rawMinutes : '0' + rawMinutes;
			return [hours,minutes];
		});

		sss.forEach(event => {
			let date = new Date(event.start * 1000);
			let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
			sss[index] = <div className="event" key={index}>{event.idea}</div>;
			for(let i = 10; i <= event.dur; i+=10) {
				sss[index + i] = null;
			}
		});

		let daysCells = sss.map((time,i) => {

			if(time) {
				return <div className="cell" key={i}>{time[0]}:{time[1]}</div>
			}
		});

		return (
			<div className='day'>
				<div className="days-cells">
					{daysCells}
				</div>
			</div>
		);
	}
};