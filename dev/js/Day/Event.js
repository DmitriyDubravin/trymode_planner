import React, {Component} from 'react';
import {setEventDone} from './../serverInteractions';


export default class Event extends Component {
	constructor(props) {
		super(props);
    }
    setStatusDone(id) {
        // setEventDone(id);
    }
    render() {

        if(this.props.event.status === 'done') {
            return (
                <div className="event done">
                    <span className="time">{this.props.start} - {this.props.end}</span> | {this.props.event.idea}
                    <div className="settings">
                        <button onClick={() => {this.setStatusDone(this.props.event.id)}}><i className="icon-checkmark"></i></button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="event">
                    <span className="time">{this.props.start} - {this.props.end}</span> | {this.props.event.idea}
                    <div className="settings">
                        <button onClick={() => {}}><i className="icon-cog"></i></button>
                    </div>
                </div>
            )
        }
        
    }
}