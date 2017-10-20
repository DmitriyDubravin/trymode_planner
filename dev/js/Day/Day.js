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

		let cells = [];
		for(let i = 0; i < 144; i++) {
			let rawHours = Math.floor(i * 10 / 60);
			let hours = rawHours > 9 ? rawHours : '0' + rawHours;
			let rawMinutes = i * 10 - hours * 60;
			let minutes = rawMinutes > 9 ? rawMinutes : '0' + rawMinutes;
			let time = Math.floor((this.props.date.selected + (rawHours * 60 + rawMinutes) * 60000) / 1000).toString();
			cells.push([hours, minutes, time]);
		}
		let emptyCells = cells.map((cell, i) => (
			<div
				key={i}
				className="cell"
				onClick={
					() => {
						this.props.startEvent({id: '0', start: cell[2], dur: 10})
					}
				}>
				{cell[0]}:{cell[1]}
			</div>
		));

		this.props.data.dailyEvents.forEach(event => {
			let date = new Date(event.start * 1000);
			let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
			let lastIndex = index + event.dur / 10;
			let startTime = `${cells[index][0]}:${cells[index][1]}`;
			let endTime = lastIndex === 144 ? `00:00` : `${cells[lastIndex][0]}:${cells[lastIndex][1]}`;
			let gap = lastIndex - Math.floor(lastIndex / 6) * 6;
			
			emptyCells[index] = <Event event={event} start={startTime} end={endTime} key={index} />;

			for(let i = 1; i < event.dur / 10; i++) {
				emptyCells[index + i] = null;
			}
			
			if(cells[lastIndex]) {
				let cls = gap !== 0 ? `cell gap${gap}` : `cell`;
				emptyCells[lastIndex] = <div className={cls} key={lastIndex}>{cells[lastIndex][0]}:{cells[lastIndex][1]}</div>
			}
		});

		// let filteredCells = emptyCells.filter(time => time !== null);

		return (
			<div className='day'>
				<div className="days-cells">
					{emptyCells}
				</div>
			</div>
		);
	}
};