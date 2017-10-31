import React, {Component} from 'react';
import {setEventDone} from './../serverInteractions';
import * as cf from './../functions';


export default class Event extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tools: false,
            status: this.props.event.status
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.event.status !== this.props.event.status) {
            this.setState({tools: false, status: this.props.event.status})
        }
    }
    setStatusDone(id) {
        // setEventDone(id);
    }
    render() {
        const {id, hours, minutes, dur, idea} = this.props.event;

        let startTime = cf.formatHoursMinutes(hours, minutes);
        let totalEndMinutes = hours * 60 + minutes + +dur;
        let endHours = Math.floor(totalEndMinutes / 60);
        let endMinutes = totalEndMinutes - endHours * 60;
        let endTime = totalEndMinutes === 24 * 60 ? `00:00` : cf.formatHoursMinutes(endHours, endMinutes);

        if(this.state.status === 'done') {
            return (
                <div className="event done">
                    <span className="time">{startTime} - {endTime}</span> | {this.props.event.idea}
                    <div className="settings">
                        <button onClick={() => {this.props.setEventStatusUndone(id)}}><i className="icon-checkmark"></i></button>
                    </div>
                </div>
            )
        } else {



            return (
                <div className="event">
                    <span className="time">{startTime} - {endTime}</span> | {idea}
                    <div className="settings">
                        {!this.state.tools && <button onClick={() => {this.setState({tools: true})}}><i className="icon-cog"></i></button>}
                        {this.state.tools && <div className="tools">
                            <button onClick={() => {this.props.removeEvent(id)}}><i className="icon-bin"></i></button>
                            {/* <button onClick={() => {this.props.moveEvent(id, this.props.i)}}><i className="icon-shuffle"></i></button> */}
                            <button onClick={() => {this.props.setEventStatusDone(id)}}><i className="icon-checkmark"></i></button>
                            {/* <button onClick={() => {}}><i className="icon-pencil"></i></button>*/}
                            <button onClick={() => {this.setState({tools: false})}}><i className="icon-arrow-right2"></i></button>
                        </div>}
                    </div>
                </div>
            )
        }
        
    }
}