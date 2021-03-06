import React, {Component} from "react";
import {getDay, addEvent, deleteEvent, eventDone, eventUndone, moveEvent, editEvent} from "./../serverInteractions";
import * as cf from "./../functions";
import Event from "./../Event/Event";
import EventEdit from "./../Event/EventEdit";
import EventAdd from "./../Event/EventAdd";
import EventMove from "./../Event/EventMove";

export default class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingEventIndex: null,
            editingEventIndex: null,
            movingEventIndex: null,
            movingEvent: null,
            loading: false,
            dragOverIndex: null
        };
        this.startEventAdd = this.startEventAdd.bind(this);
        this.cancelEventAdd = this.cancelEventAdd.bind(this);
        this.submitEventAdd = this.submitEventAdd.bind(this);
        this.startEventEdit = this.startEventEdit.bind(this);
        this.cancelEventEdit = this.cancelEventEdit.bind(this);
        this.submitEventEdit = this.submitEventEdit.bind(this);
        this.startEventMove = this.startEventMove.bind(this);
        this.cancelEventMove = this.cancelEventMove.bind(this);
        this.submitEventMove = this.submitEventMove.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.setEventStatusDone = this.setEventStatusDone.bind(this);
        this.setEventStatusUndone = this.setEventStatusUndone.bind(this);
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
        // setTimeout(() => {
        const responseHandler = data => {
            let day = cf.buildInitialDayCells(this.props.date.selected);
            if(data.response !== "no events was found") {
                for(let i = 0; i < data.data.length; i++) {
                    let date = new Date(data.data[i].start * 1000);
                    let index = Math.floor((date.getUTCHours() * 60 + date.getUTCMinutes()) / 10);
                    day[index] = {...day[index], ...data.data[i]};
                }
            }
            this.props.setDay(day);
            this.setState({loading: false});
        };
        getDay(
            Math.floor(this.props.date.selected / 1000),
            this.props.user.token,
            responseHandler
        );
        // },1000);
    }



    // ADD
    startEventAdd(i) {
        this.setState({addingEventIndex: i});
    }
    cancelEventAdd() {
        this.setState({addingEventIndex: null});
    }
    submitEventAdd(adds) {
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
    startEventEdit(i) {
        this.setState({editingEventIndex: i});
    }
    cancelEventEdit() {
        this.setState({editingEventIndex: null});
    }
    submitEventEdit(edits) {
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
    startEventMove(i, event) {
        this.setState({movingEventIndex: i, movingEvent: event});
    }
    cancelEventMove() {
        this.setState({movingEventIndex: null, movingEvent: null});
    }
    submitEventMove(newTime, i) {
        let freeSpaceMins = 0;
        for(let x = i; x < 144; x++) {
            if(!this.props.data.day[x].start) {
                freeSpaceMins += 10;
            } else {
                break;
            }
        }
        let isOverlap = this.state.movingEvent.dur > freeSpaceMins;
        moveEvent(
            this.props.user.token,
            this.state.movingEvent.id,
            newTime / 1000,
            isOverlap ? 10 : this.state.movingEvent.dur,
            this.getAndSetDay.bind(this)
        );
        this.setState({movingEventIndex: null, movingEvent: null});
    }
    // DRAG & DROP
    dragoverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const dragOverIndex = +e.target.id;
        this.setState({dragOverIndex: dragOverIndex});
    }
    dropHandler(e) {
        this.setState({dragOverIndex: null});
        const oldIndex = e.dataTransfer.getData("text");
        const newIndex = +e.target.id;
        const newTime = this.props.data.day[newIndex].time;
        const movingEvent = this.props.data.day[oldIndex];

        let freeSpaceMins = 0;
        for(let x = newIndex; x < 144; x++) {
            if(!this.props.data.day[x].start) {
                freeSpaceMins += 10;
            } else {
                break;
            }
        }
        let isOverlap = movingEvent.dur > freeSpaceMins;
        moveEvent(
            this.props.user.token,
            movingEvent.id,
            newTime / 1000,
            isOverlap ? 10 : movingEvent.dur,
            this.getAndSetDay.bind(this)
        );
    }



    // REMOVE
    removeEvent(id, i) {
        if(typeof id !== "string" && id.length === 0) throw new Error(`\n\nWrong removing id:\n id: ${id}\n`);

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
    setEventStatusDone(id) {
        if(typeof id !== "string" && id.length === 0) throw new Error(`\n\nWrong removing id:\n id: ${id}\n`);

        eventDone(
            this.props.user.token,
            id,
            this.getAndSetDay.bind(this)
        );
    }



    // UNDONE
    setEventStatusUndone(id) {
        if(typeof id !== "string" && id.length === 0) throw new Error(`\n\nWrong removing id:\n id: ${id}\n`);

        eventUndone(
            this.props.user.token,
            id,
            this.getAndSetDay.bind(this)
        );
    }









    render() {
        // if(!this.props.data.day) return <div>loading...</div>;
        if(!this.props.data.day) return <div className="preloader-layer"><img src="images/preloader.gif" /></div>;

        let dayCells = [];
        let gap = 0;

        for(let i = 0; i < 144; i++) {
            let {hours, minutes, time} = this.props.data.day[i];
            let cell = this.props.data.day[i];



            // EVENT
            if(
                cell.id &&
				cell.id !== "" &&
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
                        startEventMove={this.startEventMove}
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
                this.state.movingEventIndex === i &&
				+this.state.movingEvent.start === cell.time / 1000
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

                let cls = gap === 0 ? "cell" : `cell gap gap${gap}`;
                if(i === this.state.dragOverIndex) {
                    cls += " hover";
                }
                dayCells[i] = (
                    <div
                        id={i}
                        key={i}
                        className={cls}
                        onClick={
                            () => {
                                if(this.state.movingEventIndex !== null) {
                                    this.submitEventMove(time, i);
                                } else {
                                    this.startEventAdd(i);
                                }
                            }
                        }
                        onDragOver={e => this.dragoverHandler(e)}
                        onDrop={e => this.dropHandler(e)}
                    >
                        {cf.formatHoursMinutes(hours, minutes)}
                    </div>
                );
                gap = 0;
            }
        }



        return (
            <div className={`day${this.state.loading ? " loading" : ""}`}>
                <div className="days-cells">
                    {dayCells}
                    <div className="preloader-layer"><img src="images/preloader.gif" /></div>
                </div>
            </div>
        );

    }
}
