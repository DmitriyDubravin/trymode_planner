import React, {Component} from 'react';
import {getDay, addEvent, deleteEvent, eventDone, eventUndone, moveEvent, editEvent} from './../serverInteractions';
import * as cf from './../functions';
import Event from './../Event/Event';
import EventEdit from './../Event/EventEdit';
import EventAdd from './../Event/EventAdd';
import EventMove from './../Event/EventMove';

export default class Day extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addingEventIndex: null,
			editingEventIndex: null,
			movingEventIndex: null,
			movingEvent: null,
			loading: false
		}
	}

	componentDidMount() {
		this.getAndSetDay();
	}
	componentDidUpdate(prevProps) {
		if(prevProps.date.selected !== this.props.date.selected) {
			this.getAndSetDay();
		}
	}



	getAndSetDay() {
		this.setState({loading: true});
		const responseHandler = data => {
			let day = cf.buildInitialDayCells(this.props.date.selected);
			if(data.response !== 'no events was found') {
				for(let i = 0; i < data.data.length; i++) {
					let date = new Date(data.data[i].start * 1000);
					let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
					day[index] = {...day[index], ...data.data[i]};
				}
			}
			this.props.setDay(day);
			this.setState({loading: false});
		}
		getDay(
			Math.floor(this.props.date.selected / 1000),
			this.props.user.token,
			responseHandler
		);
	}



// ADD
	startEventAdd = i => {
		this.setState({addingEventIndex: i});
	}
	cancelEventAdd = () => {
		this.setState({addingEventIndex: null});
	}
	submitEventAdd = adds => {
		if(adds.start > 0 && adds.dur > 0 && adds.idea.length > 0) {

			// write event to store
			this.props.addEvent(adds);

			addEvent(
				this.props.user.token,
				{
					start: adds.start,
					dur: adds.dur,
					idea: adds.idea
				},
				this.getAndSetDay.bind(this)
			);

			this.cancelEventAdd();
		} else {
			throw new Error(`\n\nWrong adds:\n start: ${adds.start}\n dur:   ${adds.dur}\n idea:  ${adds.idea}\n`);
		}
	}



// EDIT
	startEventEdit = i => {
		this.setState({editingEventIndex: i});
	}
	cancelEventEdit = () => {
		this.setState({editingEventIndex: null});
	}
	submitEventEdit = edits => {
		if(edits.id.length > 0 && edits.dur > 0 && edits.idea.length > 0) {
			editEvent(
				this.props.user.token,
				{
					id: edits.id,
					dur: edits.dur,
					idea: edits.idea
				},
				this.getAndSetDay.bind(this)
			);
			this.cancelEventEdit();
		} else {
			throw new Error(`\n\nWrong edits:\n id:   ${edits.id}\n dur:  ${edits.dur}\n idea: ${edits.idea}\n`);
		}
	}



// MOVE
	submitEventMove = newTime => {
		moveEvent(
			this.props.user.token,
			this.state.movingEvent.id,
			newTime / 1000,
			this.getAndSetDay.bind(this)
		);
		this.setState({movingEventIndex: null, movingEvent: null});
	}
	cancelEventMove = () => {
		this.setState({movingEventIndex: null, movingEvent: null});
	}
	startEventMove = (i, event) => {
		this.setState({movingEventIndex: i, movingEvent: event});
	}



// REMOVE
	removeEvent = (id, i) => {
		if(typeof id !== 'string' && id.length === 0) throw new Error(`\n\nWrong removing id:\n id: ${id}\n`);

		// delete event from store
		this.props.deleteEvent(i);

		deleteEvent(
			this.props.user.token,
			id,
			this.getAndSetDay.bind(this)
		);
		this.setState({addingEventIndex: null});
	}



// DONE
	setEventStatusDone = id => {
		if(typeof id !== 'string' && id.length === 0) throw new Error(`\n\nWrong removing id:\n id: ${id}\n`);

		eventDone(
			this.props.user.token,
			id,
			this.getAndSetDay.bind(this)
		);
	}



// UNDONE
	setEventStatusUndone = id => {
		if(typeof id !== 'string' && id.length === 0) throw new Error(`\n\nWrong removing id:\n id: ${id}\n`);

		eventUndone(
			this.props.user.token,
			id,
			this.getAndSetDay.bind(this)
		);
	}



	render() {
		
		if(!this.props.data.day) return <div>loading...</div>;

		let dayCells = [];
		let gap = 0;

		for(let i = 0; i < 144; i++) {
			let {hours, minutes, time} = this.props.data.day[i];
			let cell = this.props.data.day[i];



// EVENT
			if(
				cell.id &&
				cell.id !== '' &&
				this.state.editingEventIndex !== i &&
				this.state.movingEventIndex !== i
			) {

				dayCells[i] = (
					<Event
						key={i}
						i={i}
						event={cell}
						removeEvent={this.removeEvent}
						setEventStatusDone={this.setEventStatusDone}
						setEventStatusUndone={this.setEventStatusUndone}
						moveEvent={this.startEventMove}
						startEventEdit={this.startEventEdit}
					/>
				);

				i += +cell.dur / 10 - 1;
				let endMinutes = hours * 60 + minutes + +cell.dur;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;



// EVENT ADD
			} else if(
				this.state.addingEventIndex === i
			) {

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



// EVENT EDIT
			} else if(
				this.state.editingEventIndex === i
			) {

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



// EVENT MOVE
			} else if(
				this.state.movingEventIndex === i
			) {

				dayCells[i] = (
					<EventMove
						key={i}
						i={i}
						event={cell}
						cancelEventMove={this.cancelEventMove}
					/>
				);

				i += +cell.dur / 10 - 1;
				let endMinutes = hours * 60 + minutes + +cell.dur;
				gap = (endMinutes - (Math.floor(endMinutes / 60) * 60)) / 10;



// EMPTY CELL
			} else {

				let cls = gap === 0 ? 'cell' : `cell gap${gap}`;
				dayCells[i] = (
					<div
						key={i}
						className={cls}
						onClick={
							() => {
								if(this.state.movingEventIndex) {
									this.submitEventMove(time);
								} else {
									this.startEventAdd(i);
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


		if(this.state.loading) {
			return <div>Loading</div>
		} else {
			return (
				<div className='day'>
					<div className="days-cells">
						{dayCells}
					</div>
				</div>
			);
		}
	}
};
