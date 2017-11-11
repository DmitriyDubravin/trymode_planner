import React, {Component} from 'react';
import {getDay, addEvent, deleteEvent, eventDone, eventUndone, moveEvent, editEvent} from './../serverInteractions';
import * as cf from './../functions';
import Event from './Event';
import EventEdit from './EventEdit';
import EventAdd from './EventAdd';

export default class Day extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addingEventId: null,
			addingEventDur: 10,
			addingEventText: null,
			editingEventId: null,
			editingEventIndex: null
		}
	}

	getAndSetDay() {
		const handleDayData = (data) => {
			let day = cf.buildInitialDayCells(this.props.date.selected);
			if(data.response !== 'no events was found') {
				for(let i = 0; i < data.data.length; i++) {
					let date = new Date(data.data[i].start * 1000);
					let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
					day[index] = {...day[index], ...data.data[i]};
				}
			}
			this.props.setDay(day);
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
		if(!this.state.movingEventId) {
			this.setState({addingEventId: key});
		}
	}

	moveHere = (newTime) => {
		moveEvent(
			this.props.user.token,
			this.props.data.movingEvent.event.id,
			newTime / 1000,
			this.getAndSetDay.bind(this)
		);
		this.props.setMovingEvent(null);
		this.props.movingEventOff();
	}

	cancelEventAdd = () => {
		this.setState({addingEventId: null, addingEventDur: 10, addingEventText: null});
	}
	submitEventAdd = edits => {
		console.log(edits);
		addEvent(
			this.props.user.token,
			{
				start: edits.start,
				dur: edits.dur,
				idea: edits.idea
			},
			this.getAndSetDay.bind(this)
		);
		this.setState({addingEventId: null, addingEventDur: 10, addingEventText: null});
	}
	changeHandler = e => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}
	removeEvent = id => {
		this.setState({addingEventId: null, addingEventDur: 10, addingEventText: null});
		deleteEvent(
			this.props.user.token,
			id,
			this.getAndSetDay.bind(this)
		);
	}
	setEventStatusDone = id => {
		eventDone(
			this.props.user.token,
			id,
			this.getAndSetDay.bind(this)
		);
	}
	setEventStatusUndone = id => {
		eventUndone(
			this.props.user.token,
			id,
			this.getAndSetDay.bind(this)
		);
	}

	moveEvent = (key, event) => {
		this.props.setMovingEvent({key: key, event: event});
		this.props.movingEventOn();
	}

	// EDIT

	editEvent = (i, id) => {
		this.setState({editingEventId: id, editingEventIndex: i});
	}

	cancelEventEdit = () => {
		this.setState({editingEventIndex: null, editingEventId: null});
	}

	submitEventEdit = (edits) => {
		editEvent(
			this.props.user.token,
			{
				id: this.state.editingEventId,
				dur: edits.dur,
				idea: edits.idea
			},
			this.getAndSetDay.bind(this)
		);
		this.cancelEventEdit();
	}



	render() {
		if(!this.props.data.day) return <div>loading...</div>;

		let dayCells = [];
		let gap = 0;

		for(let i = 0; i < 144; i++) {
			let {hours, minutes, time} = this.props.data.day[i];
			let cell = this.props.data.day[i];



			if(cell.id && cell.id !== this.state.movingEventId && cell.id !== this.state.editingEventId) {
				dayCells[i] = (
					<Event
						key={i}
						i={i}
						event={cell}
						removeEvent={this.removeEvent}
						setEventStatusDone={this.setEventStatusDone}
						setEventStatusUndone={this.setEventStatusUndone}
						moveEvent={this.moveEvent}
						editEvent={this.editEvent}
					/>
				);

				i += +cell.dur / 10 - 1;
				let endMinutes = hours * 60 + minutes + +cell.dur;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;
				
			} else if(this.state.addingEventId === i) {

// EVENT ADD

				dayCells[i] = (
					<EventAdd
						key={i}
						i={i}
						event={cell}
						day={this.props.data.day}
						cancelEventAdd={this.cancelEventAdd}
						submitEventAdd={this.submitEventAdd}
					/>
				);

				let endMinutes = hours * 60 + minutes + 10;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;

			} else if(this.state.editingEventIndex === i && cell.id && this.state.editingEventId === cell.id) {

// EVENT EDIT

				dayCells[i] = (
					<EventEdit
						key={i}
						i={i}
						event={cell}
						day={this.props.data.day}
						cancelEventEdit={this.cancelEventEdit}
						submitEventEdit={this.submitEventEdit}
					/>
				);
				i += +cell.dur / 10 - 1;
				let endMinutes = hours * 60 + minutes + +cell.dur;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;

			} else {
				let cls = gap === 0 ? 'cell' : `cell gap${gap}`;
				dayCells[i] = (
					<div
						key={i}
						className={cls}
						onClick={
							() => {
								if(this.props.data.movingEvent) {
									this.moveHere(time);
								} else {
									this.startAddingEvent(i);
								}
							}
						}
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
